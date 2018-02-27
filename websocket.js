const io = require('socket.io')

module.exports = (server) => {
  const nsp = io(server).of('/websockets')

  // emit timestamp every 10 sec
  nsp.on('connection', () => {
    nsp.emit('timestamp', Date.now())
    setInterval(() => {
      nsp.emit('timestamp', Date.now())
    }, 10000)
  })
  return io
}
