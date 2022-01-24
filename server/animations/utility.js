const { rpi, stripe } = require('../rpiclient')

// eslint-disable-next-line no-promise-executor-return
const sleep = (time, checkInterrupt) =>
	// eslint-disable-next-line implicit-arrow-linebreak
	new Promise((res) => {
		const timeout = setTimeout(res(), time)

		const interval = setInterval(() => {
			if (checkInterrupt()) {
				clearTimeout(timeout)
				clearInterval(interval)
				res()
			}
		}, 10)
	})

const colorWipeRaw = async (color, timeout, checkInterrupt) => {
	console.log('🚀 ~ file: utility.js ~ line 30 ~ colorWipeRaw ~ color', color)

	for (let i = 0; i < stripe.ledcount; i += 1) {
		if (checkInterrupt()) {
			i = stripe.ledcount
			return
		}
		stripe.leds[i] = parseInt(color)

		if (i < 3) {
			console.log(stripe.leds)
		}

		rpi.emit('frame', Array.from(stripe.leds))

		// eslint-disable-next-line no-await-in-loop
		await sleep(timeout)
	}
}

module.exports = { colorWipeRaw, sleep }
