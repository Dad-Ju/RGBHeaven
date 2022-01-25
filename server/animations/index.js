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

const setMode = async (args) => {
	const animation = animations[args.mode]

	console.log(
		'🚀 ~ file: index.js ~ line 21 ~ setMode ~ animation',
		animation
	)

	let done = false
	while (!done) {
		if (checkInterrupt()) {
			animation.setup(args)
		}
		// eslint-disable-next-line no-await-in-loop
		done = await animation.run()
	}
}

module.exports = { setMode, setInterrupt }
