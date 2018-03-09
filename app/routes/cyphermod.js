////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var neo4j = require('neo4j-driver').v1; 
var cypher = express.Router();
var bodyParser = require('body-parser');


/////////////////////////////////////////////////////////////////////////////////////
// Setting up body parser to receive text and url-encoded format
//////////////////////////////////////////////////////////////////////////////////////
cypher.use(bodyParser.json());
cypher.use(bodyParser.urlencoded({extended: false}));


//////////////////////////////////////////////////////////////////////////////////////
//  Configurating neo4j graphenedb
//////////////////////////////////////////////////////////////////////////////////////
var graphenedbURL = "bolt://hobby-kflccfbhieglgbkeildpppal.dbs.graphenedb.com:24786";
var graphenedbUser = "app89692672-Tf8UcL";
var graphenedbPass = "b.5IOnVenDmfcG.eDpXEKI1gxxRj1iV";

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));


//////////////////////////////////////////////////////////////////////////////////////////
// Normal rendering of the html page
//////////////////////////////////////////////////////////////////////////////////////////
// router.get('/result', function(req, res) {
//     console.log("This is the request at neo4j.js " + JSON.stringify(req.query.valid));
//     console.log("This is the method "+ req.method);
//     res.send(console.log("we also got it baaah : " + (req.body)));
// .run(`CREATE (n:ASSET{name:'${asset.assetname}',
//                             sector:'${asset.sector}',
//                             subSector:'${asset.subSector}'}) 
//                             RETURN n`)

// the neo4j-routes to process a get request and commit to neo4j db
cypher.createAsset = function(asset){
    var session = driver.session();
    session
    .run(`CREATE (n:ASSET{
            id:'${asset.id}',
            name:'${asset.name}',
            type:'${asset.type}',
            sector:'${asset.sector}',
            coordLat:'${asset.coordLat}',
            coordLng:'${asset.coordLng}',
            subSector:'${asset.subSector}',
            workingState:'${asset.workingState}'}) 
            RETURN n`)
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
}


// get asset from neo4j database function
// cypher.getAsset = function(assetId){
//     var matchResult = {};
//     var session = driver.session();
//     session
//     .run(`MATCH (n:ASSET{
//             id:'${assetId}'})
//                  RETURN n`)
//     .then(function(result) {
//             result.records.forEach(function(record) {
//             console.log("this is the " + record)
//             })

//     })
//     .catch(function(error) {
//         console.log(error);
//     });

    
// }

module.exports = cypher;