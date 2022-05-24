<script lang="ts">
	import { UserSettings } from '$lib/stores';
	import { goto } from '$app/navigation';

	const { city } = $UserSettings;

	/* if (city) goto(city); */

	let userCity: string;

	function setCity() {
		if (userCity) {
			$UserSettings.city = userCity;
			goto(userCity);
		}
	}
</script>

<div class="wrapper col jend acenter fill">
	<div class="sunny state-bg row fill" />
	<img src="/logo.svg" alt="Midu Weather" />

	<form class="col acenter xfill" on:submit|preventDefault={setCity}>
		<label for="city">
			Find the <strong>weather</strong>
			<br />
			in your city
		</label>
		<input
			class="white xfill"
			type="text"
			name="city"
			id="city"
			bind:value={userCity}
			placeholder="Search for a location"
		/>

		<button>SET LOCATION</button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		color: #fff;
		padding: 30px;

		@media (hover: hover) {
			max-width: 400px;
			max-height: 800px;
			border-radius: 3rem;
			box-shadow: 0 60px 60px -20px var(--pri-dark), inset 2px 2px 2px -1px rgba(#fff, 0.5),
				inset -2px -2px 2px -1px var(--pri-dark);
			overflow: hidden;
		}
	}

	.state-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		animation: fadeIn 500ms ease-out;
		animation-delay: 500ms;
		animation-fill-mode: forwards;
	}

	.sunny {
		background: var(--bg-sunny);
	}

	img {
		opacity: 0;
		padding: 10px;
		animation: fadeIn 1s ease-out;
		animation-delay: 1s;
		animation-fill-mode: forwards;
	}

	form {
		gap: 20px;
		opacity: 0;
		animation: fromBottom 500ms ease-out;
		animation-delay: 2s;
		animation-fill-mode: forwards;

		label {
			font-size: 1.75rem;
			text-align: center;
			margin-top: 100px;
		}

		input {
			background: rgba(#fff, 0.6);
			font-size: 18px;
			border: 1px solid var(--pri);
			border-radius: 1rem;
			box-shadow: inset 0 0 8px 0 var(--pri);
			padding: 1.25rem 2rem;
		}

		button {
			background: var(--pri-dark);
			color: #fff;
			border: 0;
			border-radius: 1rem;
			box-shadow: 0 2px 5px 0 var(--pri-dark), inset 2px 2px 2px -1px rgba(#fff, 0.5),
				inset -2px -2px 2px -1px var(--pri-dark);
			padding: 1.25rem 2rem;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fromBottom {
		from {
			opacity: 0;
			transform: translateY(200px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
