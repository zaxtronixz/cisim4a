function CreateAssetObject(asset) {
  // generates a strings as id of the asset
  this.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  this.name = asset.name
  this.type = asset.type;
  this.sector = asset.sector;
  this.coord = asset.coord;
  this.subSector = asset.subSector;
  this.workingState = "" // optimal / not optimal / Failed
  this.inputAssets = [];
  this.outputAsset = [];
  this.output = [];
  this.inputs = [];

  this.depedents = [];

 };

  // this.getinput = function(input, dependencyType){ 
  // this.inputAssets['dependents'] = {name:input.name, coord: input.coord, dependencyType:dependencyType}
  //     }

  // this.removeInputAsset = function(victim){
  //   if(victim.name in this.inputAssets.dependents){
  //     delete this.inputAssets(victim);
  //     return console.log (`${victim} was successful deleted from ${this.name}`)
  //   }else{
  //     console.log (`${victim} is not a dependent of ${this.name}`)
  //     return false
  //       }
  //   }

// test samples
// var asset1 = new CreateAssetObject("local_transformer","transformer","energy",{lat:34, lng:87}, "electricity");
// var asset2 = new CreateAssetObject("newAre_transformer","transformer","energy",{lat:39, lng:87}, "electricity");
// asset1.getinput(asset2, "virtual");
// asset1.removeInputAsset("newAre_transformer");
