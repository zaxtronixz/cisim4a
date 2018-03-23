var restful = require('node-restful');
var mongoose = restful.mongoose;


// schema
 var projectSchema = new mongoose.Schema({
 	id: String,
 	name: String,
 	assetTotal:Number,
 	location: String,
 	assets:[],
 	assetsWorkingState:[{
 		failed:[],
 		optimal:[]
 	}],
 	resultVisualization: [],
  	scenario:[]
 })

 // return our models

 module.exports = restful.model('projects', projectSchema)