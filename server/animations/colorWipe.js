const { rpi, getStripe } = require('../rpiclient')
const { sleep } = require('./utility')

let color
let timeout
let checkInterrupt
let i

const setup = (inColor, inTimeout, inCheckInterrupt) => {
	i = 0
	color = inColor || 0xffffff
	timeout = inTimeout || 10
	checkInterrupt = inCheckInterrupt
}

const colorWipe = async () => {
	const stripe = getStripe()

	if (i > stripe.ledcount) {
		return true
	}

	stripe.leds[i] = parseInt(color)

	rpi.emit('frame', Array.from(stripe.leds))
	i += 1

	// eslint-disable-next-line no-await-in-loop
	await sleep(timeout, checkInterrupt)
	return false
}

module.exports = {
	name: 'wipe',
	desc: 'Replaces the current Stripe one by one with the Color',
	args: {
		color: 0xffffff,
		timeout: 10,
	},
	setup,
	run: colorWipe,
}
