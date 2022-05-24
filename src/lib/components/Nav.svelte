<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<nav class="row" transition:slide>
	<ul class="row jcenter fill">
		<li class="row fcenter yfill">
			<a href="/">BACK</a>
		</li>
		<li class="row fcenter yfill">
			<a href="#">2</a>
		</li>
		<li class="row fcenter yfill">
			<a href="#">3</a>
		</li>
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

	ul {
		li {
			width: calc(100% / 3);

			a {
				color: #fff;
			}
		}
	}
</style>
