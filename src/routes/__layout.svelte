<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { daySection } from '$lib/functions/time';

	const dayState = daySection() !== 'night' ? 'day' : 'night';
</script>

<div id="app" class="{dayState} row fcenter fill">
	<slot />
</div>

<style lang="scss">
	:global {
		@import '../_reset.scss';
		@import 'verdu/verdu.scss';
	}

	.day {
		background: var(--bg-day);
	}

	.night {
		background: var(--bg-night);
	}
</style>
