////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var jsonWriter = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonFile = require('../data/data.json')

/////////////////////////////////////////////////////////////////////////////////////
// Setting up body parser to receive text and url-encoded format
//////////////////////////////////////////////////////////////////////////////////////
jsonWriter.use(bodyParser.json());
jsonWriter.use(bodyParser.urlencoded({extended: false}));

// 1. CREATE: NEW PROJECT with asset details
jsonWriter.createNewProject = function(newProject){
			jsonFile.projects.push(newProject)    
		    console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		    fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  				console.error(err)
  			})
	}

// 2. CREATE: json files with asset details
jsonWriter.addAsset = function(asset){
		var id = asset.projectId
		return function assetJson(){
			for(i=0; i< jsonFile.projects.length; i++){
				if(jsonFile.projects[i] == id){
					return jsonFile.projects.id.push(asset) 
				}
			}
		}
		console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  			console.error(err)
  		})
}

// 3. UPDATE: json files with asset details
jsonWriter.updateAsset = function(asset){
		var id = asset.projectId
		return	function assetUpdate(id, asset){
				for(i=0; i< jsonFile.projects.length; i++){
					if(jsonFile.projects[i] == id){
						for(k=0; k< jsonFile.projects[i].assets.length; k++)
							return jsonFile.projects.assets[k] = asset 
					}
				}
			}
		console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  			console.error(err)
  		})
}

// 4. DELETE: asset details from json files s
jsonWriter.deleteAsset = function(assetId){
		var id = asset.projectId
		return function assetDelete(id, asset){
				for(i=0; i< jsonFile.projects.length; i++){
					if(jsonFile.projects[i] == id){
						for(k=0; k< jsonFile.projects[i].assets.length; k++)
							return (jsonFile.projects.assets.assets.splice(k,1)) 
					}
				}
			}
		console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  			console.error(err)
  		})
}

// 5. ADD DEPENDENCY: to asset details
jsonWriter.createDependency = function(asset, dependentsArray){
			jsonFile.projects.push(newProject)    
		    console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		    fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  				console.error(err)
  			})
}

// 6. ADD SCENARIO: to Project instance
jsonWriter.createScenario = function(assetId, scenario){
			jsonFile.projects.push(newProject)    
		    console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		    fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  				console.error(err)
  			})
}

// 7. ADD VISUALIZATION RESULT: to project instance
jsonWriter.createVisualResult = function(mapInstance){
			jsonFile.projects.push(newProject)    
		    console.log("this is jsonFile after unshift at jsonWriter "+ JSON.stringify(jsonFile))
		    fs.writeFileSync( 'app/data/data.json', JSON.stringify(jsonFile), 'utf8', function (err) {
  				console.error(err)
  			})
}



module.exports = jsonWriter;