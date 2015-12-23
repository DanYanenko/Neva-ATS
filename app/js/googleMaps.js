 function initialize() {     

	var myLatlng = new google.maps.LatLng(59.925051, 30.324998);

	var myOptions = {
		zoom: 15,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("geomap-block"), myOptions); 

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: "Нева АТС"
	});

	var contentString = '<div id="mapLabel">Информация о компании</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	

	google.maps.event.addDomListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});	

	google.maps.event.addListener(map,'center_changed',function() {
	// возврат к начальному маркеру через 5 секунд после сдвига центра
		window.setTimeout(function() {
			map.panTo(marker.getPosition());
		},5000);
  	});

}

google.maps.event.addDomListener(window, 'load', initialize);



