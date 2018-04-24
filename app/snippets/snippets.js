 #animator{
  	position: absolute;
    z-index:1000;
    top: -100px;
    display:none;
    border-radius:38px;
    padding:20px;
  	background-color:rgba(41,175,219,0.5);
    -webkit-box-shadow: 6px 28px 38px -11px rgba(0,0,0,0.57);
    -moz-box-shadow: 6px 28px 38px -11px rgba(0,0,0,0.57);
    box-shadow: 6px 28px 38px -11px rgba(0,0,0,0.57);
          }
          
       #animateMe{
			position:absolute;
            top:300px;
            left:20px;
        }
  
  </style>
  
  
</head>
<body>



<div class="container">

	<div id="animator">
      
	</div>
 
</div>
<hr>
<button id="animateMe">Animator</button>
<script>

function interact(message, type){
	var mssg = "<p>" + message + "</p>";
	$( "#animator" ).children().remove()
	if(message == "warning"){
		$( "#animator" ).css("background-color", "#f34d51")
		$( "#animator" ).append(mssg)
	}else{
		$( "#animator" ).css("background-color", "#5fbaff")
		$( "#animator" ).append(mssg)
	}
	
    $( "#animator" ).show()
  	$( "#animator" ).animate({ "top": "+=105px" }, 1300 ).delay(1200 );
  	$( "#animator" ).animate({ "top": "-=105px" }, 1300 , function() {
       $( "#animator" ).css("display","none")
    });
 })

</script>