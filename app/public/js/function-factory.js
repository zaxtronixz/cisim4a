////////////////////////////////////////////////////////////////////////
// THIS FILE CONTAINS FUNCTIONS
// Each function has it description atop
///////////////////////////////////////////////////////////////////////
 
// 1.Function:To open the control-panel on the workspace
function openMenuBtn() {
	mapCollector.infowindow.close();
	$('#first-accordion').show(); // c
	$( "#getAssetPanel" ).hide() //
	document.getElementById("mySidenav")
	.style.width = "300px";
}

// 2.Function: To close the control panel by clicking 'closeNav' icon
function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
};

// 3.Function to open menu button by clicking navbar
$('#start-control-panel').on('click', function(){
	openMenuBtn();
})

// 5.Function: To load asset list to 'select input option'
function addAssetList(selector,assetId){
// remove appended children 
	if($(selector).has( "option" )){
		$(selector).children().remove()
	}

	var assetList = newProject.assets
	// check if list is not empty
	if(assetList.length != 0) {
		var assetSelection = `<option value ='${assetId}' hidden disabled ></option>`;
		
		for(i=0; i< assetList.length; i++){
			if(assetList[i].id != assetId ){
				assetSelection += `<option value ='${assetList[i].id}' >`+ assetList[i].type + " : " + assetList[i].sector +'</option>';
			}
		}
		$(selector).append(assetSelection);
	}else{
		alert('Assets have not been added to this Project')
		return false;
		}
}

// 6.Function: To change "disabled attribute"  on form to'enable'
$("#edit-asset,input:checkbox").change(function(){
	$("#assetPanelForm select, input").attr("disabled", false);
});

// 7 Function to show markers bouncing on hover
$('#multiple-select').on('mouseenter','option',function(e) {
var markerId = $(this).val();
	mapCollector.markers.forEach(function(marker){
	if(marker.id == markerId){
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		}else {	
			marker.setAnimation(google.maps.Animation.BOUNCE)
			marker.setAnimation(null);
			 }
		}
	})
})

// 7. Function To remove marker on Map
	// listen to change asset type event
	// get location of asset
	// delete marker from map
	// put new marker on map
	// post asset details to database


// 7.Function: To post new form values 'update asset'
// get post values from form
$(`form#assetPanelForm`).submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');
		
		// converts form data to object;
		var assetObject = formDataToObject(`assetPanelForm`)
		
		
		newProject.assets.find(function(element, index) {
		  if (element.id == assetObject.id){
		  		// add leftover properties to asset to post
		  		assetObject.coordLat = element.coordLat
				assetObject.coordLng = element.coordLng
				assetObject.projectId = element.projectId

				// update asset in newProject instance
				for (var prop in assetObject){
                	newProject.assets[index][prop] = assetObject[prop]
                	console.log("@update: This is asset object prop in newProject "+newProject.assets[index][prop] +" \n & this is the asset object property"+assetObject[prop])
                }
            }else{
                	console.log("@update: asset with "+assetObject.id+" is not found")
                }
		});
		// var asset = new CreateAssetObject(assetObject, null);
		var asset = assetObject
		console.log(" the upadated form data is "+ asset )
		postForm(url, asset);
	
	// add data to json file
	// upadate asset in neo4j db
})


// 8.Function: To create input for dependency variable to app
$(`form#add-input-form`).submit(function(event){
	event.preventDefault();
		var form = $(this);
		var url = form.attr('action');

	// get dependency values from form
	var assetObject = formDataToObject(`add-input-form`)
	// convert to json

	console.log(" this is what we got input: "+ JSON.stringify(assetObject))
	var asset = assetObject
	// postForm(url, asset);
	// use update asset function  

})

// 9.Function: To post dependency variable to app
$(`form#create-dependents-form`).submit(function(event){
	event.preventDefault();
		var form = $(this);
		var url = form.attr('action');

	// get dependency values from form
	var dependency = createMultiSelectArray('create-dependents-form')
	newProject.addAssetDependents(dependency )// add dependents to asset
	// convert object to text before submitting
	dependency = JSON.stringify(dependency)
	
		$.ajax({type: 'POST',
				url: url,
				contentType: 'application/json',
				data:dependency 
				});
	// use update asset function  

})

// Function: set project  name  to given
$('#startProj-btn').on('click', function(){
	if($('#projectName').val()){
		var projectName = $('#projectName').val()
		document.getElementById('project-title').innerHTML = "<h5>Project: "+projectName+"<h5>"
	}
})


// 9.Function: To Create Visualization
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VISUALIZATION DATA


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#generate-scenarioResult-btn').on('click',function(){
		// get newProject data
	// get scenario data 
		// asset data
	// total number of assets
	// set dependent to failed
	// set failed asset in neo4j
	// every asset dependent on failed asset should be set to failed
	// return # % of working assets
	// return # % of failed assets 

})



// 8.Function: To post dependency variable to app
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCY DATA


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: To create an array of all selected options
function createMultiSelectArray(selector){
	// var assetId = $('form#'+selector+' option').prop('hidden', true).val()
	var assetId = document.querySelectorAll('#'+selector+' option, hidden')[0].value
	// select form elements to populate
	var mySelected = $('form#'+selector+' option').prop('selected', true) 
	
	var depensArr=[];
	var myObject ={};
		myObject.assetId = assetId;

	for(i=0; i<mySelected.length;i++){
		if(assetId != mySelected[i].value){
			depensArr.push(mySelected[i].value)
		}else{
			console.log("Error:NO#2 No assets to create dependents")
		}
	}
	myObject.dependency = depensArr
	return myObject;
}


// Function: to delete asset from edit form
$('#delete-btn').on('click' , function(event){
	 if ($(this).is(':checked')) {

		var assetName = $('#assetPanelForm :input[name]').val() // 
		var assetDeleted  = confirm("Click OK to delete asset: " + assetName + " from this Project");
		// confirmation window action to proceed and delete asset
		if(assetDeleted == true){
			var assetId = $('#update-assetId').val()
			var projectId = window.newProject.id

			for(i=0; i< newProject.assets.length;i++){
			  	if (newProject.assets[i].id == assetId){
			  		newProject.assets.splice(i,1) 
			  		newProject.assetTotal -= 1;
			  		// Delete marker from map
			  		markerRemover(assetId)
			  	}
			  }
		// send to delete asset from database
			postForm('getasset/delete', {assetId : assetId, projectId: projectId})
		}
	}else{
		return false;
	}
	$(this).prop('checked', false); 
});


// Function for Project instance creation
$('#startProj-btn').on('click' , function(event){
	var projectName = $('#projectName').val() // get project name entered
	
	if(projectName != ""){ // if project name is not empty
		newProject.name = projectName // set the project instance name
	}else{
		// project name is empty
		console.log('Project name is not defined')
	}
})	

// Function: To remove marker from the map
function markerRemover(id){
        //Find and remove the marker from the Array
        for (var i = 0; i < mapCollector.markers.length; i++) {
            if (mapCollector.markers[i].id == id) {
                //Remove the marker from Map                  
               mapCollector.markers[i].setMap(null);
 
                //Remove the marker from array.
                mapCollector.markers.splice(i, 1);
                return;
            }
        }
}


// Function to add circles for Working State
$('#display-working-state').on('click', function(){
	$("#rightMenu").css("display", "block");
	mapCollector.markers.forEach(function(item, index){
			// check for matching of markersId and assetIds
			if(item.id == newProject.assets[index].id ){
					// Get the positions of markers on map
				 	var position ={
          				lat: mapCollector.markers[index].getPosition().lat(),
          				lng: mapCollector.markers[index].getPosition().lng()
          			}
				if(newProject.assets[index].workingState == 'optimal'){
          			addCircles('#0000FF', position)
        		}else{
        			addCircles('#FF0000', position)
        		}
      		}
      	})
      	 // Add circles to CI assets
      	function addCircles(color, position){
      		var cityCircle = new google.maps.Circle({
            	strokeColor: color,
            	strokeOpacity: 0.8,
            	strokeWeight: 2,
            	fillColor: color,
            	fillOpacity: 0.35,
            	map: map,
            	center: position,
            	radius: 3640 
          }); // end of addCicles fx
	}
	// open right menu 
    // document.getElementById("rightMenu").style.display = "block";

		// get asset data from project instance
		var total = newProject.assetTotal
		var failed = newProject.assetsWorkingState.failed.length
		var optimal = newProject.assetsWorkingState.optimal.length
		// assign data to cloumn in a table
		$('#asset-total-column').html(total);
		$('#asset-optimal-column').html(optimal);
		$('#asset-failed-column').html(failed);
		// close the nav bar
		closeNav()
})

// Function to close the statistic menu
	$('#rightMenu').on("click", function(){
		 document.getElementById("rightMenu").style.display = "none";
	   
	})

// Function to return the index of and array object
 function returnItemIndex(array1 , value){
    return  array1.findIndex(function findId(element){
       return (element.id == value)
      })
    }

// Functions 