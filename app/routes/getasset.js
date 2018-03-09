////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1; 
var cypher = require('./cyphermod.js');

/////////////////////////////////////////////////////////////////////////////////////
// Setting up body parser to receive text and url-encoded format
//////////////////////////////////////////////////////////////////////////////////////
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


//////////////////////////////////////////////////////////////////////////////////////
//  Configurating neo4j graphenedb
//////////////////////////////////////////////////////////////////////////////////////
var graphenedbURL = "bolt://hobby-kflccfbhieglgbkeildpppal.dbs.graphenedb.com:24786";
var graphenedbUser = "app89692672-Tf8UcL";
var graphenedbPass = "b.5IOnVenDmfcG.eDpXEKI1gxxRj1iV";

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));


router.post('/getasset', function (req, res, next){
    var matchResult = {};
    var assetId = JSON.stringify(req.body.assetId);
    console.log("this is assetId "+ assetId)

    var session = driver.session();
    session
    .run(`MATCH (n:ASSET{ 
            id:${assetId}})
                 RETURN n`)
    .then(function(result) {
    		var returned =  result.records[0]._fields[0].properties
    		// result.records.forEach(function(record) {
      //       console.log("this is the record._fields[0]" + record._fields[0]);
      //       })
      		matchResult.id = returned.id
      		matchResult.name = returned.name
      		matchResult.type = returned.type
      		matchResult.sector = returned.sector
      		matchResult.subSector = returned.subSector
      		matchResult.workingState = returned.workingState
      		matchResult.coordLat = returned.coordLat
      		matchResult.coordLng = returned.coordLng

      		res.send(matchResult);
      		console.log("was sent")
      session.close()
        })
    .catch(function(error) {
        console.log(error);
    });
});

module.exports = router;