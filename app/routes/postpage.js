
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// setting up body parser to receive text format
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// normal rendering of the html page
router.get('/postpage', function(req, res) {
	res.render('postpage',{pageID: "postpage"});
});

// when data from form is posted, display on terminal
// router.post('/postpage', function(req, res, next){
// 	console.log(`${req.method} request for '${req.url} - ${JSON.stringify(req.body)}'`);
// 	next();
// })

router.post('/postpage', function (req, res) {
	// res.set('Content-Type', 'application/json');
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body)
})

module.exports = router;
