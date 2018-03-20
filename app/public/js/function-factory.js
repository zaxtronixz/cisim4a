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

// 3.Function To select dependencies and display them on control panel
	var listItem = ""

	var deleteBtn = '<div class="checkbox">'
		deleteBtn += '<label><input type="checkbox" value="">'
		deleteBtn +=  'Remove dependent</label></div>'

	$('#multiple-select option').on('click', function(){
		$(this).attr('disabled', true)
		Item = $(this).text()
		$('#selected-list')
		.append('<li>'+ Item + ' '+ deleteBtn +'</li>')
	})
  



// create list of asset from map instance
function createAssetList(asset){
	mapProjectInstance.addAsset(asset)
}

// 5.Function: To load asset list to 'select input option'
function loadAssetToSelect(assetList){
	// get select input
	// get asset list
	//loop through select input and append asset
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


// 8.Function: To post dependency variable to app
function postDependency(){
	// get dependency values from form
	// convert to json
	// use add data to json
	// use update asset function  
}

// 9. Function to Delete asset from database

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

