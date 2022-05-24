<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<nav class="row" transition:slide>
	<ul class="row jcenter fill">
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		inset: auto 20px 20px 20px;
		height: 70px;
		background: rgba(#fff, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 1.5rem;
		z-index: 9;
	}
</style>
