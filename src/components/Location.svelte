<script>
  export let brand;
  import { getTitle } from '../utils/brandUtil'
</script>

<style>
  .title {
    line-height: 1.2;
    margin: 8px 0 14px;
    font-size: 22px;
    font-weight: 600;
  }
</style>

<div class="title">{getTitle(brand)}</div>

