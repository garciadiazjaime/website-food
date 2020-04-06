<script>
  import Button, {Label} from '@smui/button';
  import IconButton, {Icon} from '@smui/icon-button';
	export let phoneNumber;
</script>

<style>
	a {
    display: inline-block;
    padding: 8px 0;
    width: 100%;
    text-decoration: none;
    text-align: center;
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    border-radius: 11px;
    color: white;
    background-color: rgba(255,62,0, .8);
    margin-bottom: 10px;
  }
  a:hover {
    background-color: rgb(255,62,0);
  }
</style>

<a href={`tel:${phoneNumber}`}>
  {phoneNumber}
</a>
