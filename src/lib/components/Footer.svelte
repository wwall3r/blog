<script>
	import { siteAuthor } from '$lib/config';
	import MainNav from './MainNav.svelte';
	import NavItem from './NavItem.svelte';
</script>

<footer class="container">
	<p>&copy;{new Date().getFullYear()} &ndash; {siteAuthor}</p>
	<nav>
		<ul>
			<NavItem href="/">Home</NavItem>
			<NavItem href="/api/rss.xml">RSS</NavItem>
		</ul>
		<MainNav />
	</nav>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	
	footer > p {
		text-wrap: nowrap;
	}
</style>
