const { colorWipeRaw } = require('./utility')

let interrupt = false

const setInterrupt = () => {
	interrupt = true
}

const checkInterrupt = () => interrupt

const colorWipe = (color, timeout) => {
	interrupt = false
	colorWipeRaw(color, timeout, checkInterrupt)
}

module.exports = { setInterrupt, checkInterrupt, colorWipe }
