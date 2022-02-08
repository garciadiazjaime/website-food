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
    background-color: rgb(228, 9, 9);
    color: white;
    font-size: 2.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .cover span {
    color:#333;
  }
</style>

<div class="cover">
  <div>
    Tacos <br /> <span>Tijuana</span>
  </div>
</div>

<h2>Tijuana se escribe con T de Tacos</h2>

<p>
  Sin duda los mejores tacos los encuentras en Tijuana.
</p>
<p>
  Aquí te dejamos 3 opciones deliciosas para comer Tacos en Tijuana:
</p>
<ul>
  <li><a href="https://www.instagram.com/tacosdelkoshy/" target="_blank" rel="nofollow noreferrer">Tacos Del Koshy</a></li>
  <li><a href="https://www.instagram.com/tacoselfranc/" target="_blank" rel="nofollow noreferrer">Tacos El Franc</a></li>
  <li><a href="https://www.instagram.com/taco.nazo/" target="_blank" rel="nofollow noreferrer">Taconazo</a></li>
</ul>
<p>
  Al Pastor o Carne Asada no hay falla.
</p>

<Lazy height={300}>
  <img src="/que-comer-en-tijuana/tacos/tacos-koshy.webp" 
    alt="tacos del koshy tijuana" 
    width="750"
    height="938"
  />
</Lazy>
