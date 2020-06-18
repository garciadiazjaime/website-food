<script>
  export let post = {};
  $: location = getLocation(post)
  $: dist = getDist(post)

  function getLocation() {
    if (!post.location || !post.location.address || !post.location.address.street) {
      return ''
    }
    let value = post.location.address.street;
    return value.length > 45 ? value.substr(0, 45) + '...' : value;
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
    margin-bottom: 14px;
    color: #a2a2a2;
  }
  span {
    color: #727272;
    display: inline-block;
  }
</style>

{#if location || dist}
  <div>
    <span>{dist} { dist && location && '|'}</span> {location}
  </div>
{/if}
