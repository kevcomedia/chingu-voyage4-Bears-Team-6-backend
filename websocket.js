module.exports = (server) => {
    let io = require('socket.io')(server);
    let nsp = io.of('/websockets');
    
    //emit timestamp every 10 sec
    nsp.on('connection', function (socket) { 
        nsp.emit('timestamp', Date.now());
        setInterval(function () {
            nsp.emit('timestamp', Date.now());
        }, 10000);
    });
    return io;
}