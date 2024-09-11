<script>
	export let posts = [];
</script>

<ul class="posts-list">
	{#each posts as post}
		<li>
			<article>
				<a href="/blog/{post.slug}">
					<img
						src={post.coverImage}
						alt=""
						width={post.coverWidth}
						height={post.coverHeight}
						style="ratio: {post.coverWidth} / {post.coverHeight}"
					/>
					<h2>
						{post.title}
					</h2>
				</a>
			</article>

			<p>{post.excerpt}</p>
		</li>
	{/each}
</ul>

<style>
  .posts-list {
    list-style-type: none;
    padding: 0;
  }

  .posts-list li {
    margin-bottom: 6rem;
  }

  .posts-list img + h2 {
    margin-top: 1rem;
  }

  .posts-list a {
    display: block;
  }
</style>
