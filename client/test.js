// eslint-disable-next-line import/no-extraneous-dependencies
const gpio = require('rpi-gpio')

function readInput(err) {
	if (err) throw err
	gpio.read(0, (error, value) => {
		if (error) throw error
		console.log(`The value is ${value}`)
	})
}

gpio.setup(0, gpio.EDGE_RISING, readInput)

// gpio.on('export', (value) => {
// 	console.log('Yeet', value)
// })
