<script>
	export let phoneNumber;
</script>

<style>
	a {
    display: inline-block;
    padding: 5px 0;
    width: 50%;
    text-decoration: none;
    text-align: center;
  }
</style>

<a href={`tel:${phoneNumber}`}>
  📞 {phoneNumber}
</a>
