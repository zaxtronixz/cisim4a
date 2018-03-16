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

// 1. CREATE ASSET
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


// 2. CREATE DEPENDENCY
// create dependency for a particular asset
cypher.createDependency = function(assetId, dependentsArray){
    var session = driver.session();
    session
    .run(`WITH ${dependentsArray} AS myList
                         UNWIND myList AS item
                         MATCH (a:ASSET{id:${assetId}}) 
                         MATCH (b:ASSET{id:item}) 
                         CREATE (a)<-[:PROVIDES_{serviceProvided:b.subSector}]-(b)
                         RETURN a, b`)
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




cypher.getAssetDetails = function(assetId, res){
 var session = driver.session();
 var matchResult = {};
 console.log(" is this the assetId at getAssetDetails "+ assetId)
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
            
            res.json(matchResult);
      session.close()
        })
    .catch(function(error) {
        console.log(error);
    });
};


// delete the particular asset selected
cypher.deleteAsset = function(assetId){
    var session = driver.session();
    session
    .run(`MATCH (n:ASSET{id:'${assetId}'}) DELETE n`)
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


// update the properties of a particular asset selected
cypher.updateAsset = function(assetId){
    var session = driver.session();
    session
    .run(`MATCH (n:ASSET{id:'${assetId}')
          SET 
            n.name ='${asset.name}',
            n.type ='${asset.type}',
            n.sector ='${asset.sector}',
            n.coordLat ='${asset.coordLat}',
            n.coordLng ='${asset.coordLng}',
            n.subSector ='${asset.subSector}',
            n.workingState ='${asset.workingState}'}) 
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

// create scenario on an asset selected
// change it states and cut allrelationships
cypher.createScenario = function(asset){
    var session = driver.session();
    session
    .run(`CREATE (n:ASSET{
            id:'${asset.id}',
            name:'${asset.name}',
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