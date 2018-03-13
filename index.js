const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000
app.set('port', port)

require('./config/database')

const server = http.createServer(app)

require('./websocket')(server)

server.listen(port)
