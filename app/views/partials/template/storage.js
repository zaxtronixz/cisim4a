// 5.Function: To load asset list to 'select input option'
function addAssetList(selector,assetId){

	var assetsList = newProject.assets // get the list of assets
	var indexVal = returnItemIndex(assets, assetId) // find our desired asset
	var dependentsList = assets[indexVal].dependents // get the dependents of this asset
	var inputList = []; // create an empty input list

	var assetSelection = `<option value ='${assetId}' hidden disabled >`;
		assetSelection += '</option>';

	// remove appended children from input selector
	if($(selector).has( "option" )){
		$(selector).children().remove()
	}
	
	// check if list is not empty
	if(dependentsList.length > 0){
		// build an inputlist of items strickly from dependency list
		assetsList.forEach(function(item){
			if(dependentsList.includes(item.id)){
				inputList.push(item) //create a input list
			}else{
				console.log("this items don't match your dependents")
			}
		})
		// buid inputList if not create a list on page
		if(inputList.length > 0){
			inputList.forEach(function(item){
				assetSelection += `<option value ='${item.id}' >`
				assetSelection += item.type + " : "
				assetSelection += item.sector +'</option>';
			})// create input list
			$(selector).append(assetSelection); // append input list
		}else{
				console.log(" input was not created ...")
			}
	}
}