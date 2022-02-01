const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { updateStripe, getStripe } = require('./rpiclient')
const {
	setInterrupt,
	callAnimation,
	runPlaylist,
	animations,
} = require('./animations')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
	cors: {
		origin: ['http://localhost:3001', 'http://localhost:3000'],
		methods: ['GET', 'POST'],
	},
})

app.use(express.static('public'))

io.on('connection', (client) => {
	const parsedAnimations = Object.values(animations).map(
		({ name, desc, args }) => ({
			name,
			desc,
			args,
		})
	)

	client.emit('animations', parsedAnimations)
	client.on('setStatic', (raw) => {
		setInterrupt()
		const color = raw.color.replace('#', '0x')
		const { brightness } = raw
		console.log(`Recived Static: ${color}, Sending it to RPI now!`)
		const leds = new Uint32Array(getStripe().ledcount).fill(color)

		setTimeout(() => updateStripe(leds, brightness), 6)
	})

	client.on('setMode', (raw) => {
		console.log('Recived Animation, Sending it to Animation now!', raw)

		setInterrupt()
		setTimeout(() => {
			setInterrupt(false)
			callAnimation(raw)
		}, 6)
	})

	client.on('setPlaylist', (raw) => {
		setInterrupt()
		setTimeout(() => runPlaylist(raw), 6)
		console.log('Recived Playlist, Sending to LOOP now.')
	})
})

server.once('listening', () => {
	console.log(
		`Server is up and Running on http://localhost:${3000}, setting default mode now.`
	)
})

server.listen(3000)
