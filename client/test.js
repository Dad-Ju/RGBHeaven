var gpiop = require('rpi-gpio').promise

;(async () => {
	const lighton = await gpiop.setup(0, 'rising')

	lighton.on('value', (value) => {
		console.log('Yeet', value)
	})
})()
