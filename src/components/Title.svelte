<script>
  export let title;
</script>

<style>
  .title {
    line-height: 1;
    color: #2A2F33;
    font-size: 22px;
    font-weight: 600;
    margin: 12px 0 6px;
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

<div class="title">{title}</div>

