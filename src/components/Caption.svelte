<script>
	import ExpandButton from '../components/ExpandButton.svelte';

  export let caption = '';
  let isOpen = false;
  const shortCaption = caption.substring(0, 144)
</script>

<style>
	.caption {
		margin: 0 auto;
		font-size: 16px;
		line-height: 1.2;
		word-break: break-all;
  }
</style>

{#if shortCaption}
  <p class="caption" on:click={() => isOpen = !isOpen}>
    {#if !isOpen}
      {shortCaption}...
    {:else}
      {caption}
    {/if}
    <ExpandButton expand={isOpen} />
  </p>
{:else}
  <p class="caption">
    {caption}
  </p>
{/if}
