////////////////////////////////////////////////////////////////////////
// THIS FILE CONTAINS FUNCTIONS
// Each function has it description atop
///////////////////////////////////////////////////////////////////////
  
// 1.Function:To open the control-panel on the workspace
	function openMenuBtn() {
				mapClick.infowindow.close();
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
  
// 4.Function: To create map instance
	function createProject(map){
		var mapProj = new MapProjectInstance(map)
		global.mapProj
	}


// create list of asset from map instance
function createAssetList(asset){
	mapProj.addAsset(asset)
	return mapProj.assets
}

// 5.Function: To load asset list to 'select input option'
function loadAssetToSelect(assetList){
	// get select input

	//loop through select input with
}


// 6.Function: for removing  "disabled attribute" from the form 'enable summary form'
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
function postUpdate(){
	// get post values from form
	// convert to json
	// add data to json file
	// upadate asset in neo4j db

}


// 8.Function: To post dependency variable to app
function postDependency(){
	// get dependency values from form
	// convert to json
	// use add data to json
	// use update asset function  
}
