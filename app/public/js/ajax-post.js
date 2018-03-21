$(document).ready(function(){

	// function CreateAssetObject(asset, mapCollector) {
	//   // generates a strings as id of the asset
	//   this.id = mapCollector.assetId || asset.id
	//   this.name = asset.name;
	//   this.type = asset.type;
	//   this.sector = asset.sector;
	//   this.coordLat = asset.coordLat;
	//   this.coordLng = asset.coordLng;
	//   this.subSector = asset.subSector;
	//   this.workingState = ""; // optimal / not optimal / Failed
	//   this.inputAssets = [];
	//   this.outputAsset = [];
	//   this.output = [];
	//   this.inputs = [];

	//   this.depedents = [];
	// };




$(`form#createAsset-form`).submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');
		
		// converts form data to object;
		var assetObject = formDataToObject(`createAsset-form`)

		// adding coordinate property to our object
		setCoordinate(assetObject, mapCollector)
		
		// creating our object using asset object template
		var asset = new CreateAssetObject(assetObject, mapCollector);

	 	// add asset to newly created map instance
	    newProject.addAsset(asset)
	 	// post asset data to form url
	 	assetList.push(asset)
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