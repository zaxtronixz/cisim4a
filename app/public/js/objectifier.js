////////////////////////////////////////////////////////////////////////////////////////
// ASSET OBJECT
	function CreateAssetObject(asset, mapCollector) {
	  // generates a strings as id of the asset
	  this.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
	  this.name = asset.name;
	  this.type = asset.type;
	  this.sector = asset.sector;
	  this.coordLat = mapCollector.coordinates.lat;
	  this.coordLng = mapCollector.coordinates.lng;
	  this.subSector = asset.subSector;
	  this.workingState = ""; // optimal / not optimal / Failed
	  this.dependents = [];
	  this.inputs = [];
    this.output = [];
    


  }//----------------- end of create asset object ----------------------------


//////////////////////////////////////////////////////////////////////////////////////////
// CREATE SCENARIO

function CreateScenario(scenarioData){

  this.scenarioId = "_"+scenarioData.projectId
  this.type = scenarioData.type;
  this.assetAppliedTo = scenarioData.assetId
  this.totalAssets = newProject.assetTotal;
  // 
  this.previousOptimalAssets =""
  this.previousFailedAssets = ""

  this.currentOptimalAssets = ""
  this.currentFailedAssets = ""
  this.assetAffected = ""
  this.degreeOfImpact = 0;

// function add asset states
  this.addWorkingState = function(){

  }
}



//////////////////////////////////////////////////////////////////////////////////////////
// MAP INSTANCE OBJECT
function MapProjectInstance(mapCollector) {
  // generates a strings as id of the asset
  this.id = (Date.now().toString(36) + Math.random().toString(36).substr(5, 9)).toLowerCase();
  // if a name is not set for the project improvise
  
  this.name =  ''; //name is not given
  this.places = mapCollector.places || "";
  this.location = mapCollector.location || ""; // assign latLong values to object
  this.saved = "" // if name is not entered project is not saved

  this.assets = [];
  this.markers = [];
  this.assetsWorkingState = { // optimal / Failed
  	optimal:[],
  	failed:[]
  }

  
  this.assetTotal = 0;
  this.scenario = {
         // "type":"Extreme Wind",
         // "time":"12:47",
         // "assetApplied":{
         //    "name":"local Antennae",
         //    "id":"HJKOLPRE"
         //   workingStateBefore: 4;
         //   workingStateAfter: 0
         //   ScenarioEffect: (NoOfFailedAsset/Totalasset) x 100%
  };//--------------------------------------------------------------------

 this.resultVisualization = {
         // "displayType":"graph",
         // "valuesGenerrated":{}
  };//------------------------------------------------------------------

// set name and set the saved instance of the project
this.setName = function(name){
  if (!this.name) {
    this.name =  mapCollector.name || 'not_defined_'+ this.id
  }else{
    this.name = name // save name of the project
    this.save  = true; // set the saved project instance
  }

}
// call the set name function
this.setName(null)
// create asset from scratch
this.createAsset = function(asset, mapCollector){
    var asset  = new CreateAssetObject(asset, mapCollector)
    asset.projectId = this.id;
    this.addAsset(asset)
    return asset;
}//------------------------------------------------------------create asset

// this function adds and asset to the newProject instance
 this.addAsset = function(asset) {
      var addMe  = {};
      addMe.id = asset.id;
      addMe.type = asset.type;
     

  		if(typeof asset.serviceProvided != 'undefined'){
  			asset.serviceProvided = ''
  		}

	  	if(this.assets.push(asset)){
          // increment asset total
  	  		this.assetTotal += 1;
          // if asset working state is not defined
  		  	if((typeof asset.workingState != 'undefined') || (asset.workingState != '') ){
  		       asset.workingState = 'failed';
             this.assetsWorkingState.failed.push(addMe);
          }else{
  	  		   this.assetsWorkingState.optimal.push(addMe);

  	  		} // end of if else

	  	}// end of asset working state 

  }//----------------------------- end of addAsset function ---> 

// get id of asset create scenario on that asset
this.createScenario = function(assetId){

  // this.assets.forEach(function(item){
  //     if(item.inputs.includes(assetId)){
  //       item.splice(returnItemIndex(item.inputs, assetId), 1)
  //       if(item.workingState == 'optimal'){ // if working state is optimal
  //         item.workingState = 'failed' // change working state to failed
  //         // remove item from optimal working state
  //         this.assetsWorkingState.optimal.splice(returnItemIndex(item.id, 1))
     
  //         // add asset to failed working state
  //         this.assetWorkingState.failed.push(item.id)
  //       } else{
  //         console.log("asset@Working: Asset previously in failed state")
  //       }
  //     }
  // })

}//--------------------------------------------------------


// This function adds dependent to the asset
this.addAssetDependents =  function(arr){
  var id = arr.assetId; // asset id
  var dependentsList = arr.dependency; // get dependency array
  var assetList = this.assets 
  var indexVal =  returnItemIndex(assetList, id) // get index value of the asset
  console.log("we might get far")
  this.addArrayToObject(dependentsList, indexVal, 'dependents') // add dependency to object
} 


this.addArrayToObject = function(listToAdd, index, wereToAdd){
  var assetList = this.assets // get asset project list
  if(!assetList[index][wereToAdd]){// if dependent is not defined
      assetList[index][wereToAdd] = [];// create dependent arr
     for(i=0; i<listToAdd.length;i++){
       assetList[index][wereToAdd].push(listToAdd[i]) //load assets
     }
  }
  else if(assetList[index][wereToAdd]){ // if dependents exist
     for(i=0; i<listToAdd.length;i++){
       //check if dependent already exists
       if(!assetList[index][wereToAdd].includes(listToAdd[i])){ //check if dependents is not already in list
         assetList[index][wereToAdd].push(listToAdd[i])
       }
     }
  }
  else{
      console.log("Nothing new to add as dependents")
  }   
  // if(!assetList[indexVal].dependents){// if dependent is not defined
  //    assetList[indexVal].dependents = [];// create dependent arr
  //    for(i=0; i<dependentsList.length;i++){
  //      assetList[indexVal].dependents.push(dependentsList[i]) //load assets
  //    }
  // }
  // else if(assetList[indexVal].dependents){ // if dependents exist
  //    for(i=0; i<dependentsList.length;i++){
  //      //check if dependent already exists
  //      if(!assetList[indexVal].dependents.includes(dependentsList[i])){ //check if dependents is not already in list
  //        assetList[indexVal].dependents.push(dependentsList[i])
  //      }
  //    }
  // }
  // else{
  //     console.log("Nothing new to add as dependents")
  // } // end of each function
} //---------------------------------- end of add dependents function


    // // FUNCTION: ERROR : To change working state of asset
    this.changeState = function(asset){ 
      if(asset.dependents && asset.inputs){
        if(asset.dependents.length == asset.inputs.length){
          // change working state from failed to working
          asset.workingState = 'optimal';  
       }else {
          console.log(asset.dependents.length - asset.inputs.length + " Nos of input is remaining")
      }
    }else{ console.log("Create dependents and inputs first")}
    }//---------------------------------------------------------------------------

    // /// FUNCTION:ERROR : To add input if they match dependents 
    this.addInput = function(arr){
      var id = arr.assetId; // asset id
      var inputList = arr.dependency; // get dependency array
      var assetList = this.assets 
      var indexVal =  returnItemIndex(assetList, id) // get index value of the asset
      this.addArrayToObject(inputList, indexVal, 'inputs') // add inputs to object
      this.changeState(assetList[indexVal]) //change asset states
  };//-----------------------------------------------------------------------------


}//------------------------End of Create Project------------------------------------------------