<script>
	import { currentPage, isMenuOpen } from '$lib/assets/js/store';

	export let href;

	$: isCurrentPage = $currentPage.startsWith(href);

	const maybeCloseMenu = () => {
		if (href != $currentPage) {
			isMenuOpen.set(false);
		}
	};
</script>

<li>
	<a
		{href}
		on:click={maybeCloseMenu}
		aria-current={isCurrentPage ? 'page' : false}
	>
		<slot />
	</a>
</li>
