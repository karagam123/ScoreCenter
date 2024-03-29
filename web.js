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
var db = mongo.Db.connect(mongoUri, function (err, databaseConnection) {
	db = databaseConnection;
});



app.post('/submit.json', function(request, response){ //posts all scores
	response.header("Access-Control-Allow-Origin", "*");
	request.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	var username=request.body.username;
	var score=request.body.score;
	var game_title=request.body.game_title;
	var created_at=Date();
 	
	db.collection('highscores', function(error, collection){
		collection.insert({'game_title':game_title, 'username': username, 'score':score, 'created_at': created_at});
	});
	response.send();
});

/*

app.get('/highscores.json', function(request, response) { //top ten in game
	response.header('Access-Control-Allow-Origin','*');
	request.header('Access-Control-Allow-Headers', 'X-Requested-With');
	
	var game_title=request.query['game_title'];
	var score=Number(request.body.score);
	
	db.collection('highscores', function(err, collection){
		collection.find({'game_title':game_title}).sort(score:-1).limit(10).toArray(function(err, documents){	
			response.set('Content-Type', 'text/json');
			response.send(documents);
		});
	});
});
*/
app.get('/', function (request, response) { //lists all scores
	response.header('Access-Control-Allow-Origin','*');
	request.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.set('Content-Type', text/html);
	response.send('<p>hi</p>');
	/*db.collection('highscores', function(err, collection){
		collection.find().toArray(function(err, documents){
			response.set('Content-Type', 'text/json');
			response.send(documents);
		});
	});
	*/
});

/*
app.get('/usersearch',function(request,response){ //need this to take input and redirect to page which shows scores of person searched
response.header('Access-Control-Allow-Origin','*');
	request.header('Access-Control-Allow-Headers', 'X-Requested-With');
	
var str = '<form action= "http://arcane-sea-8850.herokuapp.com/playerscore" method="post"> Username: <input type="text" name="username"><input type="submit" value="Submit" onclick = "<script> window.location.assign("http://arcane-sea-8850.herokuapp.com/playerscore")</script>" </form>'
	
			response.set('Content-Type', 'text/json');
			response.send(documents);
		});
	});
});



app.post('/playerscore',function(request,response){
 //posts the scores of the person searched
 response.header('Access-Control-Allow-Origin','*');
	request.header('Access-Control-Allow-Headers', 'X-Requested-With');
	
	var username = request.body.username;
	db.collection('highscores', function(err, collection){
		collection.find({'username':username}).toArray(function(err, documents){
			response.set('Content-Type', 'text/json');
			response.send(documents);
		});
	});
	



app.get('/fool', function(request, response) { 
	response.set('Content-Type', 'text/html');
	response.send(500, 'Something broke!');
	
});


// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3000);
*/