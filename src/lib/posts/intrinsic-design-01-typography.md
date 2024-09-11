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

<style>
    .card {
        max-width: 20rem;
        background-color: var(--color-base-100);
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .callout {
        background: var(--color-base-100);
        border-radius: 0.5rem;
        margin-left: 50%;
        max-width: 95vw;
        padding: 2rem;
        width: min(95vw, 100% + 8rem);
        transform: translateX(-50%);
    }

    .clamped {
        max-width: 100%;
        --tt-key: none;
        font-size: clamp(100%, calc(0.95rem + 0.25vw), 125%);
    }
</style>

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
think about this, and just left it as the browser default or however the component
library which I was using set it up. Honestly, that's not a terrible plan, as
browser vendors and design system authors have put a lot of time into making their
default typography highly readable and accessible to users.

Some sites use a particular font or set of fonts, and then define sizes
for various screen widths (so media breakpoints) and the typical typography
elements like `p`, `h1-6`, etc. You can see this in the "Responsive Modular Scale"
suggestion in the [Typography Handbook](https://typographyhandbook.com/).

## Option 1: clamp()

If you look up "Fluid Typography", you get some pretty cool solutions. Here's
one using `clamp`:

```css
:root {
    --font-size: clamp(100%, calc(0.95rem + 0.25vw), 125%);
}

body {
    font-size: var(--font-size);
}

h1 {
    font-size: calc(2.5 * var(--font-size));
}
```

That one linearly scales the font size between the minimum and maximum widths we
are targeting with the design. Those are all well and good, and you could
potentially scale your `line-height` and margins in a similar manner.

You can see it in action in the box below by resizing your browser:
<div class="card clamped">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque
        diam volutpat commodo sed egestas. Ultrices mi tempus imperdiet nulla
        malesuada pellentesque.
    </p>
</div>

Pros:
- It is fluidly responsive to viewport width changes
- CSS-only

Cons:
- It is only responsive to the viewport width, not the container width. This might
be possible as CSS Container queries become more standardized and widely available.
As it stands now, this is typically only responding to the viewport width.
- Interpolation easing is difficult if you want something other than linear.


## Option 2: Easing and Animation

I happened across two articles: [one from goldsguide.com](https://goldsguide.com/typetura)
and [one on CSS-Tricks](https://css-tricks.com/intrinsic-typography-is-the-future-of-styling-text-on-the-web/).
Both of them referenced [Typetura](https://docs.typetura.com/) as a small library to
help with something they dubbed _Intrinsic Typesetting_. The buzzword matching
was too strong so I went to check it out.

Typetura handles the two downsides to the `clamp/calc` method above, namely
responding to the container width and also handling easing functions. If you
inspect some of the elements in the Gold's Guide example above, you'll see the
CSS which is doing most of the magic:

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
    font-size: var(--font-size-max);
    line-height: var(line-height-max);
}

/* the animation name needs to match --tt-key */
@keyframes text {
    /* A font-size of 0% can't be read,
       but neither can a width of 0 */
    0% {
        font-size: 0%;
        line-height: var(--line-height-min);
    }
    100% {
        font-size: 100%;
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
width is slightly wider than the rest of the article (on a larger screen).


<div class="card callout">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque
        diam volutpat commodo sed egestas. Ultrices mi tempus imperdiet nulla
        malesuada pellentesque.
    </p>
</div>

These cards have a smaller width, and therefore use a smaller font size.

<div style="display: flex; gap: 0.5rem">
    <div class="card">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque
            diam volutpat commodo sed egestas. Ultrices mi tempus imperdiet nulla
            malesuada pellentesque.
        </p>
    </div>
    <div class="card">
        <p>
            "The secret of getting ahead is getting started. The secret of
            getting started is breaking your complex overwhelming tasks into
            small manageable tasks, and starting on the first one."
        </p>
    </div>
</div>
