<script>
  import { getPhoneNumber } from '../utils/brandUtil';
  export let phones;
</script>

<style>
  a {
    background-color: white;
    border: 1px solid #ff5926;
    color: #ff5926;
    font-size: 12px;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
    padding: 4px 0;
    text-decoration: none;
    text-align: center;
    line-height: 1;
    font-weight: 400;
  }
	a.cta {
    background-color: #ff5926;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    color: rgba(255, 255, 255, .95);
    padding: 11px 0;
    display: inline-block;
    width: 80%;
    display: block;
    font-size: 15px;
    border-radius: 4px;
  }
  a:first-child:hover {
    color: #fff;
  }
</style>
{#if phones}
  <div class="phone-grid">
    {#each phones as phone, index}
      {#if index === 0}
        <a class="cta" href={`tel:${phone}`}>{getPhoneNumber(phone)}</a>
      {/if}
      {:else}
       <a href={`tel:${phone}`}>{getPhoneNumber(phone)}</a>
    {/each}
  </div>
{/if}
