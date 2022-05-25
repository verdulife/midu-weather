<script lang="ts">
	import type { Location, HourWeather } from '$lib/types';
	import Temp from '$lib/components/Temp.svelte';

	export let location: Location;
	export let currentWeather: HourWeather;
</script>

<article class="card col xfill">
	<h1>{location.city}</h1>
	<p>{location.region}, {location.country}</p>

	<Temp temp={currentWeather.temp.celsius} size="100px" />
</article>

<style lang="scss">
	article {
		background: var(--bg-card);
		color: #fff;
		border-radius: 1.5rem;
		padding: 20px;

		p {
			margin-bottom: 40px;
		}
	}
</style>
