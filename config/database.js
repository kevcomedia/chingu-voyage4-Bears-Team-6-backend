const mongoose = require('mongoose')

const dbURI = 'mongodb://127.0.0.1/WeAreYourTeam' //should put it to .env

mongoose.connect(dbURI)

mongoose.Promise = Promise

const db = mongoose.connection

db.on('connected', () => {
  console.log('MongoDB connection connected to ' + dbURI)
})

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected')
})

db.on('error', (err) => {
  console.log('MongoDB connection error. Please try to start/restart your MongoDB')
  process.exit(1)
})
