<script>
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
    color: rgb(255,62,0);;
    background-color: white;
    margin-bottom: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
  }
  a:hover {
    background-color: rgb(255,62,0);
  }
</style>

<a href={`tel:${phoneNumber}`}>
  {phoneNumber}
</a>
