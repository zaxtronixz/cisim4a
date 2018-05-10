var express = require('express');
var api = express.Router();
var bodyParser = require('body-parser');
var dataFile = require('../data/data.json')

/////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// BETWEENNEES CENTRALITY
// betweenness for centrality measured
projectId: jgo3tutuevo31chg
MATCH p=allShortestPaths((a:ASSET)-[:DEPENDS_ON*]-(b:ASSET)) 
WHERE id(a) < id(b) and length(p) > 1 
UNWIND nodes(p)[1..-1] AS n 
RETURN n.id AS id, n.type AS ASSET, n.name AS ASSET_NAME, count(*) as betweenness 
ORDER BY betweenness DESC

// Betweenness centrality algorithm
// pay attention to the "both" which means both
// incoming and outgoing edges
MATCH (node:Node)
WHERE node.id %2 = 0 // set search restriction here
WITH collect(node) AS nodes
CALL apoc.algo.betweenness(['TYPE'],nodes,'BOTH') YIELD node, score
RETURN node, score
ORDER BY score DESC


/////////////////////////////////////////////////////
// CENTRALITY PAGE RANKING 
//////////////////////////////////////////////////////
// DEGREE CENTRALITY
//Degree centrality  
 match (n:ASSET)-[r:DEPENDS_ON]-(m:ASSET)  
 return n.name, n.type, count(r) as DegreeScore  
 order by DegreeScore desc  
 limit 10

////////////////////////////////////////////////////////////////////
// DEPENDENCY CHAIN SEARCH 
 // the Most dependent upon components
 MATCH (n)<-[:DEPENDS_ON*]-(dependent)
 WITH n.projectId = "" // insert project id value here
RETURN n.name AS ASSET,
count(DISTINCT dependent) AS Dependents
ORDER BY Dependents DESC
LIMIT 10


/////////////////////////////////////////////////////
// DELETING NODES THAT DONT HAVE A PROPERTY
match (n)
where NOT EXISTS(n.projectId)
DETACH DELETE n

///////////////////////////////////////////////////////
// DELETING NODES THAT DONT HAVE A RELATIONSHIP
// 1
MATCH a WHERE NOT (a)-[:LOVES]->()

// 2
MATCH source-[:someType]-target
WHERE r is null
RETURN source

//  3.
MATCH (p) 
 WHERE NOT (p)-[:DEPENDS_ON]->()
 DETACH DELETE p