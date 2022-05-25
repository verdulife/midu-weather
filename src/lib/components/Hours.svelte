<script lang="ts">
	import type { HourWeather } from '$lib/types';
	import { onMount } from 'svelte';

	export let hours: HourWeather[];

	const getHour = new Date().getHours();

	onMount(() => {
		const slider = document.querySelector('.slider') as HTMLElement;
		const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;

		slides.forEach((slide, index) => {
			if (index === getHour) {
				slider.scrollLeft = slide.offsetLeft;
			}
		});
	});
</script>

<ul class="slider">
	{#each hours as hour, i}
		<li class="slide">
			<article class="row acenter" class:active={getHour === i}>
				<img src={hour.icon} alt={hour.condition} />

				<div class="col">
					<small>{i}:00h</small>
					<h2>{hour.temp.celsius}º</h2>
				</div>
			</article>
		</li>
	{/each}
</ul>

<style lang="scss">
	.slider {
		padding: 0 20px;
	}
	.slide {
		scroll-margin: 0 20px;
	}

	li {
		margin-right: 10px;

		&:last-of-type {
			margin-right: 0;
		}
	}

	article {
		width: 150px;
		background: rgba(#000, 0.2);
		color: #fff;
		border-radius: 1rem;
		padding: 15px;

		img {
			width: 50px;
			height: 50px;
			object-fit: contain;
			margin-right: 10px;
		}

		small {
			color: var(--grey-light);
		}
	}

	.active {
		background: var(--bg-night);
	}
</style>
