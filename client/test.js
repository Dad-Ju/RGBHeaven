// eslint-disable-next-line import/no-extraneous-dependencies
const { Gpio } = require('pigpio')

let vccState = false
let lightSwitchState = false
let relayState = false

const lightSwitch = new Gpio(17, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	alert: true,
})

const vcc = new Gpio(22, {
	mode: Gpio.INPUT,
	pullUpDown: Gpio.PUD_UP,
	alert: true,
})

const relay = new Gpio(27, {
	mode: Gpio.OUTPUT,
	alert: true,
})

relay.digitalWrite(0)

const checkForStatus = () => {
	if (lightSwitchState && !relayState) {
		relay.digitalWrite(1)
		return
	}
	if (!vccState && !lightSwitchState) {
		relay.digitalWrite(0)
	}
}
// Level must be stable for 10 ms before an alert event is emitted.
lightSwitch.glitchFilter(1000)
vcc.glitchFilter(1000)
vcc.glitchFilter(1000)

lightSwitch.on('alert', (level) => {
	lightSwitchState = !level
	checkForStatus()
})

vcc.on('alert', (level) => {
	vccState = !level
	checkForStatus()
})

relay.on('alert', (level) => {
	relayState = Boolean(level)
})
