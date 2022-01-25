let interrupt = false

const setInterrupt = () => {
	interrupt = true
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
		}, 10)
	})

module.exports = { setInterrupt, checkInterrupt, sleep }
