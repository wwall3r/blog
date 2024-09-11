<script>
	import MainNav from './MainNav.svelte';
	import { siteAuthor } from '$lib/config';
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
		</ul>
	</nav>

	<p>&copy;{new Date().getFullYear()} {siteAuthor}</p>
</footer>

<style>
  footer {
    background: var(--darker);
    color: var(--paper);
    display: grid;
    grid-template-columns: 100%;
    align-items: stretch;
    gap: 2rem;

  }

  @media (min-width: /* sm min */ 48rem) {
    footer {
      grid-template-columns: 1fr 1fr 2fr;
    }
  }

  footer .menu-button {
    display: none;
  }

  footer p {
    margin: 0;
    font-size: 0.8rem;
  }

  footer a {
    color: inherit;
  }

  footer nav {
    display: initial;
  }

  @media (min-width: /* sm min */ 48rem) {
    footer {
      border-right: 1px solid var(--dark);
    }
  }

  footer ul {
    display: initial;
  }

  footer ul li + li {
    margin-top: 0.5rem;
  }
</style>
