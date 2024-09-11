<script>
	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import { siteTitle } from '$lib/config';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header>
	<a on:click|preventDefault={focusMain} class="skip-to-content-link" href="#main">
		Skip to main content
	</a>

	<a href="/" class="site-title">
		{siteTitle}
	</a>

	<HamburgerMenuButton />
	<MainNav />
</header>

<style>
  .skip-to-content-link {
    position: absolute;
    top: -6rem;
    left: 0;
    padding: 0.5em;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background: var(--darker);
    color: var(--background);
  }

  .skip-to-content-link:focus {
    transform: translateY(6rem);
    opacity: 1;
    z-index: 11;
  }
</style>
