const { getStripe, updateStripe } = require('../rpiclient')
const { sleep, generateRainbowWave } = require('./utility')

let i = 0
let timeout = 10
let reverse = false
let wave = []

const setup = (args) => {
	console.log('🚀 ~ file: rainbow.js ~ line 10 ~ setup ~ args', args)

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

	let toMove = reverse ? wave.pop() : wave.shift()

	if (reverse) {
		wave = [toMove, ...wave]
	} else {
		wave = [...wave, toMove]
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
