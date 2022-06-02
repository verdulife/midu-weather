<script lang="ts">
	import type { Forecast } from '$lib/types';
	import { condition, navVisible, selectedHour } from '$lib/stores';
	import { normalizedCondition } from '$lib/utils';
	import Stats from '$lib/components/Stats.svelte';
	import Hours from '$lib/components/Hours.svelte';
	import Days from '$lib/components/Days.svelte';

	$navVisible = true;

	export let data: Forecast;

	const { location, forecast } = data;
	$: currentWeather = forecast[0].hour[$selectedHour];

	$: if (currentWeather) $condition = normalizedCondition(currentWeather.condition);
</script>

<div class="scroll">
	<div class="wrapper col xfill">
		{#if !forecast}
			<h1>Error loading data. Try again</h1>
		{:else}
			<Stats {location} {currentWeather} />
			<Hours hours={forecast[0].hour} />
			<Days {forecast} />
		{/if}
	</div>
</div>

<style lang="scss">
	.scroll {
		transform: translateY(calc(100% - 100px));
		z-index: 1;
		animation: fromBottom 500ms ease-out;
		animation-fill-mode: forwards;
	}

	@keyframes fromBottom {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
