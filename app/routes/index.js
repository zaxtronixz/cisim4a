
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	res.render('index',{pageID: "main"});

});

module.exports = router;
