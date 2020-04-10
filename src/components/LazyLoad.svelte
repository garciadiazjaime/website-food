<script>
  import { Media } from '@smui/card';
  export let dataSrc;
  export let lazy;
  export let placeholder;

  let src = dataSrc;
  let observer = null;
  let className='';

  function onIntersect(entries) {
    if (src === placeholder && entries[0].isIntersecting) {
      const img = new Image();
      img.src = dataSrc;
      img.onload = () => {
        className = 'hide'
        setTimeout( function () {
          className = 'show'
          src = img.src;
        }, 500);
      };
    }
  }

  if (lazy) {
    src = placeholder;
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
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
    transition: opacity 0.5s ease-in;
  }
  .show {
    transition: opacity 0.5s ease-in;
    opacity: 1;
  }
</style>

<div use:lazyLoad class={className}>
  <Media style="background-image: url('{src}');" aspectRatio="16x9" />
</div>
