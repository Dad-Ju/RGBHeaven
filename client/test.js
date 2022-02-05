// eslint-disable-next-line import/no-extraneous-dependencies
const gpiop = require('rpi-gpio').promise

// eslint-disable-next-line import/newline-after-import
await gpiop.setup(0, gpiop.DIR_IN)

gpiop.on('export', (value) => {
	console.log('Yeet', value)
})
