const io = require('socket.io')()
// eslint-disable-next-line import/no-unresolved
const { default: LedDriver, StripType } = require('rpi-ws281x-led')
const config = require('./config.json')

const ledDriver = new LedDriver({
	channels: [
		{
			gpio: config.stripes[0].Pin,
			count: config.stripes[0].LEDS,
			type: StripType[`${config.stripes[0].type}_STRIP`],
			brightness: 30,
		},
	],
})

const stripe = ledDriver.channels[0]

stripe.leds = new Uint32Array(100).fill(0x000000)
stripe.render()

io.on('connection', (client) => {
	console.log(client)
	client.on('frame', (data) => {
		console.log(data)
	})
	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(3000)
