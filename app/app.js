var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 3050 );

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/postpage'));

app.use(function(req, res, next){
	console.log(`${req.method} request for '${req.url} - ${JSON.stringify(req.body)}'`);
	next();
})

// app.post('postpage', function(req, res, next){
// 	console.log(`${req.method} request for '${req.url} - ${JSON.stringify(req.body)}'`);
// 	next();
	
// })


var server = app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
