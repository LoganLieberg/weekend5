var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Pets = require('./public/routes/favPets');
var mongoose = require('mongoose');

var databaseURI = 'mongodb://localhost:27017/mu';

mongoose.connect(databaseURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open', databaseURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose error connecting', err);
});
// Serve back static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.use('/favPets', Pets);

// Handle index file separately
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
})

app.get('/favlist', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/favorites.html'));
})

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
