

  // document.addEventListener("DOMContentLoaded", 
  // 	function(event) {
  
// Function to open the control-panel on the workspace
	function openMenuBtn() {
				mapClick.infowindow.close();
				$('#first-accordion').show();
				$( "#getAssetPanel" ).hide()
		    	document.getElementById("mySidenav")
		    	.style.width = "300px";
				}


// function that closes the control panel by clicking 'closeNav' icon
	function closeNav() {
	    document.getElementById("mySidenav").style.width = "0";
	};



// function for selecting dependencies
	var listItem = ""

	var deleteBtn = '<div class="checkbox">'
		deleteBtn += '<label><input type="checkbox" value="">'
		deleteBtn +=  'Remove dependent</label></div>'

	$('#multiple-select option').on('click', function(){
		$(this).attr('disabled', true)
		Item = $(this).text()
		$('#selected-list')
		.append('<li>'+ Item + ' '+ deleteBtn +'</li>')
	})
  // });
