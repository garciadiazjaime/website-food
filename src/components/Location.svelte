<script>
  export let post = {};
  let location;

  if(post.location && post.location.address && post.location.address.street) {
    location = post.location.address.street;
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
    {location}
  </div>
{/if}

