const { getStripe, updateStripe } = require('../rpiclient')
const { sleep, generateRainbowWave } = require('./utility')

let i = 0
let timeout = 10
let reverse = false
let wave = []

const setup = (args) => {
	wave = generateRainbowWave(getStripe().ledcount)
	i = 0
	timeout = args.timeout || 10
	reverse = args.reverse || false
}

const rainbow = async () => {
	const stripe = getStripe()

	if (i >= stripe.ledcount) {
		return true
	}

	let toMove = reverse ? wave.shift() : wave.pop()

	if (reverse) {
		wave = [...wave, toMove]
	} else {
		wave = [toMove, ...wave]
	}

	const leds = new Uint32Array(wave.map((colors) => parseInt(colors)))
	stripe.leds = leds

	updateStripe(leds)
	i += 1
	await sleep(timeout)

	return false
}

module.exports = {
	name: 'rainbow',
	desc: 'Start a Rainbow Animation',
	args: {
		reverse: false,
		timeout: 50,
	},
	setup,
	run: rainbow,
}
