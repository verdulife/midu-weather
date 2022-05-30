<script lang="ts">
	import { slide } from 'svelte/transition';

	const routes = [
		{
			href: '/',
			alt: 'Home',
			src: '/home.svg'
		},
		{
			href: '/search',
			alt: 'Search',
			src: '/search.svg'
		},
		{
			href: '/settings',
			alt: 'Settings',
			src: '/settings.svg'
		}
	];
</script>

<nav class="row" transition:slide>
	<ul class="row jcenter fill">
		{#each routes as { href, alt, src }}
			<li class="row fcenter yfill">
				<a class="fill" {href}>
					<img class="fill" {src} {alt} />
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		inset: auto 20px 20px 20px;
		height: 80px;
		background: rgba(#fff, 0.2);
		backdrop-filter: blur(10px);
		border-radius: 1.5rem;
		z-index: 9;
	}

	ul {
		li {
			width: calc(100% / 3);

			a {
				color: #fff;

				img {
					object-fit: contain;
					padding: 30px;
				}
			}
		}
	}
</style>
