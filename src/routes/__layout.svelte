<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { daySection } from '$lib/functions/time';
	import Nav from '$lib/components/Nav.svelte';

	const dayState = daySection() !== 'night' ? 'day' : 'night';
</script>

<div id="app" class="{dayState} row fcenter fill">
	<div class="wrapper row fill">
		<slot />

		{#if true}
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
			box-shadow: 0 60px 60px -20px var(--pri-dark), inset 2px 2px 2px -1px rgba(#fff, 0.5),
				inset -2px -2px 2px -1px var(--pri-dark);
			overflow: hidden;
		}
	}

	.day {
		background: var(--bg-day);
	}

	.night {
		background: var(--bg-night);
	}
</style>
