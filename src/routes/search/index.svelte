<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<div class="scroll">
	<Search />
</div>

<style lang="scss">
	.scroll {
		transform: translateY(calc(100% - 100px));
		z-index: 1;
		animation: fromBottom 500ms ease-out;
		animation-fill-mode: forwards;
	}

	@keyframes fromBottom {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
