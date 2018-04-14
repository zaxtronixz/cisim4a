// This function builds the asset details from database into a panel form
// and also disables the form

function makeAsset(asset){
	var frm = document.getElementById('assetPanelForm');
	console.log("@makeAsset: this is asset "+ JSON.stringify(asset))

	for(i = 0; i < frm.elements.length; i++){
		for (prop in asset){
			if((frm.elements[i].type == 'select-one' ) && (frm.elements[i].name == prop)){
				// this script select an option then disables it	
				for(ii = 0; ii < frm.elements[i].options.length; ii++){

				    if (frm.elements[i].options[ii].text == asset[prop]){

				        frm.elements[i].options[ii].selected = true;
						frm.elements[i].disabled = true;
						console.log("This is a form element: "+ frm.elements[i])
				    } //-- end of internal-if statement
				}//-- end of for loop for select[options]
			}//-- end of external if

	    	else if((frm.elements[i].type == 'text' ) && (frm.elements[i].name == prop)){
					frm.elements[i].value = asset[prop];
					frm.elements[i].disabled = true;
	        }// end of if else statement
	    }//-- end of asset obj loop
	}//-- end of form element loop
	if ($( "#update-assetId" ).length){
		$( "#update-assetId" ).val(`${asset.id}`);
	}else{
		var assetId = `<input id="update-assetId" name="id" type="hidden" value="${asset.id}">`
		$("#assetPanelForm").append(assetId)
	}
	
	
	$("#assetPanelForm").append(frm).hide().show('slow');
	
}
// this the second loop to disable the form 
