// eslint-disable-next-line import/no-extraneous-dependencies
const { Gpio } = require('pigpio')

const button = new Gpio(0, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	edge: Gpio.EITHER_EDGE,
	timeout: null,
})

// Level must be stable for 10 ms before an alert event is emitted.
// button.glitchFilter(10000)

button.on('interrupt', (level) => {
	console.log(level)
})
