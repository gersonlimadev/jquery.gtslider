/**
 * jQuery gtSlider plugin
 * @author Gerson Thiago <http://www.gersonthiago.com> <https://github.com/gersonthiago/jquery.gtslider>
**/
;(function ( $, window, undefined ) {

	var pluginName = 'gtslider',
	document = window.document,
	defaults = {
		width : 500,
		height : 375,
		pagination : true,
		arrows : true,
		legend : true,
		speed : 1200,
		effect : 'slide',
		easing : '',
		auto : true,
		autoSpeed : 3000
	};

	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function () {

		$(this.element).find('ul').wrap('<div class="boxGtSlider" />');

		var self = this,
			opts = self.options,
			boxGtSlider = $(self.element).find('.boxGtSlider'),
			count = boxGtSlider.find('li').length,
			html = '';

		boxGtSlider.attr('data-pos', 0).css({ 
			position : 'relative',
			overflow : 'hidden', 
			width : opts.width,
			height : opts.height
		});

		// arrows
		if(opts.arrows && count > 1) {

			html += '<a href="#" class="bt prev">Anterior</a><a href="#" class="bt next">Próximo</a>';

		}

		// pagination
		if(opts.pagination && count > 1) {

			var paginationHtml = '';

			for(var i = 0, t = count; i < t; i++){
				paginationHtml += '<span data-num="'+ i +'">'+ (i + 1) +'</span>';
			}

			html += '<div class="pagination">'+ paginationHtml +'</div>';

		}

		// legend
		if(opts.legend) {

			var legend = '', legendHtml = '';

			for(var i = 0, t = count; i < t; i++){
				legend = boxGtSlider.find('li').eq(i).attr('data-legend');
				if(legend !== '') {
					legendHtml += '<p data-num="'+ i +'" style="display:none">'+ legend +'</p>';
				}
			}

			html += '<div class="legends">'+ legendHtml +'</div>';

		}

		// effect
		if(opts.effect == 'slide') {
			
			boxGtSlider.find('ul').width( count * opts.width );

		} else if(opts.effect == 'fade') {
			
			var zIndex = count + 2;
			boxGtSlider.find('ul li').each(function(){
				$(this).css({
					position : 'absolute',
					top : 0,
					left : 0,
					zIndex : zIndex--
				});
			});
			
		}

		// append html box slider
		$(self.element).css({ overflow : 'visible' }).append( html );

		self.appendEvents();

	};


	Plugin.prototype.appendEvents = function () {

		var self = this,
			opts = self.options,
			boxGtSlider = $(self.element).find('.boxGtSlider'),
			count = boxGtSlider.find('li').length,
			timerFunc = undefined, timer = undefined;


		self.goTo = function ( num ) {

			boxGtSlider.attr('data-pos',num);

			if(opts.effect == 'slide') {

				boxGtSlider.find('ul').animate({ 
					marginLeft : - (num * opts.width) 
				}, opts.speed, opts.easing);

			} else if(opts.effect == 'fade') {

				boxGtSlider.find('li').not(boxGtSlider.find('li').eq(num)).fadeOut(opts.speed);
				boxGtSlider.find('li').eq(num).fadeIn(opts.speed);

			}

			// show legends
			if(opts.legend) {
				$(self.element).find('.legends p').not($(self.element).find('.legends p[data-num='+ num +']')).fadeOut();
				$(self.element).find('.legends p[data-num='+ num +']').fadeIn();
			}

			// pagination add class active
			if(opts.pagination) {
				$(self.element).find('.pagination span').removeClass('active');
				$(self.element).find('.pagination span[data-num='+ num +']').addClass('active');
			}
			

		};

		// buttons arrows
		// next and prev
		$(self.element).find('.next, .prev').bind('click', function(e){

			e.preventDefault();

			var bt = $(this),
				pos = +boxGtSlider.attr('data-pos');

			if(bt.hasClass('next')) {

				++pos;
				
				if(pos == count) { pos = 0; }

			} else if(bt.hasClass('prev')) {

				--pos;

				if(pos < 0) { pos = count - 1; }

			}
			
			self.goTo( pos );

		});

		// buttons pagination
		$(self.element).find('.pagination span').bind('click', function(e){

			self.goTo( $(this).attr('data-num') ) ;

		});

		// auto slide
		timerFunc = function() {

			var pos = +boxGtSlider.attr('data-pos');

			++pos;

			if(pos == count) { pos = 0; }

			self.goTo( pos );

		};

		// enable auto slide
		if(opts.auto) {

			timer = setInterval(timerFunc, opts.autoSpeed);

			boxGtSlider.bind('mouseenter mouseleave', function(e){

				if(e.type == 'mouseenter') {

					clearInterval( timer );

				} else if(e.type == 'mouseleave') {

					timer = setInterval(timerFunc, opts.autoSpeed);
					
				}

			});

		}


		self.goTo(0);

	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}

}(jQuery, window));