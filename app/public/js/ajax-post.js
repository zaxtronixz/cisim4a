$(document).ready(function(){

$(`form#createAsset-form`).submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');

		// get the selected asset name from form
		this.x = document.getElementById("type").selectedIndex; //x
	    this.y = document.getElementById("type").options; //y
	    var assetSelected = this.y[this.x].text; // text of selected index

		// converts form data to object;
		var assObj = formDataToObject(`createAsset-form`)
	
		var asset = assetMaker(assObj, mapCollector, setCoord)
		//pass the asset id for marker creation
		mapCollector.markerId = asset.id
		mapCollector.createMarker(assetSelected)// create a marker for this asset
	 	// post asset data to form url
	 	postForm(url, asset);
	})
});

function assetMaker(obj, mapCollector,  somefx){
	// var asset = somefx(obj, mapCollector)
	var asset = newProject.createAsset(somefx(obj, mapCollector), mapCollector);
	return asset;	
}
// set asset coordinates as separate properties
function setCoord(asset, mapCollector){
	asset.coordLat =  mapCollector.coordinates['lat'];
	asset.coordLng =  mapCollector.coordinates['lng'];
	return asset;
}


// Use the form ID and converts its data to an object
// and return object
function formDataToObject(formId){
	var formObject = {};
	// loop throught the form and collate name and values into our object
	var formData = new FormData(document.getElementById(formId));
		formData.forEach(function(value, key){
		    formObject[key] = value;
		});

	return formObject;
}

// Function for posting our data to given url
function postForm(url, object){
	$.post(url, object)
}