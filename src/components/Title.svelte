<script>
	import { getTitle } from '../utils/postUtil'
  export let post;
  const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana'];
</script>

<style>
  .title {
    line-height: 1.2;
    margin: 0 0 24px;
    font-size: 22px;
    font-weight: 600;
    padding: 8px 0;
    text-align: center;
    border-radius: 0 0 4px 4px;
    background-color: #efefef;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>

<div class="title">{getTitle(post)}</div>

