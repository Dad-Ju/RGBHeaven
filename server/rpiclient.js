// eslint-disable-next-line import/no-unresolved
const rpi = require('socket.io-client')('http://localhost:3001')

let stripe = {}

rpi.on('state', (newStripe) => {
	console.log(
		'🚀 ~ file: rpiclient.js ~ line 6 ~ rpi.on ~ newStripe',
		newStripe
	)
	stripe = newStripe
})

module.exports = { stripe, rpi }
