<script>
  export let id;
  export let username;
	export let title;
  export let category;

  let imgUrl = ''

  let observer = null

  if (process.browser) {
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!imgUrl && entries[0].isIntersecting) {
      imgUrl = `/que-comer-en-tijuana/${username}-${id}.jpg`
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

  function cardClickHandler() {
    window.open(`https://www.instagram.com/${username}/`, '_blank')
  }
</script>

<style>
  .card {
    box-shadow: 1px 1px 2px 2px #8C8C9C;
    width: 100%;
  }

  .card:hover {
    cursor: pointer;
  }

  h3 {
    margin: 0;
    padding: 0 6px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;
  }

  img {
    height: auto;
    width: 100%;
    object-fit: cover;
  }
</style>

<div class="card" data-id={id} on:click={cardClickHandler}>
  <img src={imgUrl} alt={`que comer en tijuana: ${category}`} title={`que comer en tijuana: ${category}`} width="640px" height="640px" use:lazyLoad />
  <h3>{title || username}</h3>
</div>
