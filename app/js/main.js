$(document).ready(function() {
	if ($('.slider').length){
		slider.init();
	}

	if ($('.header__sub-nav').length){
		headerMenu.init();
	}
	
	if($('input, textarea').length){
		$('input, textarea').placeholder({ customClass: 'my-placeholder' });
	}
	
	

});