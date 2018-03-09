////////////////////////////////////////////////////////////////////////////////////
// Importing various modules
/////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cypher = require('./cyphermod.js');



/////////////////////////////////////////////////////////////////////////////////////
// setting up body parser to receive text format
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

///////////////////////////////////////////////////////////////////////////////////
// normal rendering of the html page
router.get('/postpage', function(req, res) {
	res.render('postpage',{pageID: "postpage"});
});

///////////////////////////////////////////////////////////////////////////////////
// post data from asset creation form
router.post('/postpage', function (req, res, next) {
	console.log('Our data at postpage : ' + JSON.stringify(req.body))
	var asset = req.body;
	cypher.createAsset(asset)
	// res.send(console.log('it works we got this: ' + JSON.stringify(req.body)));
	// res.send(req.body)
});



module.exports = router;
