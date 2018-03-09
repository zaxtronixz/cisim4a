 function getAssetFromGdb(makerid){

 		var assetQueried = {};

 		var assetId = makerid;
 	
 		$.post('/getasset',{assetId: assetId}, updateControlPanel);
 	
		function updateControlPanel(asset){
				console.log("this is the aasset unstringified " + asset.id)
 				var newasset = JSON.stringify(asset);
 				console.log('updateControlPanel function getAsset :'+ newasset);

 				var stringitize = "<ul id='asset-summary'>";

 				for (var prop in asset) {
 					stringitize += "<li>" + "<label>"+ prop +"</label>";
 					stringitize += " " + asset[prop] + "</li>"
 					
 				}
 					stringitize += " </ul>";
 				$("#getAssetPanel").append(stringitize);
 			}

 }