---
author: "William Wall"
title: "Intrinsic Design Part 1: Typography"
date: "2023-07-19"
updated: "2023-07-19"
categories:
  - "projects"
  - "making of"
  - "intrinsic design"
coverImage: "/images/jefferson-santos-fCEJGBzAkrU-unsplash.jpg"
coverWidth: 16
coverHeight: 9
excerpt: Smooth typography styling for every device.
---

Disclaimer: I'm not a designer or much of a font expert at all. But the designer
sending you (and me) stuff probably is.

Therefore, I did a bit of digging into how to do typography with Intrinsic Design.

## Intrinsic Design

We've all seen our nice, Responsive app handle most breakpoints, except for those
few cases within the breakpoint which are _ok_ but not great until the threshold
is finally crossed and they look nice again. We prioritize the exact sizes of the
most popular devices and then just call it good.

Intrinsic Design says we can do better, and so in this exercise I'll be avoiding
breakpoints and media queries altogether in an attempt at a smooth transition
for all screen sizes.

## Typography

In a lot (and I do mean a _lot_) of sites I've previously done, I didn't even
think about this, and just left it as the browser default. Honestly, other than
perhaps being a bit plain, that's not a terrible plan. Browser vendors have put
a lot of time into their default styles to be readable and accessible for most
users.

However, many sites use a particular font or set of fonts, and then define sizes
for various screen widths and the typical typography elements like `p`, `h1-6`,
etc. You can see this in the "Responsive Modular Scale" suggestion in the
[Typography Handbook](https://typographyhandbook.com/).

## Option 1: calc()

If you look up "Fluid Typography", you get some pretty cool solutions. Here's
one using `calc`:

```css
/* example of math */
.example {
    font-size: calc([min size] + ([max size] - [min size]) * (100vw - [min viewport width] ) / ([max viewport width] - [min viewport width])));
}

/* actual code */
.fluid-type {
  font-size: 0.875rem;
}

@media screen and (min-width: 20rem) {
  .fluid-type {
    font-size: calc(0.875rem + 0.5 * ((100vw - 20rem) / 60));
  }
}

@media screen and (min-width: 80rem) {
  .fluid-type {
    font-size: 1.375rem;
  }
}
```
[from Mike Riethmuller](https://www.madebymike.com.au/writing/fluid-type-calc-examples/)

That one linearly scales the font size between the minimum and maximum widths we
are targeting with the design. Those are all well and good, and you could
potentially scale your `line-height` and margins in a similar manner. But what
if we wanted something other than a linear scale?

That leads us into our second option.

## Option 2: Easing and Animation

I happened across two articles: [one from goldsguide.com](https://goldsguide.com/typetura)
and [one on CSS-Tricks](https://css-tricks.com/intrinsic-typography-is-the-future-of-styling-text-on-the-web/).
Both of them referenced [Typetura](https://docs.typetura.com/) as a small library to
help with something they dubbed _Intrinsic Typesetting_. This buzzword matching
was too strong so I went to check it out.

Typetura handles two things that are difficult with the previous `calc()` method:
1. The type can be set based on container width rather than simply the overall
   width of the page. This might be possible with `calc()` more directly as
   CSS Container queries are standardized and more widely available. However, as
   it stands now, that method is _only_ based on the overall page width.
2. Easing. While we could bake an easing equation into our `calc()` method above,
   that's going to get long and unwieldy quite quickly.

If you inspect some of the elements in the Gold's Guide example above, you'll see
the CSS which is doing most of the magic:

```css
animation:
    var(--tt-key)
    1s
    var(--tt-ease)
    1
    calc(-1s * var(--tt-bind) / var(--tt-max))
    both
    paused;
```

Therefore, you provide it keyframes via `--tt-key`, the easing function via
`--tt-ease`, and the maximum width `--tt-max` (which has a default). The only
other unknown is `--tt-bind`. Since the aforementioned container queries can't
be widely used, Typetura uses a small JS library to set the `--tt-bind` variable
everywhere it is needed. Or you can optionally override it.

Let's take a look at how that works out in code (after we've dropped in their
script):

```css
/* define our root variables */
:root {
  --font-size-max: 125%;
  --line-height-min: 1.1;
  --line-height-max: 1.5;
  --tt-ease: cubic-bezier(0, 0.75, 0.1, 0.9);
}

@keyframes text {
  /* A font-size of 0% can't be read, but neither can a width of 0 */
  0% {
    font-size: 0%;
    line-height: var(--line-height-min);
  }
  100% {
    font-size: var(--font-size-max);
    line-height: var(--line-height-max);
  }
}

p {
  --tt-key: text;
}
```

And then we add the following tag:

```html
<p class="typetura">...</p>
```

If you change your browser width, you can see the typesetting change on this
page (provided you start squeezing it to less than the article width). If
you're on mobile that is tougher, but you can perhaps switch to landscape view
or try device with a different size.

Note how the text in this callout is slightly larger than the body text, as its
width is slightly wider than the rest of the article.

<div class="card" style="width: calc(100% + 8rem); margin: 2rem 0 2rem -4rem; padding: 2rem; background: var(--color-base-100); max-width: unset; border-radius: 0.5rem">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque
        diam volutpat commodo sed egestas. Ultrices mi tempus imperdiet nulla
        malesuada pellentesque.
    </p>
</div>

These cards have a smaller width, and therefore use a smaller font size.

<div style="display: flex; gap: 0.5rem">
    <div class="card" style="max-width: 20rem; background-color: var(--color-base-100); border-radius: 0.5rem; padding: 1rem;">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque
            diam volutpat commodo sed egestas. Ultrices mi tempus imperdiet nulla
            malesuada pellentesque.
        </p>
    </div>
    <div class="card" style="max-width: 20rem; background-color: var(--color-base-100); border-radius: 0.5rem; padding: 1rem;">
        <p>
            "The secret of getting ahead is getting started. The secret of
            getting started is breaking your complex overwhelming tasks into
            small manageable tasks, and starting on the first one."
        </p>
    </div>
</div>
