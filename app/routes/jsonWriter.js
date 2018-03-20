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
	fs.readFile(projectData, 'utf8', function readFileCallback(err, asset){
	    if (err){
	        console.log(err);
	    } else {

		    var data = JSON.parse(projectData)
		      	data.projects[asset.projectId].push(asset); //add some data
		    	json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});
}

// 2. UPDATE: json files with asset details
jsonWriter.updateAsset = function(asset){
		fs.readFile(projectData, 'utf8', function readFileCallback(err, asset){
	    if (err){
	        console.log(err);
	    } else {

		    var data = JSON.parse(projectData)
		      	data.projects[asset.projectId].assets = asset; //add some data
		    	json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});

}

// 3. DELETE: asset details from json files s
jsonWriter.deleteAsset = function(assetId){
	fs.readFile(projectData, 'utf8', function readFileCallback(err, assetId){
	    if (err){
	        console.log(err);
	    } else {


		    var data = JSON.parse(projectData)

		    for (var i = 0; i < data.assets.length; i++) {
			    if (data.assets[i].id == assetId) {
			        data.assets.splice(i, 1);
			        break;
			    }
			}
		    json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});
}

// 4. ADD DEPENDENCY: to asset details
jsonWriter.createDependency = function(asset, dependentsArray){
		fs.readFile(projectData, 'utf8', function readFileCallback(err, assetId, dependentsArray){
	    if (err){
	        console.log(err);
	    } else {

		    var data = JSON.parse(projectData)
		      	data.projects[asset.projectId].assets.dependents = dependentsArray //add some data
		    	json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});
}

// 5. ADD SCENARIO: to Project instance
jsonWriter.createScenario = function(assetId, scenario){
		fs.readFile(projectData, 'utf8', function readFileCallback(err, asset){
	    if (err){
	        console.log(err);
	    } else {

		    var data = JSON.parse(projectData)
		      	data.projects[asset.projectId].assets = asset; //add some data
		    	json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});
}

// 6. ADD VISUALIZATION RESULT: to project instance
jsonWriter.createVisualResult = function(mapInstance){
			fs.readFile(projectData, 'utf8', function readFileCallback(err, asset){
	    if (err){
	        console.log(err);
	    } else {

		    var data = JSON.parse(projectData)
		      	data.projects[asset.projectId].assets = asset; //add some data
		    	json = JSON.stringify(data); //convert it back to json
		    fs.writeFile(projectData, json, 'utf8', callback); // write it back 
		}
	});
}






module.exports = jsonWriter;