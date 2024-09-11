<script>
	import { postsPerPage } from '$lib/config';

	export let currentPage;
	export let totalPosts;
	export let path = '/blog/page';

	let pagesAvailable;
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage);

	const isCurrentPage = (page) => page == currentPage;
</script>

<!-- For some reason, the pagination wasn't re-rendering properly during navigation without the #key block -->
{#key currentPage}
	{#if pagesAvailable > 1}
		<nav aria-label="Pagination navigation" class="pagination">
			<ul>
				{#each Array.from({ length: pagesAvailable }, (_, i) => i + 1) as page}
					<li>
						<a href="{path}/{page}" aria-current={isCurrentPage(page)}>
							<span class="sr-only">
								{#if isCurrentPage(page)}
									Current page:
								{:else}
									Go to page
								{/if}
							</span>
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
    background: var(--lightAccent);
    text-decoration: none;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    font-family: var(--primaryFont);
    font-weight: bold;
    transition: background 0.1s;
  }

  .pagination a:hover {
    background: var(--accent);
    color: var(--background);
  }

  .pagination a[aria-current="true"] {
    background: var(--accent);
    color: var(--background);
    border: 1px solid currentColor;
  }
</style>
