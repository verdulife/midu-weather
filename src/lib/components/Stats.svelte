<script lang="ts">
	import type { Location, HourWeather } from '$lib/types';

	export let location: Location;
	export let currentWeather: HourWeather;
</script>

<div class="wrapper">
	<article class="card col xfill">
		<h1>{location.city}</h1>
		<p class="sub">{location.region}, {location.country}</p>

		<output class="row xfill">
			{currentWeather.temp.celsius}º
		</output>
		<p class="sub">{currentWeather.condition}</p>

		<ul class="row jcenter xfill">
			<li class="col acenter">
				<p>{currentWeather.feelslike.celsius}º</p>
				<small class="sub">F. like</small>
			</li>

			<li class="col acenter">
				<p>{currentWeather.humidity}%</p>
				<small class="sub">Humidity</small>
			</li>

			<li class="col acenter">
				<p>{currentWeather.wind.speed.kph}kph</p>
				<small class="sub">Wind</small>
			</li>
		</ul>
	</article>
</div>

<style lang="scss">
	.wrapper {
		padding: 20px;
	}

	article {
		background: var(--bg-card);
		color: #fff;
		border-radius: 1.5rem;
		padding: 20px 0;

		*:not(ul) {
			padding: 0 20px;
		}

		.sub {
			color: var(--grey-light);
		}

		output {
			font-size: 6rem;
			color: #fff;
			line-height: 1;
			margin-top: 40px;
		}

		ul {
			margin-top: 40px;

			li {
				max-width: calc(100% / 3);
				border-right: 1px solid var(--ter);
				padding: 10px 20px;
				margin-bottom: 10px;

				&:last-of-type {
					border-right: none;
				}
			}
		}
	}
</style>
