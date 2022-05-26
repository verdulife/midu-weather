<script lang="ts">
	import { condition } from '$lib/stores';
	import Rain from '$lib/components/Rain.svelte';
	import Thunder from '$lib/components/Thunder.svelte';

	$: rain = $condition === 'rain' || 'snow' ? true : false;
	$: thunder = $condition === 'thunder' ? true : false;
</script>

{#if rain}
	<Rain />

	{#if thunder}
		<Thunder />
	{/if}
{/if}

<div class="{$condition} state-bg row fill" />

<style lang="scss">
	.state-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		animation: fadeIn 500ms ease-out;
		animation-delay: 500ms;
		animation-fill-mode: forwards;
	}

	.sunny {
		background: var(--bg-sunny);
	}
	.cloud {
		background: var(--bg-cloud);
	}
	.rain {
		background: var(--bg-rain);
	}
	.snow {
		background: var(--bg-snow);
	}
	.thunder {
		background: var(--bg-thunder);
	}
</style>
