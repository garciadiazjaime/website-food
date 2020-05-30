<script>
  export let post = {};
  let location;
  let dist;

  if(post.location && post.location.address && post.location.address.street) {
    location = post.location.address.street;
  }

  if(post.dist && post.dist.calculated) {
    const rawDist = post.dist.calculated/1000;
    dist = `${rawDist.toFixed(1)}km`;
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

{#if location}
  <div class="grid-container">
    <img src="/icons/location.svg" aria-hidden alt="" />
    {dist} | {location}
  </div>
{/if}

