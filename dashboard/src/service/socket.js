import React from 'react'
import socketio from 'socket.io-client'

export const socket = socketio.connect(
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
)
export const SocketContext = React.createContext()
