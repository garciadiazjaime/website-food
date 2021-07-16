<script>
  export let username;
	export let title;
  export let imgSrc;
  
  let imgUrl = ''

  let observer = null

  if (process.browser) {
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!imgUrl && entries[0].isIntersecting) {
      imgUrl = imgSrc
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
    margin-bottom: 42px;
    display: flex;
  }

  @media (max-width: 800px) {
		.card {
			display: block;
		}

    h3 {
      margin-top: 12px;
    }
	}

  .card:hover {
    cursor: pointer;
  }

  h3 {
    font-weight: bold;
  }

  img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 400px;
    height: 400px;
  }

  .content {
    padding: 0 20px;
  }
</style>

<div class="card" on:click={cardClickHandler}>
  <div>
    <img src={imgUrl} use:lazyLoad alt="comida en tijuana">
  </div>

  <div class="content">
    <h3>{title}.</h3>
    <slot></slot>
  </div>
</div>
