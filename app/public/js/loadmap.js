
			// an object to store all the map varibales
			// start map Collector if not previously defined
				if(!mapCollector){
					var mapCollector = {};
					var newProject = {};
				}

				
				// where project instance will be stored safely
			

			function initMap(){
				// user's input is inserte into the autocomplete object
				
				var userInput = document.getElementById('userInput');
				var auto = new google.maps.places.Autocomplete(userInput)

				var map;

				// map is loaded into a <div> based on the user's input 
				auto.addListener('place_changed', 
					function(){

					// get the place object from auto complete
					var place = auto.getPlace();

					// get the place object and assigned to mapCollector places
					// properties
					console.log("this is place.name: " + place.name)
					mapCollector.places = place.name
					


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
					  	
					   	mapCollector.coord = {
					  			lat: event.latLng.lat(),
					  			lng: event.latLng.lng()
					  	}
 
					 // information window is displayed at click position
					   	mapCollector.infowindow = new google.maps.InfoWindow({
					    	content: contentString,
					    	position:mapCollector.coord
					  	});
					 	
					  	mapCollector.infowindow.open(map);
				
				      });

				    newProject = createMapProjectInstance(mapCollector)

				});

			    mapCollector.createAsset = function (){
		      		this.infowindow.close();
		      		
		      		// get the item values entered in the form
		      		// using the index number and option selected
		      		this.x = document.getElementById("type").selectedIndex;
					this.y = document.getElementById("type").options;

					// the text of the indexed, option 
					var selectedAss = this.y[this.x].text;
		      	 	var marker = new google.maps.Marker({
		          		position: this.coord,
		          		map: map,
		          		title: selectedAss,
		          		icon:customMarker(selectedAss)
	       		 	});

		      	 	
		      	 	marker.assetId = mapCollector.assetId
	       		 	// open control panel with asset details
	       		 	marker.addListener('click', function() {
    					// open sidemenu

    						openMenuBtn();
    					// hide asset creator
    						$( "#first-accordion" ).hide()
    						$( "#getAssetPanel" ).show()
    						$("#assetPanelForm").hide()

    					// display asset mananger
    						console.log("the asset id inside the marker :" + marker.assetId)
    						//show asset detail
    						//show upadate asset details
    						
    						getAssetFromGdb(marker.assetId);
    						

  					})  
	       		 	

		      	}



 	};


 
  	function createMapProjectInstance(mapCollector){
    		// create a new map instance 
    		if(typeof mapCollector.places != "undefined"){
    			console.log('Project instance was successfully created')

    			var newProject = new MapProjectInstance(mapCollector)

    			// stringify the object for posting
    			// project  =  JSON.stringify(newProject)

    			// console.log('project object now looks like this '+ newProject)
    			// // send the project object as strings to backend
    			// $.post('/postpage/createNewProject', JSON.stringify(newProject))

    			$.ajax({
				    type: 'POST',
				    url: '/postpage/createNewProject',
				    contentType: 'application/json',
				    data: JSON.stringify(newProject)
				});

    			// return the project to the console
    			return newProject;

    		}else{
    			console.log('mapCollect.places have not been defined')
    			return false;
    		}


	     		
	}

    // function triggered by form click
	function assetCreator(){
		mapCollector.assetId = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
		mapCollector.createAsset()
		
		// close control panel
		closeNav();
		// map.setCenter(marker.getPosition());
	}


