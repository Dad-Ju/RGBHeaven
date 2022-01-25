const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { rpi, getStripe } = require('./rpiclient')
const { setMode, setInterrupt } = require('./animations')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))

io.on('connection', (client) => {
	client.on('setStatic', (raw) => {
		// setInterrupt()
		const data = raw.replace('#', '0x')
		console.log(`Recived Static: ${data}, Sending it to RPI now!`)
		const leds = new Uint32Array(getStripe().ledcount).fill(data)

		rpi.emit('frame', Array.from(leds))
	})

	client.on('setMode', (raw) => {
		const color = raw.color.replace('#', '0x')
		const args = { ...raw, color }
		console.log('Recived Animation, Sending it to Animation now!', raw)

		setInterrupt()
		setTimeout(() => setMode(args), 12)
	})
})

server.once('listening', () => {
	console.log(
		`Server is up and Running on Port: ${3000}, setting default mode now.`
	)
})

server.listen(3000)
