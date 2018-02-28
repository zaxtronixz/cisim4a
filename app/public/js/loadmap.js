

			var mapClick = {};
			function initMap(){
				// user's input is inserte into the autocomplete object
				
				var userInput = document.getElementById('userInput');
				var auto = new google.maps.places.Autocomplete(userInput)

				var map;
				// map is loaded into a <div> based on the user's input 
				auto.addListener('place_changed', 
					function(){
					var place = auto.getPlace();
    				// retrieve the value of the latitude and longitude
					var lngi = place.geometry.viewport.f.b;
					var lati = place.geometry.viewport.f.f;
					
					// creating a new map object using the latLng values obtained above
					var mapDiv =  document.getElementById('map');
			 		map =  new google.maps.Map(mapDiv, {
						center:{lat:lati, lng:lngi},
						zoom:10
					})
					map.setCenter(place.geometry.location);
      				map.setZoom(7);

      				var contentString = "<div>Click to create an asset at this location <br><br> ";
      					contentString += "<button onclick='openMenuBtn()'>"
      					contentString += " Create an Object";
      					contentString += "</button> </div>";
      				// controlling the map zoom value using 
      				// getting position of click event
					  google.maps.event.addListener(map, 'click', function(event) {
					  	
					   	mapClick.coord = {
					  			lat: event.latLng.lat(),
					  			lng: event.latLng.lng()
					  	}
					     
					 // information window is displayed at click position
					   	mapClick.infowindow = new google.maps.InfoWindow({
					    	content: contentString,
					    	position:mapClick.coord
					  	});
					 	
					  	mapClick.infowindow.open(map);

				      });

				});

			    mapClick.createAsset = function (){
		      		this.infowindow.close();
		      		
		      		this.x = document.getElementById("assetName").selectedIndex;
					this.y = document.getElementById("assetName").options;

					var selectedAss = this.y[this.x].text;
		      	 	var marker = new google.maps.Marker({
	          		position: this.coord,
	          		map: map,
	          		title: selectedAss,
	          		icon:customMarker(selectedAss)
	       		 });
		      	}


       		};

       		function assetCreator(){
				return mapClick.createAsset()
         			// map.setCenter(marker.getPosition());
			}
