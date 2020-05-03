<script>
  export let post = [];
  export let text = '';
  let whatsapp =''; 
  const caption = post.caption.toUpperCase();
  const re = /(WHATSAPP|WHATS\sAPP)/;

  if (re.test(caption)) {
    const matches = re.exec(caption);
    const substr = caption.slice(matches.index);
    const onlyNumbers = substr.replace(/\D/g, '-').replace(/--/g, '-');
    const numberArray = onlyNumbers.match(/(\d{1,2}-)?(\d{3}-)?\d{3}-\d{4,7}|(\d{3}-)\d{2}-\d{2}|\d{7,10}/g);
    if(numberArray) {
      whatsapp = numberArray[0];
      whatsapp = '52' + whatsapp.replace(/-/g, '');
      console.log(whatsapp);
    }
  }
</script>
<style>
  .icon {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 12px;
    right: 14px;
  }
  .whatsapp-btn {

  }
  @media (min-width: 768px) {
    .whatsapp-btn {
      display: none;
    }
  }
</style>
{#if whatsapp}
  <a class="whatsapp-btn" href={`https://wa.me/${whatsapp}${text ? `text=${text}` : '' }`} title="Send whatsapp message" target="_blank">
    <img class="icon" src="/whatsapp.svg" alt="Send Whatsapp message" aria-hidden />
  </a>
{/if}