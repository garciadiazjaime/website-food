<script>
  import '../theme/_smui-theme.scss';
  import './StickyBanner.scss';
  let stickyBanner;
  let y;

</script>
<style>
</style>
<svelte:window bind:scrollY={y}/>
<div class="sticky-banner" bind:this={stickyBanner}>
  <div class="content">
    <slot></slot>
  </div>
</div>
