const rpi = require('socket.io-client')('http://localhost:3001')

let stripe = {
	ledcount: 150,
	leds: new Uint32Array(150).fill(0xffffff),
	brightness: 50,
}

rpi.on('state', (newStripe) => {
	console.log(
		'🚀 ~ file: rpiclient.js ~ line 6 ~ rpi.on ~ newStripe',
		newStripe
	)
	const { ledcount, leds, brightness } = newStripe
	stripe = { ledcount, leds: new Uint32Array(leds), brightness }
})

module.exports = { stripe, rpi }
