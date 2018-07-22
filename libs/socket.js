import socketIO from 'socket.io'
import Message from '../db/models/Message'

export default server => {
    const io = socketIO(server)
    io.on('connection', socket => {
        socket.on('message', async ({msg, from_id, to_id}) => {
            socket.broadcast.emit('message', {msg, from_id, to_id, created_at: Date.now()})
            await Message.create({from_id, to_id, text: msg})
        })
        socket.on('getMessages', async ({from_id, to_id}) => {
            const messages = await Message.get({ from_id, to_id })
            socket.emit('messages', {from_id, to_id, messages})
        })
    })
}

