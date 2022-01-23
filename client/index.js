/* eslint-disable import/no-unresolved */
const io = require('socket.io')()
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
			brightness: 50,
		},
	],
})

const stripe = ledDriver.channels[0]

io.on('connection', (client) => {
	const updateState = () => {
		const leds = Array.from(stripe.leds)
		console.log(
			'🚀 ~ file: index.js ~ line 24 ~ updateState ~ leds',
			leds.length
		)

		client.emit('state', {
			ledcount: config.stripes[0].LEDS,
			leds,
			brightness: stripe.brightness,
		})
	}
	updateState()

	client.on('frame', (data) => {
		stripe.leds = data
		stripe.render()

		console.log('Showing Stripe!')
		updateState()
	})

	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(config.port)
