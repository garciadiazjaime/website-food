<script>
	import { getTitle } from '../utils/postUtil'
  export let post;
</script>

<style>
  .title {
    line-height: 1.2;
    margin: 0 0 24px;
    font-size: 22px;
    font-weight: 600;
    padding: 8px 12px;
    text-align: center;
    border-radius: 0 0 4px 4px;
    background-color: #efefef;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (min-width: 450px) {
		.title {
			font-size: 18px;
		}
	}
</style>

<div class="title">{getTitle(post)}</div>

