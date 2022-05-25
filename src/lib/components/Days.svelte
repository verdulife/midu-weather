<script lang="ts">
	import type { DayWeather } from '$lib/types';

	export let forecast: DayWeather[];

	const getHour = new Date().getHours();
</script>

<div class="wrapper col xfill">
	<ul class="col xfill">
		{#each forecast.slice(1, 3) as { date, hour }}
			<li class="row xfill">
				<article class="row jbetween acenter xfill">
					<header class="row acenter">
						<img src={hour[getHour].icon} alt={hour[getHour].condition} />
						<h3>{date}</h3>
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
		padding: 20px 0;
	}
</style>
