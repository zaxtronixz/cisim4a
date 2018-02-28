var express = require('express');
var app = express();
var reload = require('reload');

app.set('port', process.env.PORT || 3050 );

app.set('view engine', 'ejs');
app.set('views', 'app/views');


app.use(express.static('app/public'));
app.use(require('./routes/index'));

console.log("i am ok here");
var server = app.listen(app.get('port'), function() {
		console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
