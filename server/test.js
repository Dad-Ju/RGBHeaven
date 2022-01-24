const io = require('socket.io')()
const sioClient = require('socket.io-client')

io.listen(3000)

io.on('connection', (client) => {
	console.log('Login :)')
	client.on('data', (buff) => {
		const resolved = new Uint32Array(buff)

		console.log(
			'🚀 ~ file: test.js ~ line 11 ~ client.on ~ resolved',
			resolved
		)
	})
})

const ar = new Uint32Array(150).fill('0xffffff')

console.log('🚀 ~ file: test.js ~ line 16 ~ ar', ar)

const buffer = Array.from(ar)

console.log('🚀 ~ file: test.js ~ line 20 ~ buff', buffer)
const client = sioClient('http://localhost:3000')

client.emit('data', buffer)
