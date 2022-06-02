<script lang="ts">
	import { goto } from '$app/navigation';
	import { navVisible, UserSettings } from '$lib/stores';

	$navVisible = true;
	let settings = $UserSettings;

	function updateSettings() {
		$UserSettings = {};
		goto('/');
	}
</script>

<form class="col fcenter fill" on:submit|preventDefault={updateSettings}>
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

<style lang="scss">
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
			color: #fff;
			font-size: 12px;
			border: 0;
			border-radius: 1rem;
			padding: 20px 32px;
			margin-top: 20px;
		}
	}
</style>
