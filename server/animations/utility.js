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
		}, 5)
	})

const colorWipeRaw = async (color, timeout, checkInterrupt) => {
	for (let i = 0; i < stripe.ledcount; i += 1) {
		if (checkInterrupt()) {
			i = stripe.ledcount
			return
		}
		stripe.leds[i] = color
		rpi.emit('frame', stripe.leds)

		sleep(timeout)
	}
}

module.exports = { colorWipeRaw, sleep }
