 // Get all the assets in the Data
 // get project instance data 

var network ;
var container = document.getElementById('mynetwork'); 

function createGraph(a){
	var assets = newProject.assets

	if(scenario){
		//scanrio values then asset
		creatingGraph(assets)
	}else if(!network){
			creatingGraph(assets)	
	}

}// --------------------------- create graph ends here 

// graph font option
var fontStyle = { size: 14,
	            color:'white',
	            face:'courier',
	          } 

// Graph Creation Option
var options = {
   	nodes: {
  	  	shapeProperties: {
	    	interpolation: false    // 'true' for intensive zooming
	  },
      shape: 'dot',
      font: fontStyle,
      borderWidth: 2
      // shadow:true
    },
    physics:{
    	barnesHut:{
      		gravitationalConstant: -60000,
      		springConstant:0.02
    	},
		  	enabled: true,
   		 	stabilization:true
	   // Stops node movement during display
		},
	 	layout: {
        improvedLayout: false
    },
        // autoResize: true,
        height: '680px',
        width: '760px',
        // clickToUse: false
        ////////////////////////
        edges:{
          width:1
          // shadow:true
        }
    };

// FUNCTION TO Create new graph object
function creatingGraph(assets){
	 if(assets.length != 0){
	    // create nodes array of assets
	    var nodesAndEdges = createNodesAndEdges(assets)
	    var myNodes = nodesAndEdges.nodes // get the all nodes
	    var myEdges = nodesAndEdges.edges // get all edges
	      // create an array with nodes
	    var nodes = new vis.DataSet(myNodes);
	    // create an array with edges
	    var edges = new vis.DataSet(myEdges);
	 	// create node and edge object
	    var data = {
	        nodes: nodes,
	        edges: edges
	    };
	    // initialize your network!
	    network = new vis.Network(container, {}, options);
	    // add data to the graph 
	    network.setData(data);

	} else{
	        console.log("asset have not been created for rendering")
	  }
}
// FUNCTION : Nodes maker
function createNodesAndEdges(assetsArr){
  var DIR = '/images/graph/';
  myEdges = []; // an empty array to collate edges
  myNodes = []; // an empty array to collate nodes 
  assetsArr.forEach(function(item){
   		var color = {};
   		
   		if(scenario.assetAffected){ // check if scenario is created
   			// check if item is affected by scenario
   			if(checkArray(scenario.assetAffected, "id", item.id)){
		    	color.Sel = "#fff" // color red
 		  	// if item was already in failed state		
			}
		}else if(item.workingState == "failed"){
		   			color.Sel = "#b83b3f" // color red
		// item was the impact node
		}else if(item.id == scenario.impactNode){
   					color.Sel = "#b70006" // color red
		// item working state is optimal
   		}else if(item.workingState == "optimal"){
		    		color.Sel = "#00f"
		}else{
		    		color.Sel = "#f00"
	    }

        nodeObj = {} // create node object
        nodeObj  = { // assign assets values to node
          id: item.id,
          lable: item.name,
          color:color.Sel,
          shape: 'dot',
          shape :'circularImage',
          image: DIR + switchNames(item.type)+'.png',
          title : item.type + " " + item.sector + " " + item.subSector
       }
        edgeMaker(item, myEdges) //create edges for each asset
        myNodes.push(nodeObj) // push node into array
      })
        return ({nodes:myNodes, edges:myEdges}); // return an object of nodes and edges
}// ---------------------nodeMaker ends here

// FUNCTION : To create edges for each node
function edgeMaker(asset, myEdges){
  var edge = {};
  if(asset.inputs){
  if(asset['inputs'].length != 0){
    asset['inputs'].forEach(function(item){
    	var color = {};
    	if(item.workingState == "optimal"){
    		color.Sel = "#00f"
    	}else{
    		color.Sel = "#f00"
    	}

      edge = {  from: item, to: asset.id, 
                arrows: "from", // create edge with arrow
                label: 'depends_on', // lable on the edge
                length:200,
                font: {align: 'horizontal', color: color.Sel} // label fonts properties
              },
        myEdges.push(edge) //push created edge into an array
        })
      }
  }else{
  	console.log("no inputs for asset "+asset.name)
  } 
  }// -------------------- end of edgeMaker

 // FUNCTION: To display the right asset image
 function  switchNames(assetName){
    switch(assetName) {
      case "Cable landing Station":
          return "cable_landing_station"
          break;
      case  "EHV lines & Tower":
          return "ehv"
          break;
      case "Wired Copper Cable":
	       return "wired_copper_cable";
	       break;
      case "Antennae":
          return "satellite"
          break;
      case "Base Station Building":
	       return  "base_station_building";
	       break;     
      case "Electric grid Operation":
          return "electric_grid_operation"
          break;
      case "Transformer":
          return "transformer"
          break;
      case "Distribution underground lines":
          return "distribution"
          break;
      case "Step Up/down SubStation":
	       return "step_up_and_down_substation";
	       break;
	  case "Fossil Fuel Plant":
	       return  "fossil_fuel_plant";
	       break;
      default: 
         return "flame";
  }
}
