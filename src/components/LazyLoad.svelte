<script>
  import { Media } from "@smui/card";
  export let dataSrc;
  export let lazy;

  let src = dataSrc;
  let observer = null;

  function onIntersect(entries) {
    if (!src && entries[0].isIntersecting) {
      src = dataSrc;
    }
  }

  if (lazy) {
    src = "";
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
</style>

<div use:lazyLoad>
  <Media style="background-image: url('{src}');" aspectRatio="16x9" />
</div>
