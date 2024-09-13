<script>
	import { postsPerPage } from "$lib/config";

	export let currentPage;
	export let totalPosts;
	export let path = "/blog/page";

	let pagesAvailable;
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage);

	const isCurrentPage = (page) => page == currentPage;

	const getAccessibleLabel = (page) =>
		isCurrentPage(page) ? `Current page: ${page}` : `Go to page ${page}`;
</script>

<!-- For some reason, the pagination wasn't re-rendering properly during navigation without the #key block -->
{#key currentPage}
	{#if pagesAvailable > 1}
		<nav aria-label="Pagination navigation" class="pagination">
			<ul>
				{#each Array.from({ length: pagesAvailable }, (_, i) => i + 1) as page}
					<li>
						<a
							aria-label={getAccessibleLabel(page)}
							href="{path}/{page}"
							aria-current={isCurrentPage(page)}
						>
							{page}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
{/key}

<style>
	.pagination {
		margin: 0 0 1rem;
	}

	.pagination ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		list-style-type: none;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
	}

	.pagination li {
		margin: 0;
	}

	.pagination a {
		text-decoration: none;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2em;
		height: 2em;
		font-weight: bold;
		transition: all 0.2s;
	}

	.pagination a:hover {
		background: var(--pico-primary);
		color: var(--pico-primary-inverse);
	}

	.pagination a[aria-current="true"] {
		background: var(--pico-primary);
		color: var(--pico-primary-inverse);
		border: 1px solid currentColor;
	}
</style>
