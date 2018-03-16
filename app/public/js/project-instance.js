function MapProjectInstance(map) {
  // generates a strings as id of the asset
  this.id = (Date.now().toString(36) + Math.random().toString(36).substr(5, 9)).toLowerCase();
  this.name = map.name
  this.location = map.location;
  this.coord = map.coord;

  this.assets = [] 
  this.assetsWorkingState = { // optimal / Failed
  	optimal:[],
  	failed:[]
  }

  
  this.assetTotal = 0,
  this.scenario = {
         // "type":"Extreme Wind",
         // "time":"12:47",
         // "assetApplied":{
         //    "name":"local Antennae",
         //    "id":"HJKOLPRE"
         },
 this.resultVisualization = {
         // "displayType":"graph",
         // "valuesGenerrated":{}


      }
// this function adds and asset to the map
 this.addAsset = function(asset) {
 	var addMe  = {};
 		addMe.id = asset.id;
  		addMe.type = asset.type;

  		if(typeof asset.produceService != 'undefined'){
  			addMe.service = asset.produceService
  		}

	  	if(this.assets.push(addMe)){
	  		this.assetTotal += 1;
	  	}

	  	if((typeof asset.workingState != 'undefined') && (asset.workingState != '') ){
	  		
	  		if(asset.workingState == 'optimal'){
	  			this.assetsWorkingState.optimal.push(addMe);

	  		}else if(asset.workingState == 'failed'){
	  			this.assetsWorkingState.failed.push(addMe);

	  		} // end of if else

	  	}// end of asset working state 

  }// end of addAsset function 
}  

