<script lang="ts">
	import type { HourWeather } from '$lib/types';
	import { onMount } from 'svelte';
	import { transformScroll } from '$lib/utils';
	import { selectedHour } from '$lib/stores';

	export let hours: HourWeather[];
	const getHour = new Date().getHours();

	function setHour(i: number) {
		$selectedHour = i;
	}

	onMount(() => {
		const slider = document.querySelector('.slider') as HTMLElement;
		const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;

		slides.forEach((slide, index) => {
			if (index === getHour) {
				slider.scrollLeft = slide.offsetLeft;
			}
		});

		slider.addEventListener('wheel', transformScroll);
	});
</script>

<ul class="slider">
	{#each hours as hour, i}
		<li class="slide">
			<article class="row acenter" class:active={$selectedHour === i} on:click={() => setHour(i)}>
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
		cursor: pointer;
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
		backdrop-filter: blur(10px);
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
		background: var(--bg-card-active);
	}
</style>
