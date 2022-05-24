<script lang="ts">
	import { UserSettings } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { navVisible } from '$lib/stores';
	import { daySection } from '$lib/utils';

	$navVisible = false;

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
	<img src={daySection() === 'day' ? '/logo.svg' : '/logo-w.svg'} alt="Midu Weather" />

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
			background: rgba(#fff, 0.7);
			font-size: 18px;
			border: 1px solid rgba(#000, 0.6);
			border-radius: 1rem;
			box-shadow: inset 0 0 8px 0 rgba(#000, 0.6);
			padding: 1.25rem 2rem;
		}

		button {
			background: var(--pri-dark);
			color: #fff;
			border: 0;
			border-radius: 1rem;
			box-shadow: 0 10px 20px -10px rgba(#000, 0.6), inset 2px 2px 2px -1px rgba(#fff, 0.5),
				inset -2px -2px 2px -1px rgba(#000, 0.6);
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
