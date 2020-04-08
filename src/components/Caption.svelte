<script>
	import ExpandButton from '../components/ExpandButton.svelte';
  export let shortCaption = '';
  export let caption = '';
  let isCaptionOpen = false;
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
  <p class="caption" on:click={() => isCaptionOpen = !isCaptionOpen}>
    {#if !isCaptionOpen}
      {shortCaption}...
      {:else}
        {caption}
    {/if}
    <ExpandButton expand={isCaptionOpen} />
  </p>
  {:else}
    <p class="caption">
      {caption}
    </p>
{/if}