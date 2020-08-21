<script>
  import { onMount } from "svelte";
  import { Media } from '@smui/card';
  import { instagramPostImageMutation } from '../utils/mintAPIUtil'

  export let dataSrc;
  export let lazy;

  const placeholder = 'loading.gif';
  let src = dataSrc;
  let observer = null;
  let className = '';
  let mounted = false
  let element = null

  const img = new Image();
  img.onload = () => {
    className = 'hide'
    setTimeout(() => {
      className = 'show'
      src = img.src;
    }, 200);
  };

  img.onerror = () => {
    className = 'hide'
    setTimeout(() => {
      className = 'show'
      src = 'error_img.svg';
    }, 200);

    instagramPostImageMutation(dataSrc)
  }

  onMount(() => {
    mounted = true
  });

  function isInViewport (elem) {
    var bounding = elem.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function refreshImage() {
    if (mounted) {
      if (lazy && !isInViewport(element)) {
        src = placeholder
      } else {
        img.src = dataSrc;
      }
    }
  }

  function onIntersect(entries) {
    if (src === placeholder && entries[0].isIntersecting) {
      img.src = dataSrc;
    }
  }

  if (lazy) {
    src = placeholder;
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  $: imageWatcher = refreshImage(dataSrc)

  function lazyLoad(node) {
    element = node

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
    background-color: black;
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
