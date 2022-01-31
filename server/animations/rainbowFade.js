const { getStripe, updateStripe } = require('../rpiclient')
const { sleep, generateRainbowWave } = require('./utility')

let i = 0
let timeout = 10
let wave = []

const setup = (args) => {
	wave = generateRainbowWave(getStripe().ledcount)
	i = 0
	timeout = args.timeout || 10
}

const rainbowFade = async () => {
	const stripe = getStripe()

	if (i >= stripe.ledcount) {
		return true
	}

	const leds = new Uint32Array(stripe.ledcount).fill(wave[i])
	stripe.leds = leds

	updateStripe(leds)
	i += 1
	await sleep(timeout)

	return false
}

module.exports = {
	name: 'rainbowFade',
	desc: 'Start a Rainbow Animation in Fade Mode',
	args: {
		timeout: 10,
	},
	setup,
	run: rainbowFade,
}
