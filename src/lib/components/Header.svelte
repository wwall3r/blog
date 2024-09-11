<script>
	import MainNav from './MainNav.svelte';
	import { siteTitle } from '$lib/config';
</script>

<header class="container">
	<nav>
		<ul>
			<li><strong><a href="/">{siteTitle}</a></strong></li>
		</ul>
		<MainNav />
	</nav>
</header>
