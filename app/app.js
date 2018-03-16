var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var app = express();
var dataFile = require('./data/data.json');

// neo4j configuration begins here
var neo4j = require('neo4j-driver').v1;



app.set('port', process.env.PORT || 3050 );

app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.set('appData', dataFile)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/postpage'));
app.use(require('./routes/api'));
app.use(require('./routes/getasset'));



var server = app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
});

module.exports = app;
reload(server, app);
