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

// var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "2friedXs"));


//////////////////////////////////////////////////////////////////////////////////////////
// Normal rendering of the html page
//////////////////////////////////////////////////////////////////////////////////////////

// 1. CREATE ASSET
// the neo4j-routes to process a get request and commit to neo4j db
cypher.createAsset = function(asset){
    var session = driver.session();
    console.log("@Cypher-Create-asset : This is the assetId " + asset.id);
    session
    .run( `CREATE (n:ASSET{
            id:'${asset.id}',
            name:'${asset.name}',
            type:'${asset.type}',
            coordLat :'${asset.coordLat}',
            coordLng :'${asset.coordLng}',
            projectId :'${asset.projectId}',
            sector:'${asset.sector}',
            subSector:'${asset.subSector}'}) 
            RETURN n`
            )
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });return result;
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
}


// 2. CREATE DEPENDENCY: create dependency for a particular asset
cypher.createDependency = function(myObject){
    var assetId = myObject.assetId;
    var dependencyArray = myObject.dependency;
        dependencyArray = JSON.stringify(dependencyArray)
    var session = driver.session();
    // var  dependencyArray = JSON.stringify(dependencyArray)
    
    console.log("this is dependencyArray " + dependencyArray)
    session
    .run(`WITH ${dependencyArray} AS myList
                         UNWIND myList AS item
                         MATCH (a:ASSET{id:'${assetId}'}) 
                         MATCH (b:ASSET{id:item}) 
                         CREATE (a)-[:DEPENDS_ON{serviceRequired:b.subSector}]->(b)
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


// 3. CREATE ASSET DETAIL: create dependency for a particular asset
cypher.getAssetDetails = function(assetId, res){
 var session = driver.session();
 var matchResult = {};
    session
    .run(`MATCH (n:ASSET{ 
            id:${assetId}})
                 RETURN n`)
    .then(function(result) {
            var returned =  result.records[0]._fields[0].properties
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
    console.log("this is asset Id in cypher :" + assetId)
    session
    .run(`MATCH (n:ASSET{id:'${assetId}'}) DETACH DELETE n`)
    .then(function(result) {
        console.log("This was the Result "+ result)
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
}


// update the properties of a particular asset selected
cypher.updateAsset = function(asset){
    var session = driver.session();
    session
    .run(`MATCH (n:ASSET{id:'${asset.id}'})
          SET 
            n.name ='${asset.name}',
            n.type ='${asset.type}',
            n.sector ='${asset.sector}',
            n.subSector ='${asset.subSector}',
            n.workingState ='${asset.workingState}'
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
cypher.createScenario = function(scenObject, res){
    var assetId = scenObject.assetId
    var session = driver.session();
    console.log("@cypher: assetId is "+ assetId)
    session
   .run(`MATCH (a:ASSET)<-[:DEPENDS_ON*]-(dependents)
         WHERE a.id = '${assetId}'
         RETURN collect(distinct dependents) as n`)
    .then(function(result) {
        var assetsAffected = [];
         result.records.forEach(function(record) {
                    console.log("this are the records in scenario"+ JSON.stringify(record))
                    assetsAffected.push(record) // affected assets to the list
        });
        res.json(assetsAffected);
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
}


// 7. CREATE GRAPH MODEL FROM JASON: 
cypher.createJson = function(jsonObject){
    var json = jsonObject
    console.log("we got this for cypher" + JSON.stringify(json));
    var session = driver.session();
    session
   .run(`WITH ${json} as data
        UNWIND data.items as q
        MERGE (n:ASSET {id:q.id}) ON CREATE
        SET n.name = q.name,
            n.type = q.type,
            n.coordLat = q.coordLat,
            n.coordLng = q.coordLng,
            n.projectId = q.projectId,
            n.sector = q.sector,
            n.subSector = q.subSector

            FOREACH (dep IN q.dependents | 
                MATCH (x) WHERE x.id = dep MERGE((dep)<-[:DEPENDS_ON]-(n))
                )
     
         `)
    .then(function(result) {
        var assetsAffected = [];
         result.records.forEach(function(record) {
                    console.log("this are the records in scenario"+ JSON.stringify(record))
                    assetsAffected.push(record) // affected assets to the list
        });
        res.json(assetsAffected);
        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });
}


module.exports = cypher;