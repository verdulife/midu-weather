<script lang="ts">
	import type { Forecast } from '$lib/types';
	import { condition, navVisible } from '$lib/stores';
	import { normalizedCondition } from '$lib/utils';

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
			<h1>{location.city}</h1>
			<p>{currentWeather.condition}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding: 30px;
	}
</style>
