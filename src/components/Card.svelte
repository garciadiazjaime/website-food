<script>
  export let username;
	export let title;
  export let imgSrc;
  export let category;
  
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
</script>

<style>
  .card {
    margin-bottom: 48px;
    display: flex;
  }

  @media (max-width: 800px) {
		.card {
			display: block;
		}

    h2 {
      margin-top: 12px;
    }
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

  a {
    border: 1px solid black;
    padding: 12px 24px;
    text-decoration: none;
  }
</style>

<div class="card" >
  <div>
    <img src={imgUrl} use:lazyLoad alt="Dónde comer {category} en Tijuana?">
  </div>

  <div class="content">
    <h2>{title}</h2>
    <slot></slot>
    <br />
    <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="nofollow">@{username}</a>
  </div>
</div>
