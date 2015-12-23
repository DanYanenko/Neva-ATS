var headerMenu = (function(){

	var init = function(){ // Initialization of module
		_setUpListeners();
	};

	var _setUpListeners = function(){ // The module events guard
		$('#header__main-nav__item_2').on('click', _showSubMenu);
	};	

	var _showSubMenu = function(event){

		event.preventDefault();
		var $this = $(this),
			menuContainer = $this.closest('.header__main-nav'),
			subMenuContainer = menuContainer.siblings();

		if(!subMenuContainer.hasClass('active')){
			subMenuContainer.addClass('active');
		} else{
			subMenuContainer.removeClass('active');
		}
	};

	return {
		init : init
	};
})();