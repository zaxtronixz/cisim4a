////////////////////////////////////////////////////////////////////////
// THIS FILE CONTAINS FUNCTIONS
// Each function has it description atop
///////////////////////////////////////////////////////////////////////
 
// 1.Function:To open the control-panel on the workspace
	function openMenuBtn() {
				mapCollector.infowindow.close();
				$('#first-accordion').show();
				$( "#getAssetPanel" ).hide()
		    	document.getElementById("mySidenav")
		    	.style.width = "300px";
		    }

// 2.Function: To close the control panel by clicking 'closeNav' icon
	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	};



// 5.Function: To load asset list to 'select input option'
function addAssetList(selector,assetId){
	// remove appended children 
	if($(selector).has( "option" )){
		$(selector).children().remove()
	}

	// check if list is not empty
	if(assetList.length != 0) {
		var assetSelection = `<option value ='${assetId}' hidden disabled ></option>`;
		for(i=0; i< assetList.length; i++){
			if(assetList[i].id != assetId ){
					assetSelection += `<option value ='${assetList[i].id}' >`+ assetList[i].type + " : " + assetList[i].sector +'</option>';
			}
		}$(selector).append(assetSelection)
	}else{
			alert('Assets have not been added to this Project')
			return false;
		}
}

// 6.Function: To change "disabled attribute"  on form to'enable'
$("#edit-asset,input:checkbox").change(function(){
	$("#assetPanelForm select, input").attr("disabled", false);
});

// 7. Function To exchange marker on Map
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
		// convert to json
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

	console.log('FF dependency is '+ dependency)
	
		$.ajax({type: 'POST',
				url: url,
				contentType: 'application/json',
				data: JSON.stringify(dependency)
				});
	// use update asset function  

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
	var mySelected = $('form#'+selector+' option').prop('selected', true)
	
	var depensArr=[];
	var myObject ={};
		myObject.assetId = assetId;

	for(i=0; i<mySelected.length;i++){
		depensArr.push(mySelected[i].value)
	}
	myObject.dependency = depensArr
	return myObject;
}


// Function: to delete asset from edit form
$('#delete-btn').on('click' , function(event){
	var assetName = $('#assetPanelForm :input[name]').val()
	var assetDeleted  = confirm("Click OK to delete asset: " + assetName + " from this Project");

	if(assetDeleted== true){
		var assetId = $('#update-assetId').val()
		// send to delete asset from database
		postForm('getasset/delete', {assetId : assetId})
	}else{
		return false;
	}
});


// Function for Project instance creation
$('#startProj-btn').on('click' , function(event){
	var projectName = $('#projectName').val()

	// checking if the map collector object was previously defined
	if(mapCollector){
		mapCollector.name = projectName;
	}
	else{
		var mapCollector = {};
			mapCollector.name = projectName;
	}
})

