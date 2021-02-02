<script>
  export let id;
  export let username;
	export let title;
	export let mediaUrl;
  export let address;
  export let keywords;
  export let gps;

  let imgUrl = ''

  let observer = null

  if (process.browser) {
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!imgUrl && entries[0].isIntersecting) {
      imgUrl = mediaUrl
    }
  }


  function lazyLoad(node) {
    observer && observer.observe(node);
    return {
      destroy() {
        observer && observer.unobserve(node)
      }
    }
  }
</script>

<style>
  .card {
    padding: 6px 0;
    box-shadow: 2px 2px 6px 6px #c8c8c8;
    width: 100%;
  }

  h3 {
    margin: 0;
    padding: 0 6px 12px;
  }

  img {
    height: 180px;
    min-height: 180px;
    width: 100%;
    object-fit: cover;
  }

  .keywords {
    padding: 0 6px;
  }

  strong {
    font-weight: normal;
    display: inline-block;
  }

  strong::after {
    content: '|';
    display: inline-block;
    padding: 0 6px;
  }

  strong:last-of-type::after {
    content: '';
  }

  a {
    text-decoration: none;
  }
</style>

<div class="card" data-id={id}>
  <h3><a href={`https://www.instagram.com/${username}/`} target="_blank" rel="nofollow noreferrer" title={title || username}>{title || username}</a></h3>

  <img src={imgUrl} alt={`${title}: ${keywords.join(' ')}`} use:lazyLoad />

  <p>
    {#if gps && gps.length }
      <a href={`https://www.google.com/maps/place/${gps[1]},${gps[0]}`} title={title} target="_blank" rel="nofollow noreferrer">{address}</a>
    {:else}
      {address || ''}
    {/if}
  </p>

  <div class="keywords">
    {#each keywords as keyword}
      <strong>{keyword}</strong>
    {/each}
  </div>
</div>
