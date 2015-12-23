var slider = (function(){

	// To set the active class for a slider item
	var _setActive = function(reqSlide){
		reqSlide.addClass('active').siblings().removeClass('active');
	};

	// To set the active class for a slider control (blue circle flashes)
	var _setSlideControl = function(reqSlide, controls){
		if(reqSlide.hasClass('first')){

			_setActive( controls.filter('.first') );

		}else if(reqSlide.hasClass('second')){

			_setActive( controls.filter('.second') );

		}else if(reqSlide.hasClass('third')){

			_setActive( controls.filter('.third') );

		}else if(reqSlide.hasClass('fourth')){

			_setActive( controls.filter('.fourth') );
			
		}
	};

	// To change an offset of the slider list
	var _changePos = function (reqSlide, list, sliderOffset) {
		var reqPos = 0;
		if (reqSlide.hasClass('first')){

			_setActive(list.find('.first'));
			reqPos = list.find('.first').offset().left - sliderOffset;

		} else if (reqSlide.hasClass('second')) {
			_setActive(list.find('.second'));
			reqPos = list.find('.second').offset().left - sliderOffset;

		} else if (reqSlide.hasClass('third')) {

			_setActive(list.find('.third'));
			reqPos = list.find('.third').offset().left - sliderOffset;

		} else if (reqSlide.hasClass('fourth')) {
			_setActive(list.find('.fourth'));
			reqPos = list.find('.fourth').offset().left - sliderOffset;			
		}

		return reqPos;

	};

	// Main function, switching slides in slider
	var _sliderAction = function(event){

		event.preventDefault();
		
		var $this = $(this), // The current control button, which was clicked
			controls = $this.siblings(),   // all other control buttons list
			container = $this.closest('.slider'), // The outter container of slider
			list = container.find('.slider__list'), // The list of slider items
			items = container.find('.slider__item'), // The set of slider items
			activeSlide = items.filter('.active'), // Active (current) slide
			nextSlide = activeSlide.next(), // The slide next to the active slide
			prevSlide = activeSlide.prev(), // The previous slide to the active item
			firstSlide = items.first(), // The first slide in the set of slides
			lastSlide = items.last(), // The last slide in the set of slides
			sliderOffset = container.offset().left, // The offset of the slider relatively the border of window
			reqPos = 0; //Variable to keep the slider list offset

		if(!$this.hasClass('active') && !($this.hasClass('prev') || $this.hasClass('next') ) ){

			_setActive($this);
			reqPos = _changePos($this, list, sliderOffset);

		} else if($this.hasClass('next')){

			if(nextSlide.length){
				_setActive(nextSlide);
				_setSlideControl(nextSlide, controls);
				reqPos = nextSlide.offset().left - sliderOffset;
			}else{
				_setActive(firstSlide);
				_setSlideControl(firstSlide, controls);
				reqPos = firstSlide.offset().left - sliderOffset;
			}

		} else if($this.hasClass('prev')){

			if(prevSlide.length){
				_setActive(prevSlide);
				_setSlideControl(prevSlide, controls);
				reqPos = prevSlide.offset().left - sliderOffset;
			}else{
				_setActive(lastSlide);
				_setSlideControl(lastSlide, controls);
				reqPos = lastSlide.offset().left - sliderOffset;
			}
		}

		list.css('left', '-=' + reqPos + 'px');	// Switching of slides
	};

	var init = function(){ // Initialization of module
		_setUpListeners();
	};

	var _setUpListeners = function(){ // The module events guard
		$('.slider__control').on('click', _sliderAction);
	};	

	return {
		init : init
	};
})();