 function getAssetFromGdb(makerid){

 		var assetQueried = {};

 		var assetId = makerid;
 	
 		$.post('/getasset',{assetId: assetId}, updateControlPanel);
 	
		function updateControlPanel(asset){
 					
 				makeAsset(asset);
 				
 			}
 		
 			addAssetList("#input-multiple-select", assetId)
 			addAssetList("#multiple-select", assetId)

 			var listItem = ""

	var deleteBtn = '<div class="checkbox">'
		deleteBtn += '<label><input type="checkbox" value="">'
		deleteBtn +=  'Remove dependent</label></div>'

		// function to load selected dependencies
		$('#multiple-select option').on('click', function(){

			var counter = 0;

			$(this).attr('disabled', true)
			Item = $(this).text()

			$('#selected-list')
			.append('<li>'+ Item + ' '+ deleteBtn +'</li>')
		})

		// function to load selected inputs
		$('#input-multiple-select option').on('click', function(){
			$(this).attr('disabled', true)
			Item = $(this).text()

			$('#input-selected-list')
			.append('<li>'+ Item + ' '+ deleteBtn +'</li>')
		})
		

 }


