// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');

// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/scorecenter';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;
});


app.post('/submit.json', function(request,response){

response.header('Access-Control-Allow-Origin', '*');
request.header('Access-Control-Allow-Headers', 'X-Requested-With');

var player_name = request.body.username;
var score = request.body.score;
var game_title = request.body.game_title;
var time_played = Date();

db.collection("highscores", function(err,collection ){

db.collection.insert( { "username": player_name, "score": score, "created_at": time_played, "game_title":game_title });
});

response.set('Content-Type', 'text/html');
response.send();
});

app.get('/submit.json', function (request, response) {

/*response.header('Access-Control-Allow-Origin', '*');
request.header('Access-Control-Allow-Headers', 'X-Requested-With');
var game_title = request.query["game_title"];
var score = request.query["score"];

db.collection("highscores", function(err,collection){
collection.find("game_title":game_title); //How do you list these
*/
});

app.get('/data.json', function(request, response) {
/*response.header('Access-Control-Allow-Origin', '*');
request.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.set('Content-Type', 'text/json');
	response.send('{"status":"good"}');
	
	*/
});

app.get('/fool', function(request, response) {
/*	response.set('Content-Type', 'text/html');
	response.send(500, 'Something broke!');
	*/
});

// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3000);