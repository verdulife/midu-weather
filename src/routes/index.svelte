<script lang="ts">
	import { UserSettings } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { daySection } from '$lib/functions/time';

	const { city } = $UserSettings;

	/* if (city) goto(city); */

	let start = false;
	setTimeout(() => (start = true), 1000);

	let userCity: string;

	function setCity() {
		if (userCity) {
			$UserSettings.city = userCity;
			goto(userCity);
		}
	}
</script>

{#if start}
	<div class="sunny wrapper col fcenter fill" transition:fade>
		<h1>Good {daySection()}</h1>
		<form class="col acenter xfill" on:submit|preventDefault={setCity}>
			<img src="/logo.svg" alt="Midu Weather" />
			<label for="city">Search for a location</label>
			<input class="white semi xfill" type="text" name="city" id="city" bind:value={userCity} />
			<button class="pri semi">SET LOCATION</button>
		</form>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		color: #fff;
		padding: 40px;
	}

	.sunny {
		background: var(--bg-sunny);
	}

	h1 {
		position: absolute;
		animation: fadeOut 1s ease-in;
		animation-delay: 2s;
		animation-fill-mode: forwards;
	}

	form {
		gap: 20px;
		opacity: 0;
		animation: fadeIn 500ms ease-out;
		animation-delay: 3s;
		animation-fill-mode: forwards;
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(200px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
