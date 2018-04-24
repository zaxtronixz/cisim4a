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


var ctx = document.getElementById('Chart1').getContext('2d');
var ctx2 = document.getElementById('Chart2').getContext('2d');

var dataLabel = ["Optimal", "Failed"]
var label1 = ["Assets at Optimal State"]
var label2 = ["Assets at Failed State"]
var bgd = ['#36a2eb','#ff6384']
// var borderColor = 'rgb(255, 99, 132)'

function createStats(){
// var assets = newProject.assets
var state = {}

 if(!scenario.assetAffected){ // check if scenario is not created
 	state.optimal = newProject.assetsWorkingState.optimal.length;
	state.failed  = newProject.assetsWorkingState.failed.length;
 }else{ 
 	state.optimal = scenario.currentOptimalAssets.length;
	state.failed  = scenario.currentFailedAssets.length;
 }



var bgd = ['#36a2eb','#ff6384']
var label = ["Asset at Optimal state", "Assets at failed state"]
var data = [state.optimal, state.failed]
var labels = ['Optimal', 'Failed']
		var chart = new Chart(ctx, {
		    // The type of chart we want to create
		    type: 'doughnut',

////////////////////////////////// The data for our dataset
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
		    		animation: {
							animateScale: true,
							animateRotate: true
						}
					}
		});//--------------- end of chart object function

// buble chart begins here


var secData  = []

if(newProject.assets){ 
var assetList = newProject.assets
var i = 0
var addLabel = [];
var assetData = [];
var bgColor = [];
var labelling = [];
	assetList.forEach(function(asset){

		if(asset.dependents){ // check if dependents exist
			addLabel.push(asset.name)
			secData.push(asset.dependents.length)
			bgColor.push("red")
			labelling.push(asset.type)

		}else{
			addLabel.push(asset.name)
			secData.push(0)
			bgColor.push("blue")
			labelling.push(asset.type)
		}
	})
var	myData = {labels: addLabel,
					datasets: [{
						label: labelling,
						backgroundColor: 'red',
						borderColor:bgColor,
						data: secData,
						fill: false,
						pointRadius: 10,
						pointHoverRadius: 15,
						showLine: false // no line shown
					}]
				}

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


	


var myChart = new Chart(ctx2,{
	type: 'line',
    data: myData,
    options: secOptions
});
		
}//-----------------------------end of create graph function

// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
///////////////////////////////////////////////////////////////////////////////////