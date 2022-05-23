<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { daySection } from '$lib/functions/time';
</script>

<div id="app" class="{daySection()} row fcenter fill">
	<slot />
</div>

<style lang="scss">
	:global {
		@import '../_reset.scss';
		@import 'verdu/verdu.scss';
	}

	.night {
		background: #2a2e4c;
	}

	.morning {
		background: #f7cd5d;
	}

	.day {
		background: #8fdff9;
	}

	.evening {
		background: #e49759;
	}
</style>
