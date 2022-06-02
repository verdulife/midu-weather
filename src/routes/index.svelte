<script lang="ts">
	import { UserSettings } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { navVisible } from '$lib/stores';
	import { daySection } from '$lib/utils';

	$navVisible = false;

	const { city } = $UserSettings;

	if (city) goto(`address/${city}`);

	function getGeolocation() {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const { latitude, longitude } = coords;
			if (latitude && longitude) {
				$UserSettings.city = `${latitude},${longitude}`;
				goto(`address/${latitude},${longitude}`);
			}
		});
	}
</script>

<div class="wrapper col jend acenter fill">
	<img
		class="logo xfill"
		src={daySection() === 'day' ? '/logo.svg' : '/logo-w.svg'}
		alt="Midu Weather"
	/>

	<div class="cta col acenter xfill">
		<input
			class="xfill"
			type="text"
			name="city"
			id="city"
			placeholder="Search for a location"
			autocomplete="off"
			on:focus={() => goto('search')}
		/>

		<button class="row acenter" on:click={getGeolocation}>
			<img src="/geolocation.svg" alt="Get address" /> FIND LOCATION
		</button>
	</div>
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

	.cta {
		opacity: 0;
		animation: fromBottom 500ms ease-out;
		animation-delay: 2s;
		animation-fill-mode: forwards;
	}

	input {
		background: rgba(#fff, 0.6);
		font-size: 16px;
		border-radius: 1rem;
		padding: 20px 32px;
		margin-bottom: 20px;
	}

	button {
		background: var(--ter);
		color: #fff;
		font-size: 12px;
		border: 0;
		border-radius: 1rem;
		padding: 20px 32px;

		img {
			cursor: pointer;
			width: 20px;
			margin-right: 10px;
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
