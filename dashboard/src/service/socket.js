import socketio from 'socket.io-client'

const socket = socketio.connect('http://licalhost:3001')
const SocketContext = React.createContext()
