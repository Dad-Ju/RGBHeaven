const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const rpi = require('socket.io-client')('http://localhost:3001')

app.use(express.static('public'))

rpi.on('init', (stripe) => {
	console.log(stripe)
})

io.on('connection', (client) => {
	client.on('frame', (raw) => {
		const data = raw.replace('#', '0x')
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		rpi.emit('frame', data)
	})
})

server.listen(3000)
