////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var api = express.Router();
var bodyParser = require('body-parser');
var dataFile = require('../data/data.json')

/////////////////////////////////////////////////////////////////////////////////////
// setting up body parser to receive text format
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));


api.get('/api', function(req, res) {
	res.send(dataFile.assets[0].assetDependents);
});


module.exports = api;