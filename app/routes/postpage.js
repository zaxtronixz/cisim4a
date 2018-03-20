////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cypher = require('./cyphermod.js');
var jsonWriter = require('./jsonWriter.js');
var fs = require('fs');


/////////////////////////////////////////////////////////////////////////////////////
// setting up body parser to receive text format
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


///////////////////////////////////////////////////////////////////////////////////
// create project in json file
router.post('/postpage/createNewProject', function (req, res, next) {
	console.log('Our data at postpage : ' + JSON.stringify(req.body))
	// var project = req.body;
	jsonWriter.createNewProject(req.body)
	console.log(" project name is well received here "+ req.body.project)
	
});

///////////////////////////////////////////////////////////////////////////////////
// normal rendering of the html page
router.get('/postpage', function(req, res) {
	res.render('postpage',{pageID: "postpage"});
});

///////////////////////////////////////////////////////////////////////////////////
// post data from asset creation form
router.post('/postpage', function (req, res, next) {
	console.log('Our data at postpage : ' + JSON.stringify(req.body))
	var asset = req.body;
	cypher.createAsset(asset)
});



module.exports = router;
