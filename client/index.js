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
		const leds = Array.from(stripe.leds).map(
			(val) => `0x${val.toString(16)}`
		)

		console.log(
			'🚀 ~ file: index.js ~ line 24 ~ updateState ~ leds',
			leds.length
		)

		client.emit('state', {
			ledcount: config.stripe.LEDS,
			leds,
			brightness: stripe.brightness,
		})
	}
	updateState()

	client.on('frame', (data) => {
		const formated = data.map((val) => parseInt(val))

		stripe.leds = Uint32Array.from(formated)

		console.log(
			'🚀 ~ file: index.js ~ line 44 ~ client.on ~ stripe.leds',
			stripe.leds
		)

		stripe.render()

		console.log('Showing Stripe!')
		updateState()
	})

	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(config.port)
