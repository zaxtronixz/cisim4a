$(document).ready(function(){

	function CreateAssetObject(asset, mapClick) {
	  // generates a strings as id of the asset
	  this.id = mapClick.assetId
	  this.name = asset.name;
	  this.type = asset.type;
	  this.sector = asset.sector;
	  this.coordLat = asset.coordLat;
	  this.coordLng = asset.coordLng;
	  this.subSector = asset.subSector;
	  this.workingState = ""; // optimal / not optimal / Failed
	  this.inputAssets = [];
	  this.outputAsset = [];
	  this.output = [];
	  this.inputs = [];

	  this.depedents = [];
	};




	$('form#createAsset-form').submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');
		var method = form.attr('method');

		// an empty object to store form values;
		var assetObject = {};
		// loop throught the form and collate name and values into our object
		var formData = new FormData(document.getElementById('createAsset-form'));
			formData.forEach(function(value, key){
			    assetObject[key] = value;
			});

			// checking our objects
			
			 			
			// adding coordinate property to our object
		  	 assetObject.coordLat = mapClick.coord.lat;
		  	 assetObject.coordLng = mapClick.coord.lng;
			 
		  	 // creating our object using asset object template
			 var asset = new CreateAssetObject(assetObject, mapClick);
			 console.log("this is the asset object " + JSON.stringify(asset))
			 // jquery post method for our object
		 	$.post('postpage', asset);
	})
});
