<script>
	import { siteTitle } from "$lib/config";
</script>

<svelte:head>
	<link
		href="https://api.fonts.coollabs.io/css2?family=Ms+Madi&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<a href="/">
	{siteTitle}
</a>

<style>
	a {
		--logo-color: var(--pico-primary);
		--logo-shadow: var(--pico-primary-inverse);

		font-family: "Ms Madi", cursive, sans-serif;
		font-size: 2rem;
		font-weight: 400;
		color: var(--logo-color);

		animation: pulsate 4s infinite alternate;
	}

	a:hover {
		text-decoration-thickness: 1px;
	}

	@media only screen and (prefers-color-scheme: dark) {
		a {
			--logo-color: var(--pico-primary-inverse);
			--logo-shadow: #bc13fe;
		}
	}

	@keyframes pulsate {
		100% {
			text-shadow:
				0 0 4px var(--logo-color),
				0 0 11px var(--logo-color),
				0 0 19px var(--logo-color),
				0 0 40px var(--logo-shadow),
				0 0 80px var(--logo-shadow),
				0 0 90px var(--logo-shadow),
				0 0 100px var(--logo-shadow),
				0 0 150px #bc13fe;
		}

		0% {
			text-shadow:
				0 0 2px var(--logo-color),
				0 0 4px var(--logo-color),
				0 0 6px var(--logo-color),
				0 0 10px var(--logo-shadow),
				0 0 45px var(--logo-shadow),
				0 0 55px var(--logo-shadow),
				0 0 70px var(--logo-shadow),
				0 0 80px var(--logo-shadow);
		}
	}

	@media screen and (prefers-reduced-motion) {
		a {
			animation: none;
		}
	}
</style>
