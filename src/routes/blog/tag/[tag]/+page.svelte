<!-- Renders any page at /blog/tag/* -->
<script>
	import PostsList from "$lib/components/PostsList.svelte";
	import Pagination from "$lib/components/Pagination.svelte";

	export let data;

	const { page, posts, tag, total } = data;
</script>

<svelte:head>
	<title>tag: {tag}</title>
</svelte:head>

<h1>Articles tagged "{tag}"</h1>

{#if posts.length}
	<PostsList {posts} />
	<Pagination
		currentPage={page}
		totalPosts={total}
		path="/blog/tag/{tag}/page"
	/>
{:else}
	<p>
		<strong>Doh!</strong> Sorry, couldn't find any posts in the tag "{tag}."
	</p>

	<p><a href="/blog">Back to blog</a></p>
{/if}
