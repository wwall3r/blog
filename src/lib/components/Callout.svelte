<div class="callout">
	<slot />
</div>
<style>
  .callout {
    background: var(--color-base-100);
    padding: 2rem 1rem;
    width: calc(100% + 2rem);
    max-width: unset;
    margin: 2rem 0 2rem -1rem;
    font-style: italic;
    border-radius: 0.125rem;
  }

  @media (min-width: /* sm min */ 48rem) {
    .callout {
      width: calc(100% + 4rem);
      margin: 2rem 0 2rem -2rem;
      padding: 2rem;
    }
  }
</style>
