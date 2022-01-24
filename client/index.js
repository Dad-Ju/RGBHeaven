/* eslint-disable import/no-unresolved */
const io = require('socket.io')()
const { default: LedDriver, StripType } = require('rpi-ws281x-led')
const config = require('./config.json')

const ledDriver = new LedDriver({
	dma: 10,
	frequency: 800000,
	channels: [
		{
			gpio: config.stripe.Pin,
			count: config.stripe.LEDS,
			type: StripType.WS2812_STRIP,
			brightness: 50,
		},
	],
})

const stripe = ledDriver.channels[0]
stripe.leds = new Uint32Array(config.stripe.LEDS).fill(0xffffff)

io.on('connection', (client) => {
	const updateState = () => {
		client.emit('state', {
			ledcount: config.stripe.LEDS,
			leds: Array.from(stripe.leds),
			brightness: stripe.brightness,
		})
	}
	updateState()

	client.on('frame', (data) => {
		stripe.leds = new Uint32Array(data)
		stripe.render()

		console.log('Showing Stripe!')
		updateState()
	})

	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(config.port)
