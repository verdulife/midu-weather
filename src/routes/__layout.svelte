<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
</script>

<div id="app" class="row fcenter fill">
	<slot />
</div>

<style lang="scss">
	:global {
		@import '../_reset.scss';
		@import 'verdu/verdu.scss';
	}
</style>
