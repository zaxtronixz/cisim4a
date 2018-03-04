var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var app = express();


// neo4j configuration begins here
var neo4j = require('neo4j-driver').v1;



app.set('port', process.env.PORT || 3050 );

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/postpage'));
// app.use(require('./routes/neo4j'));


var server = app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
