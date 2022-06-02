<script lang="ts">
	import { goto } from '$app/navigation';
	import { navVisible, UserSettings, dayState, condition } from '$lib/stores';

	$navVisible = true;
	let settings = $UserSettings;

	function updateSettings() {
		$UserSettings = {};
		goto('/');
	}

	let testDaySection = 1;
</script>

<div class="scroll">
	<form class="col acenter xfill" on:submit|preventDefault={updateSettings}>
		<div class="input-wrapper col acenter xfill">
			<label for="city">Last city visited</label>
			<input
				class="xfill"
				type="text"
				id="city"
				name="city"
				bind:value={settings.city}
				placeholder="Ex. Barcelona"
				readonly
			/>
		</div>

		<button>RESET SETTINGS</button>
	</form>

	<div class="testing col acenter xfill">
		<h1>App testing</h1>

		<div class="opt-wrapper col acenter xfill">
			<h3>Day section</h3>
			<ul class="day-wrapper row fcenter xfill">
				<li
					class="fake-btn"
					class:active={$dayState === 'day'}
					on:click={() => ($dayState = 'day')}
				>
					Day
				</li>
				<li
					class="fake-btn"
					class:active={$dayState === 'night'}
					on:click={() => ($dayState = 'night')}
				>
					Night
				</li>
			</ul>
		</div>

		<div class="col acenter xfill">
			<h3>Weather type</h3>
			<ul class="weather-wrapper col acenter xfill">
				<li
					class="fake-btn xhalf"
					class:active={$condition === 'sunny'}
					on:click={() => ($condition = 'sunny')}
				>
					Sunny/Clear
				</li>
				<li
					class="fake-btn xhalf"
					class:active={$condition === 'rain' || $condition === 'snow'}
					on:click={() => ($condition = 'rain')}
				>
					Rain/Snow
				</li>
				<li
					class="fake-btn xhalf"
					class:active={$condition === 'thunder'}
					on:click={() => ($condition = 'thunder')}
				>
					Thunder/Storm
				</li>
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.scroll {
		color: #fff;
		padding-bottom: 100px;
	}

	form {
		padding: 30px;
		z-index: 1;

		label {
			padding: 5px 15px;
		}

		input {
			background: rgba(#fff, 0.6);
			text-align: center;
			font-size: 16px;
			border-radius: 1rem;
			padding: 20px 32px;
			overflow: hidden;
		}

		button {
			min-width: 200px;
			background: var(--ter);
			font-size: 12px;
			color: #fff;
			border: 0;
			border-radius: 1rem;
			padding: 20px 32px;
			margin-top: 20px;
		}
	}

	.testing {
		padding: 30px;

		h3 {
			margin: 40px 0 10px 0;
		}

		.day-wrapper {
			li {
				width: 150px;
			}
		}

		ul {
			gap: 10px;
		}

		.fake-btn {
			cursor: pointer;
			background: var(--ter);
			text-align: center;
			color: #fff;
			border-radius: 1rem;
			padding: 16px 32px;
			transition: 200ms;

			&:hover {
				transform: scale(0.9);
			}
		}

		.weather-wrapper {
			li {
				width: 220px;
			}
		}

		.active {
			background: var(--sec);
		}
	}
</style>
