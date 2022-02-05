// eslint-disable-next-line import/no-extraneous-dependencies
const { Gpio } = require('pigpio')

new Gpio(2, { mode: Gpio.OUTPUT }).digitalWrite(1)

const button = new Gpio(0, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_DOWN,
	alert: true,
})

// Level must be stable for 10 ms before an alert event is emitted.
button.glitchFilter(10000)

button.on('alert', (level) => {
	console.log(level)
})
