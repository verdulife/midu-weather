<script lang="ts">
	import type { Forecast } from '$lib/types';
	import { navVisible } from '$lib/stores';

	$navVisible = true;

	export let forecast: Forecast;
</script>

<div class="scroll">
	{#if !forecast}
		<h1>Error loading data. Try again</h1>
	{:else}
		<pre>{JSON.stringify(forecast, null, 2)}</pre>
	{/if}
</div>
