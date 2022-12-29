import { sveltekit } from '@sveltejs/kit/vite';

const isPipeline = !!process.env.CI;

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.test.ts'],
		reporters: ['verbose'],
		allowOnly: !isPipeline,
		globals: true,
		cache: {
			dir: '/tmp/.vitest-cache'
		},
		typecheck: {
			checker: 'tsc'
		},
		sequence: {
			shuffle: true
		}
	},
	fs: {
		allow: ['..']
	}
};

export default config;
