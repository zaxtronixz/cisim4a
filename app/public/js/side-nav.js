

  // document.addEventListener("DOMContentLoaded", 
  // 	function(event) {
  
// Function to open the control-panel on the workspace
	function openMenuBtn() {
				mapClick.infowindow.close();
				$('#accordion').show();
				$( "#getAssetPanel" ).hide()
		    	document.getElementById("mySidenav")
		    	.style.width = "300px";
				}


// function that closes the control panel by clicking 'closeNav' icon
	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	};



  // });
