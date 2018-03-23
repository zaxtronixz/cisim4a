// Importing our Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dataFile = require('./data/data.json');
var axios = require('axios')
var cors = require('cors')
var mongoose = require('mongoose');
var neo4j = require('neo4j-driver').v1;

// configuring mongodb
mongoose.connect('mongodb://localhost/cisim_app')

// configuring our application 
app.set('port', process.env.PORT || 3050 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.set('appData', dataFile)

// configuring body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('app/public'));


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/postpage'));
app.use(require('./routes/api'));
app.use(require('./routes/getasset'));
app.use(require('./routes/jsonWriter'));
app.use('/restful', require('./routes/restful'));

// run server at configured port
var server = app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
});

module.exports = app;

