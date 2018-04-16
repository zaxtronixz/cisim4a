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
		showContent(name)
	}else if(name == 'graph'){
		createGraph()
		hideContent('stats')
		showContent(name)
	}
}



/// //////////////////////////////////////////////////////////////////////////////
////////////// Charts test scrip to the page


var ctx = document.getElementById('myChart').getContext('2d');


var dataLabel = ["Optimal", "Failed"]
var label1 = ["Assets at Optimal State"]
var label2 = ["Assets at Failed State"]
var bgd = ['#36a2eb','#ff6384']
// var borderColor = 'rgb(255, 99, 132)'

function createStats(){
// var assets = newProject.assets

var optimal = newProject.assetsWorkingState.optimal.length;
var failed  = newProject.assetsWorkingState.failed.length;
var bgd = ['#36a2eb','#ff6384']
var label = ["Asset at Optimal state", "Assets at failed state"]
var data = [optimal, failed]
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
}//-----------------------------end of create graph function

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
///////////////////////////////////////////////////////////////////////////////////