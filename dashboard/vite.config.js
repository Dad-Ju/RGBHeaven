import react from '@vitejs/plugin-react'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
	root: './src',
	plugins: [react()],
	build: {
		outDir: '../../server/public',
		emptyOutDir: false,
		minify: 'esbuild',
	},
	server: {
		host: '0.0.0.0',
		port: 3001,
	},
	preview: {
		port: 3001,
	},
}

export default config
