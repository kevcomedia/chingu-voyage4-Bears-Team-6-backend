const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
let io = require('./websocket')(server);
server.listen(port);
