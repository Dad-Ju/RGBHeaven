const io = require('socket.io')()
// eslint-disable-next-line import/no-unresolved
const { default: LedDriver, StripType } = require('rpi-ws281x-led')
const config = require('./config.json')

const ledDriver = new LedDriver({
	dma: 10,
	frequency: 800000,
	channels: [
		{
			gpio: config.stripes[0].Pin,
			count: config.stripes[0].LEDS,
			type: StripType.WS2812_STRIP,
			brightness: 60,
		},
	],
})

const stripe = ledDriver.channels[0]

stripe.leds = new Uint32Array(config.stripes[0].LEDS).fill(0x00ff00)
stripe.render()

console.log('Showing Stripe!')

io.on('connection', (client) => {
	console.log(client)
	client.on('frame', (data) => {
		console.log(data)
	})
	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(3000)
