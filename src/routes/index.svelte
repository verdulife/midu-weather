<script lang="ts">
	import { UserSettings } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { navVisible } from '$lib/stores';
	import { daySection } from '$lib/utils';

	$navVisible = false;

	const { city } = $UserSettings;

	/* if (city) goto(city); */

	function getGeolocation() {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const { latitude, longitude } = coords;
			if (latitude && longitude) {
				goto(`${latitude},${longitude}`);
			}
		});
	}

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
		class="logo xfill"
		src={daySection() === 'day' ? '/logo.svg' : '/logo-w.svg'}
		alt="Midu Weather"
	/>

	<form class="col acenter xfill" on:submit|preventDefault={setCity}>
		<label for="city">
			Find the <strong>weather</strong>
			<br />
			in your city
		</label>

		<div class="input-wrapper row acenter xfill">
			<input
				class="grow"
				type="text"
				name="city"
				id="city"
				bind:value={userCity}
				placeholder="Search for a location"
				autocomplete="off"
			/>

			<img src="/geolocation.svg" alt="Get address" on:click={getGeolocation} />
		</div>

		<button>SET LOCATION</button>
	</form>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		color: #fff;
		padding: 30px;
	}

	.logo {
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

		.input-wrapper {
			background: rgba(#fff, 0.6);
			border-radius: 1rem;
			padding-right: 10px;
			overflow: hidden;

			input {
				font-size: 16px;
				padding: 20px 32px;
			}

			img {
				cursor: pointer;
				width: 40px;
				height: 40px;
				background: var(--sec);
				border-radius: .75rem;
				opacity: 0.7;
				padding: 8px;
				margin-left: 10px;
				transition: 200ms;

				&:hover {
					opacity: 1;
				}
			}
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
