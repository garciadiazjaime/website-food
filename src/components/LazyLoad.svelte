<script>
  import { onMount } from "svelte";
  import { Media } from '@smui/card';
  export let dataSrc;
  export let lazy;

  const placeholder = 'loading.gif';
  let src = dataSrc;
  let observer = null;
  let className = '';
  let mounted = false

  const img = new Image();
  img.onload = () => {
    className = 'hide'
    setTimeout(() => {
      className = 'show'
      src = img.src;
    }, 300);
  };

  onMount(async () => {
		mounted = true
	});

  function refreshImage() {
    if (mounted) {
      img.src = dataSrc;
    }
  }

  function onIntersect(entries) {
    if (src === placeholder && entries[0].isIntersecting) {
      refreshImage()
    }
  }

  if (lazy) {
    src = placeholder;
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  $: {
    dataSrc; refreshImage()
  }

  function lazyLoad(node) {
    if (observer) {
      observer.observe(node);

      return {
        destroy() {
          observer.unobserve(node)
        }
      }
    }
  }
</script>
<style>
  div {
    display: flex;
    flex-direction: column;
  }
  .hide {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
  .show {
    transition: opacity 0.3s ease-in;
    opacity: 1;
  }
</style>

<div use:lazyLoad class={className}>
  <Media style="background-image: url('{src}');" aspectRatio="16x9" />
</div>
