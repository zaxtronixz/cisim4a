////////////////////////////////////////////////////////////////////////
// THIS FILE CONTAINS FUNCTIONS
// Each function has it description atop
///////////////////////////////////////////////////////////////////////
 
// 1.FUNCTION:To open the control-panel on the workspace
function openMenuBtn() {
	document.getElementById("mySidenav").style.width = "300px";
};//---------------------------------------------------------------

// 2.FUNCTION: To close the control panel by clicking 'closeNav' icon
function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
};//-----------------------------------------------------------------

// 3.FUNCTION:To set project  name  to given
$('#startProj-btn').on('click', function(){
	if($('#projectName').val()){
		var projectName = $('#projectName').val()
		document.getElementById('project-title').innerHTML = "<h5>Project: "+projectName+"<h5>"
	}
})//----------------------------------------------------------------------

// 3.FUNCTION: To open asset creation panel by clicking on Marker
function openCreateAssetPanel(){
	OpenSideNavOfChoice('#first-accordion'); // open desired panel
	mapCollector.infowindow.close(); // close marker infoWindow
	openMenuBtn() // open sideNav
};//-----------------------------------------------------------------------


// 3.FUNCTION: To change "disabled attribute"  on form to'enable'
$("#edit-asset,input:checkbox").change(function(){
	$("#assetPanelForm select, input").attr("disabled", false);
});//-------------------------------------------------------------------------

// 4.FUNCTION: To open Control panel by clicking navbar:'menu-btn'
$('#start-control-panel').on('click', function(){
	// declare variables
	var assetList = newProject.assets;
	// Is sideNav already opened
	if( document.getElementById("mySidenav").style.width == '300px' )
	{
		closeNav();// close the sideNav
	}else{
		addAssetList('#select-asset-scenario', null)
		OpenSideNavOfChoice('#control-panel'); //open sideNav of choice
		openMenuBtn() // open sideNav
	}
});//-------------------------------------------------------------------------

// 5. FUNCTION: To check an array of objects if an item exist
function checkArray(arr, prop, test){
	var found = false;
	arr.forEach(function(item){
		if(item[prop] == test){
			found  = true;
		}
	}); return found;
}

// FUNCTION: To find index value given an array of objects
function findIndexValue(arr, prop, test){
	var found = null;
	for(i=0;i<arr.length;i++){
    	if(arr[i][prop] == test ){
			found = i;
		}
	}
	return found;
}


// 5.Function: To load asset list to 'selected input option'
function addAssetList(selector, assetId, listType){
	// Variables declaration
	var assetList = Array.from(newProject.assets) //get assets array
	// initialization: remove appended children
	$(selector).children().remove()
	// hide the id of the dependent as option
	if(assetId){
		var assetSelection = '<ul class="selection-list-group"> '; // create empty array
		assetSelection += `<li style='display:none' id='${assetId}' name='${newProject.id}' >`; 
	 	assetSelection += "</li >";
		if(assetList.length != 0){ 	// check if list is not empty
			var indexVal = returnItemIndex(assetList, assetId) // get the dependent asset indexvalue
			var asset = assetList[indexVal] // assign the dependent asset to a variable
			assetList.splice(indexVal, 1) // remove the dependent asset from List
			assetSelection += createOptionList(asset, assetList, listType) // create option of the remainig assets
			
			assetSelection += '</ul>' 
			$(selector).append(assetSelection);	// attach the option list created to an element
		}else{
			interact('Assets are too few', "warning")
			return false;
		}
	}else{ // create scenario asset selection optionList
		var assetSelection = ""; 
		assetList.forEach(function(item){
			assetSelection += `<option id=${item.id} class="selection-list-item">`;
			assetSelection += item.name +" : " +item.type +'</option>'; // create empty array
		});// create list for scenario
		$(selector).append(assetSelection);
	}
};//------------------------------------------------------------------------------



// 7.FUNCTION: to show markers bouncing on hover
function bouncingMarkers(selector){

$('#'+selector).on('mouseenter','option',function(e) {
	var markerId = $(this).attr('id');
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

}



// 8. Function to create "select option" given asset List and array
function createOptionList(asset, assetList, listType){
	var htmlElem = ''; // declare where to store assets	
 
	if(listType == "dependents"){ // CREATE DEPENDENCY OPTIONS
		if(asset.dependents){// if dependents already exists
			assetList.forEach(function(item){ // Loop through assetList
			if(!asset.dependents.includes(item.id)){ // check if item is not in dependents
				var newElement = '';
				htmlElem += createNewAssetOption(newElement, item) // add to the html element
				}
			})
			return htmlElem;
		}else{ // if inputs was not previously populated
			assetList.forEach(function(item){ // push all assets into optionList
				var newElement = '';
				htmlElem += createNewAssetOption(newElement, item)
			})
			return htmlElem;
		}	
	}else if (listType == "inputs") {// CREATE INPUT OPTIONS
		if(asset.dependents){// if dependents already exists
			if(asset.inputs){// if inputs is defined
				assetList.forEach(function(item){ //for each item from List
					var newElement = ''; // where store assets
					if((!asset.inputs.includes(item.id))&& (asset.dependents.includes(item.id))){ // if item is not already in input
						htmlElem += createNewAssetOption(newElement, item) // add to the html element
					}
				})
				// return html list created
				return htmlElem 
			}else{ // input is not defined
				var newElement = ''; // where to store assets
				asset.inputs = []// define asset input property
				assetList.forEach(function(item){ //for each item from List
					if(asset.dependents.includes(item.id)){
						htmlElem += createNewAssetOption(newElement, item) // add to the html element
					}
				})
				// return html list created
				return htmlElem
			}
		}else { // tell user to create dependency first
			interact("dependents must be created to add inputs", 'warning')
		}
	}
}
// FUNCTION TO only add new assets to Option_List
function createNewAssetOption(htmlElem, item){
	htmlElem += `<li class='selection-list-item' id= ${item.id}>`
	htmlElem +=  item.name + " : " 
	htmlElem +=  item.type + " : " 
	htmlElem +=  item.sector +'</li>';
	return htmlElem;
}

// 6.FUNCTION: To Load assets to Scenario creation
function loadScenarioAsset(selector){
	// load assets into selection
	newProject.assets.forEach(function(item){

	})

}


// 7.FUNCTION: To post new form values 'update asset'
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
                	interact("@update: asset with "+assetObject.id+" is not found", "warning")
                }
		});
		// var asset = new CreateAssetObject(assetObject, null);
		var asset = assetObject
		postForm(url, asset);
	
	// add data to json file
	// upadate asset in neo4j db
})


// 8.Function: To create input for dependency variable to app
$(`#add-input-btn`).on('click', function(event){
	var url = '/getasset/addInputs'; // url to post data
	// get inputs values from List
	var inputs = createMultiSelectArray('input-multiple-select', 'input-selected-list')
	newProject.addInput(inputs)// add dependents to asset
	// convert object to text before submitting
	$.ajax({type: 'POST',
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(inputs) 
	});
	interact("inputs creation is successful", "progress")
	closeNav()
})

// 9.Function: To post dependency variable to app
$(`#create-dependents-btn`).on('click', function(event){
	var url = '/getasset/createDependency'; // url to post data
	// get dependency values from List
	var dependency = createMultiSelectArray('multiple-select', 'selected-list')
	newProject.addAssetDependents(dependency)// add dependents to asset
	// convert object to text before submitting
	$.ajax({type: 'POST',
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(dependency) 
	});
	// use update asset function 
	interact("dependency creation is successful", "progress")
	closeNav() 
})

// 9.FUNCTION: Open a specific menu button
function OpenSideNavOfChoice(selector){
	// close all the panels
	$('#getAssetPanel').hide();
	$('#first-accordion').hide();
	$('#control-panel').hide();
	switch (selector) {
	    case '#getAssetPanel': // open menu with get asset panel
	        $('#getAssetPanel').show();
	        break; 

	    case '#first-accordion': // open menu to create asset
	        $('#first-accordion').show();
	        break; 
	    case '#control-panel': // open menu for control panel
	        $('#control-panel').show();
	        break;
	}

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#create-scenario-btn').on('click',function(){
	// get the post address
	url = "/getasset/createScenario";
	// get selected asset id
	var assetId = $( "#select-asset-scenario :selected" ).attr('id')
	// get selected scenario
	var scenario = $( "#scenario-selection :selected" ).text()
	// create scenario object
	var scenObject = {assetId : assetId, type: scenario}
	interact("Scenario of "+scenario+" is applied to "+ " asset with id "+assetId, 'progress')
	// create scenario to project
	window.scenario = new CreateScenario(scenObject)
	// post the scenario
		$.ajax({type: 'POST',
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(scenObject),
			success : scenarioCallback
	});
		closeNav();

})


// FUNCTION: Scenario callback function
function scenarioCallback(assetsAffected){
	var r = assetsAffected;
	var affected = []
		for (i=0;i<r[0]._fields[0].length;i++){
			affected.push(r[0]._fields[0][i].properties)
		}
	window.scenario.currentWorkingState(affected); // create current working state data

}


// 8.Function: To post dependency variable to app
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCY DATA


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: To create an array of all selected options
function createMultiSelectArray(optionSel, selector){
	// var assetId = $('form#'+selector+' option').prop('hidden', true).val()
	var assetId = $( '#'+optionSel+" li" ).first().attr('id')
	var projectId = $( '#'+optionSel+" li" ).first().attr('name')
	// select form select options that have been "selected"
	var arr = $('#'+selector+" li")
	var dependencies = [];
	for(i=0;i<arr.length;i++){
		var dependent = ($(arr[i]).attr('id')) //get id of all selected assets
		dependencies.push(dependent) // dependent id to array
	}
	return {assetId:assetId ,projectId: projectId, dependency: dependencies } // assetid and dependencies
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
			  interact("Asset with id " + assetId+ " is deleted", "warning")
		// send to delete asset from database
			postForm('getasset/delete', {assetId : assetId, projectId: projectId})
		}
	}else{
		return false;
	}
	$(this).prop('checked', false); 
});


// Function: To save new project instance
 $('#startProj-btn').on('click', function(){
 		if(!newProject.saved){
 			// save new project name
 			newProject.name = $('#projectName').val()
 			newProject.saved = true;
 			// log file info
 			var desc = newProject.name +" Project was saved successfully"
 			createLogFile('Save Project',desc )	
 		}else{
 			// interact with the user
 			interact(newProject.name+" project cannot be saved ", "warning")
 			// save the following tolog files
 			var desc = "Duplicate project saving was not permitted"
 			createLogFile('Save Project',desc )
 		}

 });

// FUNCTION: To load interactive message user
function interact(message, type){
	var mssg = "<p>" + message + "</p>"; // create mssg body
	$( "#animator" ).children().remove()// remove previous message
	// check if message is warning
	if(type == "warning"){
		// change message background to red
		$( "#animator" ).css("background-color", "rgba(243, 77, 81, 0.7)")
		$( "#animator" ).append(mssg)
	}else{
		// change message background to blue
		$( "#animator" ).css("background-color", "rgba(95, 186, 255, 0.7)")
		$( "#animator" ).append(mssg)
	}
	
    $( "#animator" ).show()
  	$( "#animator" ).animate({ "top": "+=150px" }, 1300 ).delay(1700 );
  	$( "#animator" ).animate({ "top": "-=150px" }, 1300 , function() {
       $( "#animator" ).css("display","none")
    });
 }// ------------------------end of interaction function



// FUNCTION: to disable save project name button
$(document).ready(function(){
    $('#startProj-btn').attr('disabled',true);
    $('#projectName').keyup(function(){
        if($(this).val().length !=0)
            $('#startProj-btn').attr('disabled', false);            
        else
            $('#startProj-btn').attr('disabled',true);
    })
});

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
$('#display-working-state').change( function(){
	if(this.checked){
		$("#rightMenu").css("display", "block"); // display the statistic menu

		if(mapCollector.markerCircles){
			mapCollector.markers.forEach(function(item, index){
				// check for matching of markersId and assetIds
				if(item.id == newProject.assets[index].id ){
					// Get the positions of marker from map
					var position = getMarkersLatLng(index)
					//  circles to marker position
					if(newProject.assets[index].workingState == 'optimal'){
	          			addCircles('#0000FF', position, item.id)
	        		}else{
	        			addCircles('#FF0000', position, item.id)
	        		}
				}else{
					// Get the positions of marker from map
					markerCircle.setMap(null)

				}
			})
		}
	}else{ // hide circles from marker
			console.log("Could not delete the colour")
		}
   	displayProjectStat()// display project statistic
	// close the nav bar
	closeNav()
})


// FUNCTION: To display statistics about the assets created
function displayProjectStat(){
	// Get data from project instance
	var total = newProject.assetTotal
	var failed = newProject.assetsWorkingState.failed.length
	var optimal = newProject.assetsWorkingState.optimal.length

	// Populate table with data 
	$('#asset-total-column').html(total);
	$('#asset-optimal-column').html(optimal);
	$('#asset-failed-column').html(failed);
}

// FUNCTION: To get Markers latLong given index 
function getMarkersLatLng(index){
	var position = {
     				lat: mapCollector.markers[index].getPosition().lat(),
     				lng: mapCollector.markers[index].getPosition().lng()
     			}
    return position;
}//----------------------------------------------------------------------------------------

// FUNCTION: To add a circle color to a given latLong
function addCircles(color, position, id){
    markerCircle = new google.maps.Circle({
         	strokeColor: color,
         	strokeOpacity: 0.8,
         	strokeWeight: 2,
         	fillColor: color,
         	fillOpacity: 0.35,
         	map: map,
         	center: position,
         	radius: 3640
         })

    markerCircle.id = id; // add the asset id to the circle
    mapCollector.markerCircles.push(markerCircle)// push the circle into an array 

};//-----------------------------------------------------------------------------------

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

// FUNCTION: TO add operation logs to table
function createLogFile(op, desc) {
    var table = $("#logFile"); // get table
    var counter = $("#logFile").children().length // count number of rows
    var tableData  = "<tr><td>" + counter+1 +"</td>";
    	tableData  = "<td>" + op + "</td>";
    	tableData  = "<td>" + desc + "</td>";
    	tableData  = "</tr>"
    	// add data to table
    	table.append(tableData)
}