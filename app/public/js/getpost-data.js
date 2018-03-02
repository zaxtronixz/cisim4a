function CreateAssetObject(name, type, sector, subSector,coord) {
  this.name = name
  this.type = type;
  this.sector = sector;
  this.coord = coord;
  this.subSector = subSector;

  this.inputAssets = {};
  this.outputAsset = {};


  this.getinput = function(input, dependencyType){ 
  this.inputAssets['dependents'] = {name:input.name, coord: input.coord, dependencyType:dependencyType}
      }

  this.removeInputAsset = function(victim){
    if(victim.name in this.inputAssets.dependents){
      delete this.inputAssets(victim);
      return console.log (`${victim} was successful deleted from ${this.name}`)
    }else{
      console.log (`${victim} is not a dependent of ${this.name}`)
      return false
        }
    }
 
  };


// test samples
// var asset1 = new CreateAssetObject("local_transformer","transformer","energy",{lat:34, lng:87}, "electricity");
// var asset2 = new CreateAssetObject("newAre_transformer","transformer","energy",{lat:39, lng:87}, "electricity");
// asset1.getinput(asset2, "virtual");
// asset1.removeInputAsset("newAre_transformer");