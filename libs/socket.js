import socketIO from 'socket.io'
import Message from '../db/models/Message'
import User from '../db/models/User'
import passport from 'koa-passport/lib/index'

const users = {}

export default server => {
    const io = socketIO(server)
    io.on('connection', socket => {
        socket.on('conn', async user_id => {
            users[socket.id] = user_id
            socket.broadcast.emit('connected', { user_id, socket_id: socket.id})
            const clients = Object.keys(io.sockets.connected)
            socket.emit('conn', {user_id, sockets: clients, socket_id: socket.id})
        })
        socket.on('message', async ({msg, from_id, to_id}) => {
            socket.broadcast.emit('message', {text: msg, from_id, to_id, created_at: Date.now()})
            await Message.create({from_id, to_id, text: msg})
        })
        socket.on('getMessages', async ({from_id, to_id}) => {
            const messages = await Message.get({ from_id, to_id })
            socket.emit('messages', {from_id, to_id, messages})
        })
        socket.on('disconnect', async _ => {
            socket.broadcast.emit('disconnected', users[socket.id])
            await User.setLastSeen(users[socket.id])
        })
    })
}

