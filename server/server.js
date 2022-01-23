const express = require('express')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { rpi, stripe } = require('./rpiclient')
const { colorWipe, setInterrupt } = require('./animations')

app.use(express.static('public'))

io.on('connection', (client) => {
	client.on('setStatic', (raw) => {
		setInterrupt()
		const data = raw.replace('#', '0x')
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		rpi.emit('frame', new Uint32Array(stripe.ledcount).fill(data))
	})

	client.on('setMode', (raw) => {
		const color = raw.color.replace('#', '0x')
		console.log(`Recived: ${raw}, Sending it Animation now!`)
		setInterrupt()
		colorWipe(color, raw.timeout)
	})
})

server.once('listening', () => {
	console.log(
		`Server is up and Running on Port: ${3000}, setting default mode now.`
	)
	rpi.emit('frame', new Uint32Array(stripe.ledcount).fill(0xffffff))
})

server.listen(3000)
