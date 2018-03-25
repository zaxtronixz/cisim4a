$(document).ready(function(){

$(`form#createAsset-form`).submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');
		
		// converts form data to object;
		var assetObject = formDataToObject(`createAsset-form`)

		// adding coordinate property to our object
		setCoordinate(assetObject, mapCollector)
		
		// creating our asset object using template
		var asset = new CreateAssetObject(assetObject, mapCollector);

	 	// add asset to newly created map instance
	    newProject.addAsset(asset)
	 	// post asset data to form url
	 	postForm(url, asset);
	})
});


// set asset coordinates as separate properties
function setCoordinate(asset, coordObj){
	asset.coordLat =  coordObj.coord.lat;
	asset.coordLng = coordObj.coord.lng ;
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