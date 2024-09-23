<script>
	import PostsList from "$lib/components/PostsList.svelte";
	import Pagination from "$lib/components/Pagination.svelte";
	import { siteDescription } from "$lib/config";

	export let data;
</script>

<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<h1>Blog</h1>

<p>
	<a href="/blog/tag">Browse by tag</a>. Want updates? Just
	<a href="/api/rss.xml">subscribe to the RSS feed</a>.
</p>

<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />
