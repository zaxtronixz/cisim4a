

// create an array with nodes
     var nodes = new vis.DataSet([
        {id: "123", label: 'asset one',
            font: {align: 'horizontal', color: "#fff"},
            title: "name: T1, type: transformer" // add hover title
        },
        {id: "345", shape: 'circularImage', image: DIR + 'satellite.png'},
        {id: 2, label: 'asset two'},
        {id: 3, label: 'asset three'},
        {id: 4, label: 'asset four'},
        {id: 5, label: 'asset five'}
    ]);


    // create an array with edges
    var edges = new vis.DataSet([
        { from: "123", to: 3, 
                arrows: "from", // create edge with arrow
                label: 'dependents', // lable on the edge
                title: 'provides power',  // info window when hover
                font: {align: 'horizontal', color: "#00f"} // label fonts properties
        }, 
        {from: "123", to: 2},
        {from: 2, to: 4, arrows: "to"},
        {from: "345", to :2 , arrows: 'to'}
       
    ]);

  // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
      nodes: {
          shape: 'dot',
          font: { size: 14,
                  color:'red',
                  face:'courier',
                  strokeWidth:1,
                  strokeColor:'#ffffff'
                },
          borderWidth: 2,
          shadow:true,
          scaling:{
            label: {
              min:3,
              max:5
            }
          }
        },
        autoResize: true,
        height: '360px',
        width: '480px',
        // clickToUse: false
        ////////////////////////
        edges:{
          width:2,
          height:100,
          shadow:true
        }
    };
