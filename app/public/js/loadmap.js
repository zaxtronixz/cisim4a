
			// an object to store all the map varibales
			// start map Collector if not previously defined
			
				var mapCollector = {};
				var map;
				// where project instance will be stored safely
				var newProject = {};
				var contentString = "<div>Click to create an asset at this location <br><br> ";
      				contentString += "<button onclick='openCreateAssetPanel()'>"
      				contentString += " Create an Object";
      				contentString += "</button> </div>";
			

			function initMap(){
				// user's input is inserte into the autocomplete object
				    // newProject = createMapProjectInstance(mapCollector) // project instance created at initialization of map
				    mapCollector.markers = []; // mapCollector marker array
				    mapCollector.markerCircles = []; // mapCollector  markerCricles array

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
			            // set location on mapcollector: for newPwroject instance creation
				        mapCollector.location = pos;
				        // set location for the project instance
				         newProject = createMapProjectInstance(mapCollector)

			            map.setCenter(pos);
			            google.maps.event.addListener(map, 'click', clickEventer);
          			})
       		        }else{
       					infoWindow = new google.maps.InfoWindow;
       					handleLocationError(false, infoWindow, map.getCenter())
 	          		}

 	          		mapCollector.loadRecentProject= function (recentProject){
          			// bring previous project detail here
           			mapCollector.places = recentProject.places
          			mapCollector.location = recentProject.location

          			//var pos = longitude and latitude
          			var pos = recentProject.location

          			map = createNewMap(pos)// create map with location
          			// create a new project instance on client
          			google.maps.event.addListener(map, 'click', clickEventer);

          			newProject = new MapProjectInstance(mapCollector) // create new project
          			newProject.id = recentProject.id // restore the previous id
          			// loop to load marker for each asset

          			if(recentProject.assets.length != 0){
	          			recentProject.assets.forEach(function(asset){
	          				// change Latlng from string to float
	          				asset.coordLat = parseFloat(asset.coordLat); 
	          				asset.coordLng = parseFloat(asset.coordLng)
							// assign each asset.coordinates  to mapcollector coord
	          				mapCollector.coordinates = {lat: asset.coordLat, lng: asset.coordLng}
	          				
	          				var assetSelected = asset.type// asset.type as asset assetSelected
	          				
	          				mapCollector.markerId = asset.id//assign asset id to map collector
	          				
          					newProject.addAsset(asset)// add assets to the project instance
	          				
	          				// create marker create objects
	          				var marker = new google.maps.Marker({
				         		position: mapCollector.coordinates,
				         		map: map,
				         		animation: google.maps.Animation.DROP,
				         		title: assetSelected,
				         		icon:customMarker(assetSelected)
				         	});
	          				marker.id = mapCollector.markerId
    						mapCollector.markers.push(marker)
			    	      	

				    	    // open menu when marker is clicked
							marker.addListener('click', function(event){
								// get the marker id 
					  			var id = marker.id
					  			OpenSideNavOfChoice('#getAssetPanel'); //show asset details panel
					 			openMenuBtn() // open sideNav
					 			getAssetFromGdb(id); // populate panel with asset details with id	
					 		})
	          			})//---------------------- end of load markers


	          		}else{ console.log("Assets were not created")}
          			

          		}// ---------load recentProject function ends here



				
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

					var pos = {lat:latitude, lng:longitude} // create position object
					mapCollector.location = pos // assign position object to collector
					
					map = createNewMap(pos) // creating new map object with position

					newProject = createMapProjectInstance(mapCollector)// start new project instance here
					map.setCenter(pos);// centralize map
      				// getting position of click event
					google.maps.event.addListener(map, 'click', clickEventer);

 			});//---------------------auto complete function ends here
	
				//FUNCTION: To create new map given the location
				function createNewMap(location){
					// get div element to place map
					var mapDiv =  document.getElementById('map');
			 		var map =  new google.maps.Map(mapDiv, {
						center:location,
						zoom:10
					})
					return map; // return map object
				}


}// ------------------------------end of initiate map function
				// create marker function
	mapCollector.createMarker = function(assetSelected){
		if(!this.infowindow){
			this.infowindow.close();
			closeNav();
		}
		var marker = new google.maps.Marker({
         		position: mapCollector.coordinates,
         		map: map,
         		animation: google.maps.Animation.DROP,
         		title: assetSelected,
         		icon:customMarker(assetSelected)
         	});
		 /////////////////////////////////////////////////////////////////////
		// open menu when marker is clicked
		marker.addListener('click', function(event){
			mapCollector.infowindow.close();// close the info window
			// get the marker id 
  			var id = marker.id
  			OpenSideNavOfChoice('#getAssetPanel'); //show asset details panel
 			openMenuBtn() // open sideNav
 			getAssetFromGdb(id); // populate panel with asset details with id	
 		})
 		marker.id = mapCollector.markerId
    	mapCollector.markers.push(marker)
	}//-------------------------------------end of CreateMarker

	// Create infowindow on the clicked spot on map
	function clickEventer(event){
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
    };//------------------------------------end of clickEventer

 
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



