<script lang="ts">
	import type { DayWeather } from '$lib/types';

	export let forecast: DayWeather[];

	const comingDays = forecast.slice(1, 3);
	const getHour = new Date().getHours();
</script>

<div class="wrapper col xfill">
	<ul class="col xfill">
		{#each comingDays as { date, hour }, i}
			<li class="row xfill">
				<article class="row jbetween acenter xfill">
					<header class="row acenter">
						<img src={hour[getHour].icon} alt={hour[getHour].condition} />

						<div class="col">
							<h3>{i === 0 ? 'Tomorrow' : 'In 2 days'}</h3>
							<p>{hour[getHour].condition}</p>
						</div>
					</header>

					<h2>{hour[getHour].temp.celsius}º</h2>
				</article>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.wrapper {
		padding: 20px;
		padding-bottom: 100px;
	}

	article {
		color: #fff;
		padding: 20px;
		padding-left: 0;
	}

	header {
		gap: 20px;

		p {
			font-size: 12px;
		}
	}
</style>
