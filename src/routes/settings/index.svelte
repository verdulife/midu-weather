<script lang="ts">
	import { navVisible, UserSettings } from '$lib/stores';

	$navVisible = true;
	let settings = $UserSettings;
	let text = 'SAVE SETTINGS';
	let saving = false;

	function message() {
		text = 'SAVED';
		saving = true;

		setTimeout(() => {
			text = 'SAVE SETTINGS';
			saving = false;
		}, 1000);
	}

	function updateSettings() {
		$UserSettings = settings;
		message();
	}
</script>

<form class="col acenter xfill" on:submit|preventDefault={updateSettings}>
	<div class="input-wrapper col xfill">
		<label for="city">Your city</label>
		<input
			class="xfill"
			type="text"
			id="city"
			name="city"
			bind:value={settings.city}
			placeholder="Ex. Barcelona"
		/>
	</div>

	<button class:saving>{text}</button>
</form>

<style lang="scss">
	form {
		padding: 30px;
		z-index: 1;

		label {
			padding: 5px 15px;
		}

		input {
			background: rgba(#fff, 0.6);
			font-size: 16px;
			border-radius: 1rem;
			padding: 20px 32px;
			overflow: hidden;
		}

		button {
			min-width: 200px;
			background: var(--ter);
			color: #fff;
			font-size: 12px;
			border: 0;
			border-radius: 1rem;
			padding: 20px 32px;
			margin-top: 20px;
		}

		.saving {
			background: $success;
		}
	}
</style>
