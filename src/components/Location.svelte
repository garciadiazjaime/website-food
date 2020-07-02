<script>
  export let post = {};
  $: location = getLocation(post)
  $: dist = getDist(post)

  function getLocation() {
    if (!post.location || !post.location.address || !post.location.address.street) {
      return ''
    }

    const { street } = post.location.address;

    return street.length > 45 ? street.substr(0, 45) + '...' : street;
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
  div {
    font-size: 16px;
    margin: 2px 0 14px;
    color: #a2a2a2;
  }
  span {
    color: #727272;
  }
</style>

{#if location || dist}
  <div>
    <span>{dist} { dist && location && '|'}</span> {location}
  </div>
{/if}
