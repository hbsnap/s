import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		paths: {
			base: process.env.BASE_PATH || '',
			relative: false
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			strict: true
		})
	}
};

export default config;
