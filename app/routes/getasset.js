////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1; 
var cypher = require('./cyphermod.js');
var jsonWriter = require('./jsonWriter.js');

/////////////////////////////////////////////////////////////////////////////////////
// Setting up body parser to receive text and url-encoded format
//////////////////////////////////////////////////////////////////////////////////////
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


//////////////////////////////////////////////////////////////////////////////////////
// Posting data and feeding response into our form
///////////////////////////////////////////////////////////////////////////////////////
router.post('/getasset', function (req, res, next){
    var assetId = JSON.stringify(req.body.assetId);
    console.log("before matchedResult, this is assetId "+ assetId)

    // send the assetID and the response paramter as argument to cypher
    cypher.getAssetDetails(assetId, res);

});

//////////////////////////////////////////////////////////////////////////////
// Update asset details
/////////////////////////////////////////////////////////////////////////////
router.post('/getasset/update', function (req, res, next){
    var asset = req.body;
    console.log("before matchedResult, this is assetId "+ asset.id)

    // send the assetID and the response paramter as argument to cypher
    cypher.updateAsset(asset);
});



//////////////////////////////////////////////////////////////////////////////
// delete asset completely
/////////////////////////////////////////////////////////////////////////////
router.post('/getasset/delete', function (req, res, next){
      var assetId = JSON.stringify(req.body.assetId);
          console.log("before matchedResult, this is assetId "+ assetId)

    // send the assetID and the response paramter as argument to cypher
    cypher.deleteAsset(assetId);
});



//////////////////////////////////////////////////////////////////////////////
// Create asset dependency
/////////////////////////////////////////////////////////////////////////////
router.post('/getasset/createDependency', function (req, res, next){
    var request = req.body;
    console.log("We are about to update this request body "+ req.body)


    // send the assetID and the response paramter as argument to cypher
    cypher.createDependency(request);
});


//////////////////////////////////////////////////////////////////////////////
// Create asset visualization
/////////////////////////////////////////////////////////////////////////////
router.post('/getasset/createVisualization', function (req, res, next){
    var assetId = JSON.stringify(req.body.assetDeps);
    console.log("We are about to update this assetId "+ assetId)

    var assetId = assetDeps.asset.assetId
    var dependentsArray = assetDeps.dependents
    // send the assetID and the response paramter as argument to cypher
    cypher.createDependency(assetId, dependentsArra);
});


//////////////////////////////////////////////////////////////////////////////
// Create asset scenario
/////////////////////////////////////////////////////////////////////////////
router.post('/getasset/createScenario', function (req, res, next){
    var assetScenario = JSON.stringify(req.body.assetScenario);
    console.log("We are about to update this assetId "+ assetId)

    var assetId = assetDeps.asset.assetId
    var dependentsArray = assetDeps.dependents
    // send the assetID and the response paramter as argument to cypher
    cypher.createScenario(assetId, dependentsArra);
});


module.exports = router;