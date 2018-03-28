////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var maptool = express.Router();
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;
var mapt = require('map-tools');

maptool.get('/getmap', function(req, res){
	res.render('mapTools', {data: "Somthing Nice"})
})


module.exports = maptool;