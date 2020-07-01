<script>
  import '../theme/_smui-theme.scss';
  import './StickyBanner.scss';
  export let offset;
  let stickyBanner;
  let y;

</script>
<style>
</style>
<svelte:window bind:scrollY={y}/>
<div class="sticky-banner" bind:this={stickyBanner}>
  <slot></slot>
</div>
