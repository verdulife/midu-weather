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
	<img
		class="xfill"
		src={daySection() === 'day' ? '/logo.svg' : '/logo-w.svg'}
		alt="Midu Weather"
	/>

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
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 250px;
		opacity: 0;
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
			font-size: 26px;
			text-align: center;
			margin-top: 100px;
		}

		input {
			background: rgba(#fff, 0.6);
			font-size: 16px;
			border-radius: 1rem;
			padding: 20px 32px;
		}

		button {
			background: var(--ter);
			color: #fff;
			font-size: 12px;
			border: 0;
			border-radius: 1rem;
			padding: 20px 32px;
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
