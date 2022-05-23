import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: '@import "./src/_vars.scss";'
		},
		postcss: {
			plugins: [autoprefixer()]
		}
	}),

	kit: {
		adapter: vercel()
	}
};

export default config;
