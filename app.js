const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('passport')

require('./config/passport')(passport)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.use('/static', express.static(path.resolve(__dirname, 'node_modules', 'wayt-frontend', 'build')))

app.use('/', routes)

module.exports = app
