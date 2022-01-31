/* eslint-disable no-bitwise */
let interrupt = false

const setInterrupt = (bool) => {
	interrupt = typeof bool != 'undefined' ? bool : true
}

const checkInterrupt = () => interrupt

// eslint-disable-next-line no-promise-executor-return
const sleep = (time) =>
	// eslint-disable-next-line implicit-arrow-linebreak
	new Promise((res) => {
		const timeout = setTimeout(() => res(), time)

		const interval = setInterval(() => {
			if (interrupt) {
				clearTimeout(timeout)
				clearInterval(interval)
				res()
			}
		}, 5)
	})

function byte2Hex(number) {
	const nybHexString = '0123456789ABCDEF'
	return (
		String(nybHexString.substr((number >> 4) & 0x0f, 1)) +
		nybHexString.substr(number & 0x0f, 1)
	)
}

function RGB2Color(r, g, b) {
	return `0x${byte2Hex(r)}${byte2Hex(g)}${byte2Hex(b)}`
}

const generateRainbowWave = (length) => {
	const frequency = 0.2 // CHANGE THIS TO MAKE IT LONGER
	let wave = []
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < length; ++i) {
		const r = Math.sin(frequency * i + 0) * 127 + 128
		const g = Math.sin(frequency * i + 2) * 127 + 128
		const b = Math.sin(frequency * i + 4) * 127 + 128
		wave.push(RGB2Color(r, g, b))
	}

	return wave
}

module.exports = {
	setInterrupt,
	checkInterrupt,
	sleep,
	RGB2Color,
	generateRainbowWave,
}
