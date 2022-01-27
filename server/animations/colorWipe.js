const { getStripe, updateStripe } = require('../rpiclient')
const { sleep } = require('./utility')

let color
let timeout
let i

const setup = (args) => {
	i = 0
	color = args.color || '0xffffff'
	timeout = args.timeout || 10
}

const colorWipe = async () => {
	const stripe = getStripe()

	if (i > stripe.ledcount) {
		return true
	}

	stripe.leds[i] = parseInt(color)

	updateStripe(stripe.leds)
	i += 1

	// eslint-disable-next-line no-await-in-loop
	await sleep(timeout)
	return false
}

module.exports = {
	name: 'wipe',
	desc: 'Replaces the current Stripe one by one with the Color',
	args: {
		color: '0xffffff',
		timeout: 10,
	},
	setup,
	run: colorWipe,
}
