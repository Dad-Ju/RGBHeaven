const rpi = require('socket.io-client')('http://localhost:3001')

let stripe = {
	ledcount: 150,
	leds: Array(0).fill(0xffffff),
	brightness: 50,
}

rpi.on('state', (newStripe) => {
	console.log(
		'🚀 ~ file: rpiclient.js ~ line 6 ~ rpi.on ~ newStripe',
		newStripe
	)
	stripe = newStripe
})

module.exports = { stripe, rpi }
