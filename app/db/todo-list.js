
// TODOLIST

// 1. Insert "help" Button on nvabar

// 2. Add Dropdown to help button
// ---> About
// ---> Documentation

// 3. add dropdown to start project button

// 3. Put "asset detail panel" into SideNavbar


// 4.Separate Control Panel from "asset Creation panel"

// 5. stylize the Visualization button
// --> Working state
// --> inderdependencies
// 6. Fixed assets removal error
//-------------------------------------------------------

1. implement visualization function
show / hide ---> working State
// get event
// set condition
// implement fx
show / hide ---> interdependencies

// 2. Load Assets to  "scenario creation List"

// /3. Create "right panel" buttons

4. change working from failed --> optimal
--> add input to asset
--> check for each dependence if input exist
-----> input to dependence counter
-----> chnage working state in project and asset

/5. Create a table for statistics
--> make statistics layout
--> make statistic table
--> make statistic gathering function
--> test statisitcis function

// /6. create a panel for Scenario Display

7. Write a scenario "creation Process"
---> get id of asset
---> get id of project
---> for each asset in project
---> if any of the asset has input with this id
---> remove input
---> set its working state to failed
----> IMPLEMENT IN JS <-----------

8. Implement a scenario function
----> IMPLEMENT '7' IN CYPHER <-----------

9. Export scenario to results panel. 
--> result of scenaro into a variable
--> send variable to project instance

// 10. Implement Map visualization Library
// --> test visualization libary 
// --> write a model of map-data to libarary map-data
// --> write a function to implement data conversion

11. import existing project
--> project loading page
--> get project data
--> load project data as list
--> project loading function
-----> load map instance
-----> load markers on map instance
-----> load mapCollector with variables


12. add asset name to "select-option" list