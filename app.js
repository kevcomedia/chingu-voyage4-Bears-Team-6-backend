const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/passport')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.use('/', routes)

module.exports = app
