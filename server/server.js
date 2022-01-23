const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { rpi } = require('./rpiclient')
const { colorWipe, setInterrupt } = require('./animations')

app.use(express.static('public'))

io.on('connection', (client) => {
	client.on('setStatic', (raw) => {
		setInterrupt()
		const data = raw.replace('#', '0x')
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		rpi.emit('frame', data)
	})

	client.on('setMode', (raw) => {
		const color = raw.color.replace('#', '0x')
		console.log(`Recived: ${raw}, Sending it Animation now!`)
		setInterrupt()
		colorWipe(color, raw.timeout)
	})
})

server.listen(3000)
