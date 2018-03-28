
			// an object to store all the map varibales
			// start map Collector if not previously defined
			
					var mapCollector = {};
					var map;
				// where project instance will be stored safely
					var contentString = "<div>Click to create an asset at this location <br><br> ";
      					contentString += "<button onclick='openMenuBtn()'>"
      					contentString += " Create an Object";
      					contentString += "</button> </div>";
			

			function initMap(){
				// user's input is inserte into the autocomplete object
				    newProject = createMapProjectInstance(mapCollector)
				    mapCollector.markers = [];

				if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(function(position) {
			            var pos = {
			              lat: position.coords.latitude,
			              lng: position.coords.longitude
			            };
			            map = new google.maps.Map(document.getElementById('map'), {
				          center: pos,
				          zoom: 10
				        });
			            map.setCenter(pos);
			            google.maps.event.addListener(map, 'click', clickEventer);
          			})
          		}else{
          			infoWindow = new google.maps.InfoWindow;
          			handleLocationError(false, infoWindow, map.getCenter())

          		}

				
				var userInput = document.getElementById('userInput');
				var auto = new google.maps.places.Autocomplete(userInput)
				// map is loaded into a <div> based on the user's input 
				auto.addListener('place_changed', function(){
				// get the place details from auto complete
					var place = auto.getPlace();
						mapCollector.places = place.name // save place to
						console.log("this is place.name: " + place.name)
					
					// retrieve the value of the latitude and longitude
					var latitude = place.geometry.location.lat();
					var longitude = place.geometry.location.lng();

					var location = {lat:latitude, lng:longitude}
					// creating a new map object using the latLng values obtained above
					
					var mapDiv =  document.getElementById('map');
			 		map =  new google.maps.Map(mapDiv, {
						center:location,
						zoom:10
					})

					map.setCenter(location);
      				// getting position of click event
					google.maps.event.addListener(map, 'click', clickEventer);
 	});

				// create marker function
				mapCollector.createMarker = function(assetSelected){
					this.infowindow.close();
					closeNav();
					var marker = new google.maps.Marker({
		          		position: mapCollector.coordinates,
		          		map: map,
		          		animation: google.maps.Animation.DROP,
		          		title: assetSelected,
		          		icon:customMarker(assetSelected)
	       		 	});

					 /////////////////////////////////////////////////////////////////////
					// open menu when marker is clicked
					marker.addListener('click', function(event) {
	    				openMenuBtn();
	    				// hide asset creator
	    				$( "#first-accordion" ).hide()
	    				$( "#getAssetPanel" ).show()
	    				$("#assetPanelForm").hide()

	    				// remove selected dependencies before appending new
						$('ul#selected-list').children().remove()

						// remove selected inputs before appending new
						$('#input-selected-list').children().remove()
	    				//show upadate asset details
	    				var id = marker.id
	   					getAssetFromGdb(id);
	   				})

       		 	marker.id = mapCollector.markerId
       		 	mapCollector.markers.push(marker)
				}




				// Create infowindow on clicked spot on map
				function clickEventer(event) {
					   	mapCollector.coordinates = {
							lat: event.latLng.lat(),
							lng: event.latLng.lng()
					  	}
 						// information window is displayed at click position
						mapCollector.infowindow = new google.maps.InfoWindow({
						   	content: contentString,
						   	position:mapCollector.coordinates
						});
					  	mapCollector.infowindow.open(map);
			    };
}

 
  	function createMapProjectInstance(mapCollector){
    	var newProject = new MapProjectInstance(mapCollector)
    	// post new project data to api
		$.ajax({
		    type: 'POST',
		    url: '/postpage/createNewProject',
		    contentType: 'application/json',
		    data: JSON.stringify(newProject)
		});
    	// return the project to the console
    	return newProject;
	}

    // function triggered by form click
	function assetCreator(){
 //    // using the index number and option selected
	//     this.x = document.getElementById("type").selectedIndex; //x
	//     this.y = document.getElementById("type").options; //y
	//     var assetSelected = this.y[this.x].text; // text of selected index
	//     mapCollector.createMarker(assetSelected)// create a marker for this asset
	// 	
	console.log("asset does nothing")
	}


