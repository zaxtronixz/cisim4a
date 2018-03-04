$(document).ready(function(){
	$('form#createAsset-form').submit(function(event){
		// $('form#createAsset-form').click(function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr('action');
		var method = form.attr('method');

		 var assetObject = $('form#createAsset-form').serializeArray();
		  // var assetObject = $('form#createAsset-form').serializer();
	

		 console.log(assetObject);

		 $.post('postpage', assetObject);
	})
});


function CreateAssetObject(name, type, sector, subSector,coord) {
  this.name = name
  this.type = type;
  this.sector = sector;
  this.coord = coord;
  this.subSector = subSector;

  this.inputAssets = {};
  this.outputAsset = {};


  this.getinput = function(input, dependencyType){ 
  this.inputAssets['dependents'] = {name:input.name, 
  									coord: input.coord, 
  									dependencyType:dependencyType}
					      }
}