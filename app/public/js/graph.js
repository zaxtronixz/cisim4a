 // Get all the assets in the Data
  

function createGraph(){

// get project data
  var assets = newProject.assets

  if(assets.length != 0){
    // create nodes array of assets
    var nodesAndEdges = createNodesAndEdges(assets)
    var myNodes = nodesAndEdges.nodes // get the all nodes
    var myEdges = nodesAndEdges.edges // get all edges
      // create an array with nodes
    var nodes = new vis.DataSet(myNodes);

    // create an array with edges
    var edges = new vis.DataSet(myEdges);

    var container = document.getElementById('mynetwork');
 
    var data = {
        nodes: nodes,
        edges: edges
    };
    var fontStyle = { size: 14,
                    color:'red',
                    face:'courier',
                    strokeWidth:1,
                    strokeColor:'#ffffff'
                  } 

    var options = {
      nodes: {
          shape: 'dot',
          font: fontStyle,
          borderWidth: 2,
          shadow:true,
          scaling:{
            label: {
              min:6,
              max:8
            }
          }
        },
        autoResize: true,
        height: '480px',
        width: '530px',
        // clickToUse: false
        ////////////////////////
        edges:{
          width:5,
          shadow:true
        }
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);
} else{
        console.log("asset have not been created for rendering")
  }

}// --------------------------- create graph ends here 

// FUNCTION : Nodes maker
function createNodesAndEdges(assetsArr){
  var DIR = 'app/public/images/graph/';
  myEdges = []; // an empty array to collate edges
  myNodes = []; // an empty array to collate nodes 
  assetsArr.forEach(function(item){
        nodeObj = {} // create node object
        nodeObj  = { // assign assets values to node
          id: item.id,
          lable: item.name,
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
      edge = {  from: asset.id, to: item, 
                arrows: "from", // create edge with arrow
                label: 'dependents', // lable on the edge
                font: {align: 'horizontal', color: "#00f"} // label fonts properties
              },
        myEdges.push(edge) //push created edge into an array
        })
      }
  }else{
  	console.log("no inouts for asset "+asset.name)
  } 
  }// -------------------- end of edgeMaker

 // FUNCTION: To display the right asset image
 function  switchNames(assetName){
    switch(assetName) {
      case "Cable landing Station":
          return "antenna"
          break;
      case  "EHV lines & Tower":
          return "ehv"
          break;
      case "Wired Copper Cable":
          return "fossil"
          break;
      case "Antennae":
          return "satellite"
          break;
      case "Electric grid Operation":
          return "station"
          break;
      case "Transformer":
          return "transformer"
          break;
      case "Distribution underground lines":
          return "wire"
          break;
      default: 
         return "flame";
  }
}
