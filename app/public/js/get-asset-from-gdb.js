 function getAssetFromGdb(makerid){

 		var assetQueried = {};

 		var assetId = makerid;
 	
 		$.post('/getasset',{assetId: assetId}, updateControlPanel);
 	
		function updateControlPanel(asset){
 					
 				makeAsset(asset);
 			}
 		

 }


