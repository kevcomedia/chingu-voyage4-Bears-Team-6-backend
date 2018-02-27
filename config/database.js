const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/WeAreYourTeam')

mongoose.Promise = Promise

const db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
