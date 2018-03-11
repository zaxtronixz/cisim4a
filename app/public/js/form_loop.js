function makeAsset(asset){
	var frm = document.getElementById('assetPanelForm');
	var leftOvers = "<ul>";

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
					frm.elements[i].disable = true;
	        }// end of if else statement

			// else if (typeof frm.elements.prop){	// properties created based on map details
			// 			leftOvers += " <li><lable>"+ prop + "</lable>"
			// 			leftOvers += " "+ asset[prop] + "</li>"
			// }//-- end of else statement
	    }//-- end of asset obj loop
	}//-- end of form element loop
	leftOvers += "</ul>"

	$("#assetPanelForm").append(frm).hide().show('slow');
	$("#assetPanelForm").append(leftOvers)
	
}
// this the second loop to disable the form 
