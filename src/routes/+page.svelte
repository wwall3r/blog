<script>
	import "$lib/assets/css/global.css";

	import Logo from "$lib/components/Logo.svelte";
	import MainNav from "$lib/components/MainNav.svelte";
	import { navItems, siteDescription, siteTitle } from "$lib/config";
	import { preloadCode } from "$app/navigation";
	import { onDestroy, onMount } from "svelte";

	let observer;

	onMount(() => {
		/**
		 * This pre-fetches all top-level routes on the site in the background for faster loading.
		 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
		 *
		 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
		 * own preloadData() calls here, too.
		 **/
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
				}
			});
		});

		let hiddenEls = document.querySelectorAll("section");
		hiddenEls.forEach((el) => {
			observer.observe(el);
		});

		hiddenEls = document.querySelectorAll("li");
		hiddenEls.forEach((el) => {
			observer.observe(el);
		});
	});

	onDestroy(() => {
		observer?.disconnect();
		observer = null;
	});
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<main class="container">
	<section>
		<h1>
			<Logo size="lg" />
		</h1>
	</section>
	<section>
		<p>{siteDescription}</p>
	</section>
	<section>
		<nav>
			<MainNav />
		</nav>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 40rem;
		margin: 4rem auto;
		text-align: center;
	}

	p {
		color: var(--pico-secondary);
	}

	section {
		opacity: 0;
		filter: blur(1rem);
		transform: translateY(-50%);
		transition: all 1s;
	}

	@media (prefers-reduced-motion) {
		section {
			transition: none;
		}
	}

	:global(section.show) {
		opacity: 1;
		filter: blur(0);
		transform: translateY(0);
	}

	section:nth-child(2) {
		transition-delay: 2.4s;
	}

	section:nth-child(3) {
		transition-delay: 2.8s;
	}

	nav :global(ul li) {
		opacity: 0;
		filter: blur(0.4rem);
		transform: translateY(-100%);
		transition: all 1s;
	}

	@media (prefers-reduced-motion) {
		nav :global(ul li) {
			transition: none;
		}
	}

	nav :global(ul li.show) {
		opacity: 1;
		filter: blur(0);
		transform: translateY(0);
	}

	nav :global(li:nth-child(1)) {
		transition-delay: 2.4s;
	}

	nav :global(li:nth-child(2)) {
		transition-delay: 2.8s;
	}

	nav :global(li:nth-child(3)) {
		transition-delay: 3.2s;
	}
</style>
