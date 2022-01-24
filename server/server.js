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
		console.log(
			'🚀 ~ file: server.js ~ line 14 ~ client.on ~ data',
			typeof data
		)

		console.log(`Recived Static: ${data}, Sending it to RPI now!`)
		const leds = new Uint32Array(stripe.ledcount).fill(data)

		rpi.emit('frame', leds.buffer)
	})

	client.on('setMode', (raw) => {
		const color = parseInt(raw.color.replace('#', '0x')).toString(16)
		console.log(`Recived Animation: ${raw}, Sending it to Animation now!`)

		setInterrupt()
		setTimeout(() => colorWipe(color, raw.timeout), 12)
	})
})

server.once('listening', () => {
	console.log(
		`Server is up and Running on Port: ${3000}, setting default mode now.`
	)
	rpi.emit('frame', new Uint32Array(stripe.ledcount).fill('0xffffff').buffer)
})

server.listen(3000)
