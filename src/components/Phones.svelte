<script>
	export let phones;
</script>

<style>
  .phone-grid {
		display: grid;
		grid-column-gap: 5px;
		grid-template-columns: repeat( auto-fit, 105px );
    margin: 6px 0 8px;
	}
	a {
    background-color: #ff5926;
    color: rgba(255, 255, 255, .95);
    display: inline-block;
    padding: 8px 0;
    width: 100%;
    text-decoration: none;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);
  }
  a:hover {
    color: #fff;
  }
</style>
{#if phones}
  <div class="phone-grid">
    {#each phones as phone}
      <a href={`tel:${phone}`}>
        {phone}
      </a>
    {/each}
  </div>
{/if}
