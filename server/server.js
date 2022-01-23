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
		const data = parseInt(raw.replace('#', '0x'))
		console.log(`Recived: ${data}, Sending it to RPI now!`)
		const leds = Array(stripe.ledcount).fill(data)

		console.log('🚀 ~ file: server.js ~ line 16 ~ client.on ~ leds', leds)

		rpi.emit('frame', leds)
	})

	client.on('setMode', (raw) => {
		const color = parseInt(raw.color.replace('#', '0x'))
		console.log(`Recived: ${raw}, Sending it to Animation now!`)
		setInterrupt()
		setTimeout(colorWipe(color, raw.timeout), 12)
	})
})

server.once('listening', () => {
	console.log(
		`Server is up and Running on Port: ${3000}, setting default mode now.`
	)
	rpi.emit('frame', Array(150).fill('0xffffff'))
})

server.listen(3000)
