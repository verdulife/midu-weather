<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { dayState } from '$lib/stores';
	import { navVisible } from '$lib/stores';
	import Nav from '$lib/components/Nav.svelte';
	import Background from '$lib/components/Background.svelte';
	import { browser } from '$app/env';

	function setTheme() {
		const root = document.documentElement;

		if ($dayState === 'night') {
			root.style.setProperty('--bg', 'linear-gradient(30deg, var(--ter) 0%, var(--ter-dark) 75%)');
			root.style.setProperty(
				'--bg-card',
				'linear-gradient(30deg, rgba(42, 46, 76, 0.7) 0%, rgba(52, 152, 254, 0.5) 75%)'
			);
			root.style.setProperty('--bg-card-active', 'linear-gradient(30deg, #51b4fe 0%, #3498fe 75%)');
			root.style.setProperty(
				'--bg-sunny',
				'radial-gradient(circle at top right, rgba(255, 255, 255, 0.4) 1%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0) 40%)'
			);
			root.style.setProperty(
				'--bg-cloud',
				'radial-gradient(circle at top, var(--grey-dark) 5%, var(--grey-dark) 15%, rgba(255, 255, 255, 0) 40%), radial-gradient(circle at top right, var(--grey-dark) 5%, var(--grey-dark) 15%, rgba(255, 255, 255, 0) 30%), radial-gradient(circle at top left, var(--grey-dark) 5%, var(--grey-dark) 15%, rgba(255, 255, 255, 0) 30%)'
			);
			root.style.setProperty('--shadow', '0 60px 60px -20px rgba(0,0,0,0.5)');
			root.style.setProperty(
				'--glass-shadow',
				'inset 2px 2px 2px -1px rgba(255, 255, 255, 0.5), inset -2px -2px 2px -1px rgba(0,0,0,0.5)'
			);
		} else {
			root.style.setProperty(
				'--bg',
				'linear-gradient(30deg, var(--pri-dark) 0%, var(--pri-light) 75%)'
			);
			root.style.setProperty(
				'--bg-card',
				'linear-gradient(30deg, rgba(42, 46, 76, 0.7) 0%, rgba(52, 152, 254, 0.5) 75%)'
			);
			root.style.setProperty('--bg-card-active', 'linear-gradient(30deg, #2a2e4c 0%, #0d0f18 75%)');
			root.style.setProperty(
				'--bg-sunny',
				'radial-gradient(circle at top right,var(--sec) 10%,var(--sec-light) 20%,rgba(255, 255, 255, 0) 50%)'
			);
			root.style.setProperty(
				'--bg-cloud',
				'radial-gradient( circle at top, var(--grey-light) 5%, var(--grey) 15%, rgba(255, 255, 255, 0) 40% )'
			);
			root.style.setProperty('--shadow', '0 60px 60px -20px #545c98');
			root.style.setProperty(
				'--glass-shadow',
				'inset 2px 2px 2px -1px rgba(255, 255, 255, 0.5), inset -2px -2px 2px -1px #545c98'
			);
		}
	}

	$: if (browser && $dayState) {
		setTheme();
	}
</script>

<div id="app" class="{$dayState} row fcenter fill">
	<div class="wrapper row fill">
		<Background />
		<slot />

		{#if $navVisible}
			<Nav />
		{/if}
	</div>
</div>

<style lang="scss">
	:global {
		@import '../_reset.scss';
		@import 'verdu/verdu.scss';
	}

	.wrapper {
		position: relative;

		@media (hover: hover) {
			max-width: 400px;
			max-height: 800px;
			border-radius: 3rem;
			box-shadow: var(--shadow), var(--glass-shadow);
			overflow: hidden;
		}
	}

	.day {
		background: var(--bg);
	}

	.night {
		background: var(--bg);
	}
</style>
