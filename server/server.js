const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const rpi = require('socket.io-client')('http://localhost:3001')

app.use(express.static('public'))

io.on('connection', (client) => {
	client.on('frame', (data) => {
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		rpi.emit('frame', data)
	})
})

server.listen(3000)
