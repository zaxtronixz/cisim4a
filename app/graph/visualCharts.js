

// var assets = newProject.assets
function createStats() {
var ctx = document.getElementById("firstChart").getContext('2d');
var charts = [];


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
  		responsive:true,
    		animation: {
					animateScale: true,
					animateRotate: true
				},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    type: 'linear',
                     position: 'bottom'
                }
            }]
        }
    }
});



    var ctx2 = document.getElementById("secondChart").getContext("2d");
    var secondChart = new Chart(ctx2, {
     type: 'scatter',
    data: {
        labels: ["Red", "Yellow", "Green", "Purple", "Orange"],
		datasets: [{
			label: 'My First dataset',
			xAxisID: 'x-axis-1',
			yAxisID: 'y-axis-1',
			borderColor: 'red',
			backgroundColor: 'red',
			data: [{
				x: 1,
				y: 9
			}, {
				x: 2,
				y: 3
			}, {
				x: 3,
				y: 2
			}, {
				x: 4,
				y: 7
			}, {
				x: 5,
				y: 6
			}, {
				x: 6,
				y: 4
			}, {
				x: 7,
				y:0
			}]
		}
		, {
			label: 'My Second dataset',
			xAxisID: 'x-axis-1',
			yAxisID: 'y-axis-2',
			borderColor: "blue",
			backgroundColor:"blue" ,
			data: [{
				x: 1,
				y: 4
			}, {
				x: 2,
				y: 2
			}, {
				x: 3,
				y: 6
			}, {
				x: 4,
				y: 0
			}, {
				x: 5,
				y: 3
			}, {
				x: 6,
				y: 1
			}, {
				x: 7,
				y:1
			}]
		}

    ]},
    options: {
  		responsive:true,
    		animation: {
					animateScale: true,
					animateRotate: true
				},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    type: 'linear',
                     position: 'bottom'
                }
            }]
        }
    }
});
    Chart.Legend.prototype.afterFit = function() {
    var opts = this.options;
    if (typeof this.options.width === 'number') {
        this.minSize.width = opts.width;
        this.width = opts.width;
    }
    if (typeof this.options.height === 'number') {
        this.minSize.height = opts.height;
        this.height = opts.height;
    }
}

}//-----------------------------end of create graph function