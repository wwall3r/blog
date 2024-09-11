<script>
	import { timezoneOffset } from '$lib/config';

	export let posts = [];

	function getHumanDate(isoDateStr) {
		return new Date(Date.parse(isoDateStr) - timezoneOffset)
			.toLocaleString(
				'en-US', 
				{
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}
			);
	}
</script>

<ul class="posts-list">
	{#each posts as post}
		<li>
			<article class="post">
				<small>{getHumanDate(post.date)}</small>
				<hgroup>
					{#if post.coverImage}
						<img
							src={post.coverImage}
							alt=""
							width={post.coverWidth}
							height={post.coverHeight}
							style="ratio: {post.coverWidth} / {post.coverHeight}"
						/>
					{/if}
					<h2>{post.title}</h2>
					<p>{post.excerpt}</p>
				</hgroup>
				<a aria-label="Post: {post.title}, on {getHumanDate(post.date)}" href="/blog/{post.slug}">Read more</a>
				<footer>
					<a href="/blog/{post.slug}" class="secondary">Read more</a>
				</footer>
			</article>
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

	.post {
		position: relative;
	}

	.post > a {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		text-indent: -9999px;
		z-index: 1;
	}
</style>
