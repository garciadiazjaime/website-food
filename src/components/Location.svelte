<script>
  export let post = {};
  $: location = getLocation(post)
  $: dist = getDist(post)

  function getLocation() {
    if (!post.location || !post.location.address || !post.location.address.street) {
      return ''
    }

    return post.location.address.street
  }

  function getDist() {
    if (!post.dist || !post.dist.calculated) {
      return ''
    }

    const rawDist = post.dist.calculated / 1000;
    return `${rawDist.toFixed(1)}km`;
  }
</script>

<style>
  .grid-container {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 20px 1fr;
    align-items: top;
    color: #727272;
    font-size: 14px;
    margin-bottom: 14px;
  }
  img {
    width: 18px;
    height: 18px;
    display: inline-block; 
  }
</style>

{#if location || dist}
  <div class="grid-container">
    <img src="/icons/location.svg" aria-hidden alt="" />
    {dist} { dist && location && '|'} {location}
  </div>
{/if}
