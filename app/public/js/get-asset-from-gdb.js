

// FUNCTION: To asset from GDB to Application
 function getAssetFromGdb(makerid){
	// declaring variables
	var assetId = makerid;
	// post id and receive result into callback function
	$.post('/getasset',{assetId: assetId}, makeAsset);
	
	addAssetList("#multiple-select", assetId, 'dependents' ) // create a selection list for dependency
	addAssetList("#input-multiple-select", assetId, 'inputs') // create a selection list for inputs
	// function to load selected dependencies
	displaySelectedOption('#multiple-select', '#selected-list')
	// function to load selected inputs
	displaySelectedOption('#input-multiple-select', '#input-selected-list')
 }

// FUNCTION: To display seleced option on the panel
function displaySelectedOption(selector, htmlElement){
	$(htmlElement).children().remove() // empty selection element
	$(selector + " li").on('click', function(event){
	// delete button to remove options from selection
		$(this).css( 'display', 'none')
		var Item = $(event.target).text()
		var id = $(event.target).attr('id')
		$(htmlElement).append(`<li id="${id}" class="selection-list-item">`+ Item +'<span class="close-selection">&times;</span>' +'</li>')
	})
}

// FUNCTION: to load previous on click of a bottom
$('#loadRecentProject-btn').on('click', function(){
	loadProjectJson() // call on load project function
})



// FUNCTION to load project from json file
function loadProjectJson(){
	// get json file
	$.ajax({
	  url: "/api",
	  //force to handle it as text
	  method: 'get',
	  dataType: "json",
	  success: function(data) {

	  	var json  = data // get data as objects
	  		json = json.reverse() // reverse the array
	  		mapCollector.json = json; // pass the projects
	  		$("#recentProjectTable").children().remove()
	  	  	var k = 0; // counter
	  	 for(i=0; i < json.length; i++){

	  	 		if(json[i].saved){
	  	 			k++ // increase counter
		  	 		var fillrow = "" // new row for each iteration
			  	 	fillrow += `<tr class='' id='${json[i].id}' >` // attach project id
			  	 	fillrow += "<td>" + k +" . " + json[i].name + "</td>";
			  	 	fillrow += "<td>" + json[i].id + "</td>";
			  	 	fillrow += "<td>" + json[i].places + "</td>";
			  	 	fillrow += "</tr>"

			   	 // load data to project table
			   	 $("#recentProjectTable").append(fillrow)
	  	 		}

		  	 }
	    }
	})
	// load json file to selected element
}

// FUNCTION: To toggle selection between recent project list
$(document).on('click', '#recentProjectTable tr', function () {
    $('#recentProjectTable tr').not(this).removeClass('active');
    $(this).addClass('active');
});

// FUNCTION: TO Load recent Project
$('#recentProject-btn').on('click', function(){
	// Get the recent project selected 
	var id = $('.active').attr('id') // get id of project selected
	var projectList = mapCollector.json // get list of projects loaded from json file
	var proIndex  = returnItemIndex(projectList, id) // get index of the project
	var project = projectList[proIndex] // get the exact project
	// call the load recent project function
	console.log("the project we got "+ project)
	mapCollector.loadRecentProject(project)	// load the project into google maps
})

// FUNCTION to load json file from api 
function loadJsonToCypher(projectName){
	// fetch json data from api
	$.ajax({
	  url: "/api",
	  //force to handle it as text
	  method: 'get',
	  dataType: "application/json",
	  success: function(data) {

	  	var json  = data // get data as objects
	   	// for each project in the list
	  	 for(i=0; i < json.length; i++){

	  	 		if(json[i].name == projectName){
	  	 			var proObject = json[i];
	  	 			// the pass it to a function makeCypher
	  	 			makeCypher(proObject)
	  	 		}else{
	  	 			console.log("project with name "+projectName+" doesn't exist")
	  	 		}
	  	 	}
	  	 }
	  })//--------------- end of ajax post
}
    
// FUNCTION: To post an object for cypher creation
function makeCypher(object){
	var url = '/getasset/makeCypher'; // et url
	var object = JSON.stringify(object); // stringify object
	$.post('/getasset/makeCypher', object , broadCaster);
	// $.ajax({type: 'POST',
	// 		url: url,
	// 		contentType: 'application/json',
	// 		data: object,
	// 		success: broadCaster 
	// }
}

// FUNCTION: to recieve result of the created in cypher from json file
function broadCaster(result){
	// for now i do nothing
	alert("#$! we succeeded !!")
}