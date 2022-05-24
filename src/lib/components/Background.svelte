<script lang="ts">
	import { daySection } from '$lib/utils';
	import { condition } from '$lib/stores';
	import Rain from '$lib/components/Rain.svelte';
	import Thunder from '$lib/components/Thunder.svelte';

	$: rain = $condition === 'rain' ? true : false;
	$: thunder = $condition === 'thunder' ? true : false;

	console.log($condition);

	let parsedCondition: string;

	$: if (daySection() === 'night' && $condition === 'sunny') {
		parsedCondition = 'clear';
	} else {
		parsedCondition = $condition;
	}
</script>

{#if rain}
	<Rain />

	{#if thunder}
		<Thunder />
	{/if}
{/if}

<div class="{parsedCondition} state-bg row fill" />

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
	.clear {
		background: var(--bg-clear);
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
