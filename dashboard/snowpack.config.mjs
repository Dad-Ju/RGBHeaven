/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
	mount: {
		public: '/public',
		src: '/',
	},
	plugins: ['@snowpack/plugin-react-refresh'],
	routes: [
		/* Enable an SPA Fallback in development: */
		// {"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		/* Example: Bundle your final build: */
		// "bundle": true,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		out: '../server/public',
		clean: false,
	},
}

export default config
