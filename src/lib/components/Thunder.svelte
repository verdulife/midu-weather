<script lang="ts">
	import { dayState } from '$lib/stores';
</script>

<div
	class="thunder row fill"
	style={$dayState === 'day' ? '--lightning: lightgoldenrodyellow;' : ''}
/>

<style lang="scss">
	.thunder {
		--lightning: var(--sec-light);

		position: absolute;
		inset: 0;
		background: var(--lightning);
		opacity: 0;
		animation: thunderFlash 6s ease-out infinite;
	}

	@keyframes thunderFlash {
		0% {
			opacity: 0;
		}
		2% {
			opacity: 0;
		}
		3% {
			opacity: 0.6;
		}
		4% {
			opacity: 0.2;
		}
		6% {
			opacity: 0.9;
		}
		30% {
			opacity: 0;
		}
	}
</style>
