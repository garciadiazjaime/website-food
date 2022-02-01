<script>
  import Lazy from 'svelte-lazy';
</script>

<style>
  img {
		width: 100%;
		height: auto;
	}
  .cover {
    height: 727px;
    background-color: rgb(188, 241, 175);
    color: white;
    font-size: 2.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

<div class="cover">
  <div>
    Citrón
  </div>
</div>

<h2>Delicioso Pan Francés en Tijuana</h2>

<Lazy height={300}>
  <img src="/que-comer-en-tijuana/citron.mx/pan-frances.webp" 
    alt="pan frances tijuana" 
    width="750"
    height="938"
  />
</Lazy>

<p>
  Citrón es un café que se encuentra en avenida Alba Roja.
</p>
<p>
  El lugar se distingue por su toque artístico, cada detalle importa, y esto se puede apreciar tanto en su atmósfera como en su cocina.
</p>
<p>
  Cuentan con estacionamiento y no es necesario reservación.
</p>
<p>
  <a href="https://www.instagram.com/citron.mx/" target="_blank" rel="nofollow noreferrer">@citron.mx</a>
</p>
