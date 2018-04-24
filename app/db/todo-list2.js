
// 1. Load recent project//
// --> set asset total//
// --> set asset latLong as deci//
// --> create asset fx//

// 2. create more asset on recent asset//
// --> click map//
// --> select asset description on form//
// --> click create asset "additional"//

// 3. create dependents
// -->select the depdendents from list
// --> add dependents to selection
// ----> add to array
// ----> add to panel as selected list
// ----> post array to GDB
// ----> create cypher query to implement deps

// 4 create input and change of state
// // follow procedures 3 add these:
// --> implement input on GDB and JSON
// --> call change state of assets

// 5. Create Scenario
// ---> use the Impact query from ALCAME 
// ---> return affected nodes
// ---> change node state to failed state
// ---> remove the impactNode from affectedNode inputs

// 6. Generate Graph of Scenario

8 Save project instance
// --> check if input field is empty
// --> only activate button if not empty
--> check if file have been saved
--> if not saved add to project instance
--> update name in json file
--> delete button
--> alignment of table



9 WORKING STATE ON GRAPH
--> implement change of state
--> add optimal when created
--> add change to failed when dependency is added
--> change if inputs # equals depdendents #
--> propagate failed state to other dependents


// 10. CREATING TOOL TIP
// --> include tool type CDN
// --> make tool tip global
// --> list places to include
-------> saved project
-------> asset creation
-------> dependency creation
-------> input creation
-------> generating visualization


1. load second Chart
--> get chart model
--> create chart data
--> load and test chart


2. load Log file
---> create function
---> test load function
-->> insert function @  places listed


3. save a project
--> save file's by name
--> load only save files
--> align project loading table

4 fix Graph visualization
--> fix returned values
--> implement return values
--> insert lable in the assets
--> load assets to table


5 Hover effect // show info window on asset
--> add effect to graph event listener
--> add effect to listOption event listener
