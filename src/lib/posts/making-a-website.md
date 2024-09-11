---
author: "William Wall"
title: "Making a Website"
date: "2023-07-18"
updated: "2024-09-11"
categories:
  - "projects"
  - "making of"
  - "svelte"
coverImage: "/images/jefferson-santos-fCEJGBzAkrU-unsplash.jpg"
coverWidth: 16
coverHeight: 9
excerpt: I started a blog. Maybe this will be a project I actually finish?
---

So I started a blog. Or really a website to serve as an online presence, portfolio,
and playground. But since writing is apparently good for you, I intend to document
my projects and thoughts on various topics (dev-related and otherwise).

Starting with how I made this thing and the why behind some of the decisions.

## Blog Platform

I had a co-worker whose first question upon hearing about this endeavor was,
"What blog platform did you go with?"

Well, none.

Obviously rolling your own blog platform is a touch silly. You can probably use
any number of wordpress plugins, webflow, ghost.org, or other services to generate 
a blog that has all kinds of fancy features to get you all hooked up with comments
and link-backs and social integrations and marketing.

That sounds terrible. I have precious few social accounts as it is. We're gonna
keep it that way.

The other thing those services get you is WYSIWYG editors. Developers despise
those.

## Decisions

Static site. Svelte/SvelteKit. Markdown. CDNs. Pico CSS.

### Why?

#### Static Site

Because -- let's be honest -- the number of unfinished side projects I have is
way too high. Let's not run a database if we can help it.

#### Svelte/SvelteKit

40% less code per component on average than React/Next, and much faster to boot.
Easily one of the greatest boosts in developer productivity I've ever seen.
Svelte repackages what you already know (HTML, CSS, and TS/JS) and ties them
together in a significantly smoother fashion.

(Also, sorry to Solid and Inferno, who get an A+ for performance, but I just
don't care for JSX. Definitely check them out if you do.)

[Svelte](https://svelte.dev) |
[SvelteKit](https://kit.svelte.dev)

#### Markdown

It seems like there are already some good libraries which already exist for this,
and the real kicker is having a standard way of describing the post metadata already.
Otherwise I may have been tempted to just write the posts in plain HTML/Svelte.

[mdsvex](https://mdsvex.com) |
[rehype-slug](https://github.com/rehypejs/rehype-slug) |
[rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings)

And since we don't like starting completely from scratch:
[sveltekit-blog-starter](https://github.com/josh-collinsworth/sveltekit-blog-starter)

#### CDNs

Not that I think anyone will actually read this, but on the off chance they do,
I'm not particularly enthused about solving hugs-of-death from link aggregators
or DDOS attempts from one of my friends who might think they're funny.

Probably Fastly.

#### Pico CSS

Because I just want to write semantic HTML and have it look nice without having
to think about it.

[Pico CSS](https://picocss.com)

#### Deployment

I run my own deployment infrastructure, which I'm extremely happy with and
therefore will likely write a series on it.

The core of it is [Coolify](https://coolify.io).

## Wrapping up

I expect to have some individual posts as I implement each of those decisions,
and the design system may be more of a series.
