import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: 'src/main.js',
			name: 'ObsiCLI',
			formats: ['umd'],
			fileName: (format) => `obsi-cli.web.js`,
		},
		rollupOptions: {
			output: {
				assetFileNames: 'obsi-cli[extname]',
			},
		},
	},
});
