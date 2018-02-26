var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/WeAreYourTeam');

mongoose.Promise = Promise;

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
