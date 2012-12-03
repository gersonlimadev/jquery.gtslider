# jQuery Slider, is a simple plugin.
No mistery, no secret.

-----------------

### How to use

````html
	
	<div class="slider">
		<ul>
			<li data-legend="lorem ipsum"> <img src="" alt="" /> </li>
			<li data-legend="dolor sit amet"> <img src="" alt="" /> </li>
		</ul>
	</div>
````

````css

	.slider {
		position:relative;
		width:650px; height:410px;
		overflow:hidden;
	}
		.slider	ul li { 
			float: left; 
			width: 650px; 
			height: 410px;
		}
````

````javascript

	$('.slider').gtslider({ 
		width : 650, 
		height : 410
	});
````

### Params

````javascript

	$('.slider').gtslider({ 
		width : 650,
		height : 410,
		pagination : true, // 1,2,3,4
		arrows : true, // prev and next
		legend : true, // legend for each element
		speed : 1200, // speed of the animation
		effect : 'slide', // slide or fade
		easing : '', // any easing, for example 'easeInCubic' or 'easeInQuad', etc
		auto : true,
		autoSpeed : 3000
	});
````