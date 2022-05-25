<script lang="ts">
	import type { Forecast } from '$lib/types';
	import { condition, navVisible } from '$lib/stores';
	import { normalizedCondition } from '$lib/utils';
	import Stats from '$lib/components/Stats.svelte';

	$navVisible = true;
	export let data: Forecast;

	const { location, forecast } = data;
	const getHour = new Date().getHours();
	const currentWeather = forecast[0].hour[getHour];

	$condition = normalizedCondition(currentWeather.condition);

	console.log(data);
</script>

<div class="scroll">
	<div class="wrapper col xfill">
		{#if !forecast}
			<h1>Error loading data. Try again</h1>
		{:else}
			<Stats {location} {currentWeather} />
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding: 30px;
	}
</style>
