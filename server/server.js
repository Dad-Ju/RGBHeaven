const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const client = require('socket.io-client')

app.use(express.static('public'))

const rpi = client('http://localhost:3001')

io.on('connection', () => {
	io.on('frame', (data) => {
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		rpi.emit('frame', data)
	})
})

server.listen(3000)
