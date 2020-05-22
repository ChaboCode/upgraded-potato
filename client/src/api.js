import socketIOClient from 'socket.io-client'
import server from './server'

const socket = socketIOClient(server)

const sayXD = () => {
  socket.emit('xd', {})
  socket.on('recivedXD', message => console.log(message))
}


export default {
  sayXD
}