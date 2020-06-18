<script>
	import { getTitle } from '../utils/postUtil'
  export let post;
</script>

<style>
  .title {
    line-height: 1;
    font-size: 22px;
    font-weight: 600;
    margin: 12px 0 0;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (min-width: 450px) {
		.title {
			font-size: 20px;
		}
	}
</style>

<div class="title">{getTitle(post)}</div>

