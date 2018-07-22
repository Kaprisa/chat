const socketIO = require('socket.io')

export default server => {
    const io = socketIO(server)

    io.on('connection', socket => {
        socket.on('message', async msg => {
            console.log(socket.handshake)

            socket.broadcast.emit('message', msg)
        })
    })
}

