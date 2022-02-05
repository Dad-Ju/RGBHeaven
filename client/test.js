// eslint-disable-next-line import/no-extraneous-dependencies
const { Gpio } = require('pigpio')

// Set pin to High
new Gpio(2, { mode: Gpio.OUTPUT }).digitalWrite(1)
console.log('VCC High!')

const button = new Gpio(0, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	alert: true,
})

// Level must be stable for 10 ms before an alert event is emitted.
button.glitchFilter(10000)

button.on('alert', (level) => {
	console.log(level)
})
