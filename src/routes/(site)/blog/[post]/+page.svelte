<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	export let data;

	const {
		title,
		excerpt,
		date,
		updated,
		coverImage,
		coverWidth,
		coverHeight,
		tags,
	} = data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<section>
	<header>
		{#if coverImage}
			<!-- You might want to add an alt frontmatter attribute. If not, leaving alt blank here works, too. -->
			<img
				class="cover-image"
				src={coverImage}
				alt=""
				style="aspect-ratio: {coverWidth} / {coverHeight};"
				width={coverWidth}
				height={coverHeight}
			/>
		{/if}

		<hgroup>
			<h1>{title}</h1>
			<p>{excerpt}</p>
		</hgroup>

		<p>
			<small>
				Published: {date}
				Updated: {updated}
			</small>
		</p>
	</header>

	<svelte:component this={PostContent} />

	{#if tags}
		<hr />
		<footer>
			<h4>Posted in:</h4>
			<ul title="categories">
				{#each tags as tag}
					<li>
						<a href="/blog/tag/{tag}/">
							{tag}
						</a>
					</li>
				{/each}
			</ul>
		</footer>
	{/if}
</section>

<style>
	h1 {
		color: var(--pico-primary);
	}

	footer h4 {
		display: inline;
	}

	footer ul {
		display: inline;
		margin-left: 0.5rem;
		padding: 0;
	}

	footer li {
		list-style-type: none;
		display: inline;
		margin-right: 0.5rem;
	}

	.cover-image {
		width: 100%;
	}
</style>
