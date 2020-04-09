<script>
  import { Media } from "@smui/card";
  export let item;
  export let lazy = false;

  let src = item;
  let observer = null;

  if (lazy) {
    src = "";
    observer = new IntersectionObserver(onIntersect, {rootMargin: '200px'});
  }

  function onIntersect(entries) {
    if (!src && entries[0].isIntersecting) {
      src = item;
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
  div {
    display: flex;
    flex-direction: column;
  }
</style>

<div use:lazyLoad>
  <Media
    style={src}
    aspectRatio="16x9" />
</div>