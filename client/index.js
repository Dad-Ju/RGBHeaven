const io = require('socket.io')()

io.on('connection', (client) => {
	console.log(client)
	client.on('frame', (data) => {
		console.log(data)
	})
	client.on('mode', () => {})
	client.on('disconnect', () => {})
})

io.listen(3000)
