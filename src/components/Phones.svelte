<script>
  import { getPhoneNumber } from '../utils/brandUtil';
  export let phones;
</script>

<style>
  .phone-grid {
		display: grid;
    grid-column-gap: 6%;
    grid-row-gap: 10px;
		grid-template-columns: repeat( auto-fit, 47% );
    margin: 14px 0 0;
	}
	a {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
    background-color: #ff5926;
    color: rgba(255, 255, 255, .95);
    display: inline-block;
    padding: 11px 0;
    width: 100%;
    text-decoration: none;
    text-align: center;
    font-size: 15px;
    line-height: 1;
    font-weight: 400;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);
  }
  a:hover {
    color: #fff;
  }
</style>
{#if phones}
  <div class="phone-grid">
    {#each phones as phone}
      <a href={`tel:${phone}`} variant="raised">{getPhoneNumber(phone)}</a>
    {/each}
  </div>
{/if}
