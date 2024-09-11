<script>
	export let posts = [];
</script>

<ul class="posts-list">
	{#each posts as post}
		<li>
				<hgroup>
					<img
						src={post.coverImage}
						alt=""
						width={post.coverWidth}
						height={post.coverHeight}
						style="ratio: {post.coverWidth} / {post.coverHeight}"
					/>
					<h2>
						<a href="/blog/{post.slug}">
							{post.title}
						</a>
					</h2>
					<p>{post.excerpt}</p>
				</hgroup>
		</li>
	{/each}
</ul>

<style>
  .posts-list {
    list-style-type: none;
    padding: 0;
  }

  .posts-list li {
		list-style: none;
    margin-bottom: 2rem;
  }

  .posts-list img + h2 {
    margin-top: 1rem;
  }
</style>
