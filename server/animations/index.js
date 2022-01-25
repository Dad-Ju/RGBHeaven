const fs = require('fs')
const { checkInterrupt, setInterrupt } = require('./utility')

const animations = fs
	.readdirSync('./animations')
	.filter(
		(file) =>
			// eslint-disable-next-line implicit-arrow-linebreak
			!['index.js', 'utility.js'].includes(file) && file.endsWith('.js')
	)
	.reduce((acc, file) => {
		// eslint-disable-next-line import/no-dynamic-require
		const ani = require(`./${file}`)

		return {
			...acc,
			[ani.name]: ani,
		}
	}, {})

const callAnimation = async (args) => {
	const animation = animations[args.mode]
	animation.setup(args)
	setInterrupt(false)

	let done = false
	while (!done && !checkInterrupt()) {
		// eslint-disable-next-line no-await-in-loop
		done = await animation.run()
	}
	console.log('End Animation')
}

module.exports = { callAnimation, setInterrupt }
