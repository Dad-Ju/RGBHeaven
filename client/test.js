// eslint-disable-next-line import/no-extraneous-dependencies
const { Gpio } = require('pigpio')

const button = new Gpio(17, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	alert: true,
})

// Level must be stable for 10 ms before an alert event is emitted.
button.glitchFilter(1000)

button.on('alert', (level) => {
	console.log(level)
})
