// toggle the menu close button

// FUNCTION : To animate navbar close button to open and close
function myFunction(x) {
    x.classList.toggle("change");
}

// FUNCTION: To open the result when grap-btn is clicked
$(document).on('click', "#graph-btn", function(){
	var clickedBtn = $(this)
    openResultPanel("graph" , clickedBtn) 

});

// FUNCTION: To open the result when stats-btn is clicked
$(document).on('click', "#stats-btn", function(){
	var clickedBtn = $(this)
    openResultPanel("stats" , clickedBtn) 

});

//FUNCTION: To open log panel
$(document).on('click', "#log-btn", function(){
	var clickedBtn = $(this)
    openResultPanel("log" , clickedBtn) 
});

function openResultPanel(name, clickedBtn) {
     if(document.getElementById('visDisplayPanel').style.width == "50%"){
        // open side nav
        document.getElementById('visDisplayPanel').style.width = "0";
        clickedBtn.css({'margin-right': '0'})
    }else{
    	alternateContent(name)// alternate between contents to display
        document.getElementById('visDisplayPanel').style.width = "50%"; // open the result panel
       	clickedBtn.css({'margin-right': '50%'}); // slide the button with the result panel
    }
}


// Function to hide the result content
function hideContent(name){
	$(document).ready(function(){
	        $('#'+name+'-panel').hide();
	});	
}

// FUNCTION To show result content
function showContent(name){
	$(document).ready(function(){
	        $('#'+name+'-panel').show(500);
	});	
}

// FUNCTION to alternate which content to hide or show
function alternateContent(name){
	if(name == 'stats'){
		createStats()
		hideContent('graph')
		hideContent('log')
		showContent(name)
	}else if(name == 'graph'){
		createGraph()
		hideContent('stats')
		hideContent('log')
		showContent(name)
	}else if(name == 'log'){
		createGraph()
		hideContent('stats')
		hideContent('graph')
		showContent(name)
	}
}



/// //////////////////////////////////////////////////////////////////////////////
////////////// Charts test scrip to the page

/////////////////////////////////////////////////////////////////
// divs to load chart data
/////////////////////////////////////////////////////////////////

var ctx2 = document.getElementById('Chart2').getContext('2d');
var ctx = document.getElementById('Chart1').getContext('2d');

var dataLabel = ["Optimal", "Failed"]
var label1 = ["Assets at Optimal State"]
var label2 = ["Assets at Failed State"]
var bgd = ['#36a2eb','#ff6384']
// var borderColor = 'rgb(255, 99, 132)'
/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// FUNCTION: CREATE ALL CHART FUNCTION

function createStats(){

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// creating the bubble chart nodes
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
	var assetList = newProject.assets// get asset list
	var labelList = [];// declare lable array
	var assetData = []; // declare asset data array
	var colorList = []; // declare bubble color array
	assetList.forEach(function(asset){ // loop through asset list
		// create colour list
		colorList.push(assignColor(asset))
		labelList.push(asset['name'])
		assetData.push(secData(asset))// put asset data in our array
	})

	// collate all bubble data
	var	myData = {
		pointHoverRadius: 7,
		labels: labelList,
			datasets: [{
            data: assetData,
            pointRadius: 5,
            pointBackgroundColor:colorList,
            fill: false,
            showLine: false // no line shown,
        }]
	}



var secOptions = {
			responsive: true,
			title: {
				display: true,
				text: 'Asset Dependency Level: '
			},
			legend: {
				display: false
			},
			elements: {
				point: {
					pointStyle: 'circle'
				}
			}
		}
//////////////////////////////		
// Create Bubble Chart Object
var myChart = new Chart(ctx2,{
	type: 'line',
    data: myData,
    options: secOptions
});
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///// Creating the doughnut chart
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// var assets = newProject.assets
	var state = {}

	 if(!scenario.assetAffected){ // check if scenario is not created
	 	state.optimal = newProject.assetsWorkingState.optimal.length;
		state.failed  = newProject.assetsWorkingState.failed.length;
	 }else{ 
	 	state.optimal = scenario.currentOptimalAssets.length - 1;
		state.failed  = scenario.currentFailedAssets.length + 1;
	 }

var bgd = ['#36a2eb','#ff6384']
var label = ["Asset at Optimal state", "Assets at failed state"]
var data = [state.optimal, state.failed]
var labels = ['Optimal', 'Failed']
		var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'doughnut',

////////////////////////////////// The modelling data for our dataset
			 data: {
			        labels: labels,
			        datasets: [{
			            label: label,
			            backgroundColor: bgd,
			            borderColor: '#111',
			            data:data
			        }]
			    },

/////////////////////// Configuration options go here
		    options: {
		    		responsive:true,
		    		maintainAspectRatio: true,
		    		animation: {
							animateScale: true,
							animateRotate: true
						},
					 scales: {
						 yAxes: [{
	         				ticks: {
	           			 	beginAtZero: true,
						}
					}]
				}
			}
		});//--------------- end of chart object function
		
}//-----------------------------end of create graph function

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// FUNCTION: To return true if asset workingstate is optimal
// function checkIfOptimal(asset){
//  	if(asset.workingState == 'optimal'){
//  		return true;
//  	}else{
//  		return false;
//  	}
// }

// // FUNCTION: To choose blue for optimal and red for failed
// function chooseColor(asset){
// 	if(checkIfOptimal(asset)){
// 		return 'blue'
// 	}else{
// 		return 'red';
// 	}
// }

// FUNCTION: To color nodes if scenario exist
function assignColor(asset){
	var color = '#ccc' // defualt color
	if(scenario.assetAffected){
		if(checkArray(scenario.assetAffected, "id", asset['id'])){
	 		color = getColor("affected")
		}else if(scenario.impactNode == asset['id']){
		 	color = getColor('impactNode')
		}else if(asset.workingState == 'failed'){
		 	color = getColor('failed')
		}else{
			color = getColor('optimal')
		}
	}else{
		if(asset.workingState == 'failed'){
		 	color = getColor('failed')
		}else{
			color = getColor('optimal')
		}
	}
	return color;
}

// FUNCTION: Get asset dependency level
function secData(asset){
	var lengthy = 0;
	if(asset['dependents']){// dependency exists
		lengthy  = asset['dependents'].length; // get the length of dependency
	}
	return lengthy;
}

// FUNCTION: choose bubble color to display
function getColor(assetType){
	switch (assetType) {
	    case "affected":
	        return "#cc0000";
	        break;
	    case "impactNode":
	        return "#330000";
	        break;
	    case "failed":
	        return  "#ff6666";
	        break;
	    default:
	        return "blue";
	        break;
	}
}

// FUNCTION: To color nodes if scenario is undefined
// function colorForDependents(asset){
// 			 if(asset.dependents){ // check if dependents exist
// 				addLabel.push(asset.name)
// 				labelling.push(asset.type)
// 				bgColor.push(chooseColor(asset)) //choose color optimal or failed
// 			}else{
// 				addLabel.push(asset.name)
// 				labelling.push(asset.type)
// 				bgColor.push(chooseColor(asset)) //choose color optimal or failed
// 			}
// }

// function loadStatData(){
// 	var data = "<ul class='stat-list'>"

// 	$("#stats-data").children().remove();
// 	if(scenario.assetAffected){
// 		data = "<li class='stat-item'>"
// 		var assetList = scenario.assetAffected
		
// 	}if(newProject.assets){

// 	}else{

// 	}

// 	$("#stats-data").append(data)
// }