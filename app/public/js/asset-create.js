

// this script captures data from asset form and exports it to
// application/backend/createAsset.php script for processing

// $(document).ready(function(){

// 	$('#asset-button').click(function(){
// 		var assetName = $('#assetName').val();
// 		var sector = $('#sector').val();
// 		var subSector =$('#subSector').val();

// 		var dataString = 'assetName='+assetName+'&sector='+sector+'&subSector='+subSector;
//     	$.ajax({
//        	 	type: "p",
//         	url: 'application/backend/createAsset.php',
//         	data: dataString,
//         	cache:false,
//         	success: function(data){
//             	console.log(dataString);
//         	}

// 		});

// 		return false;
// 	});
// });

$('asset-create').on('submit', function(){

	var form = $(this),
		url  = "application/backend/createAsset.php",
		type = form.attr('method'),
		data = {};

form.find('[name]').each(function(index, value){
	var inputField = $(this),
	name = inputField.attr('assetName'),
	value = inputField.val();

	data[name] = value;
})

	$.ajax({
		url:url,
		type:type,
		data:data,
		success: function(response){
			console.log(response);
		}
	});
	return false;

})