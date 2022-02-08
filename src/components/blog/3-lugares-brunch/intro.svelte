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
    background-color: rgb(240, 204, 88);
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
    Brunch <br /> <span>Tijuana</span>
  </div>
</div>
<h2>3 lugares para hacer Brunch en Tijuana</h2>

<p>
  La palabra Brunch viene de las palabras anglosajonas breakfast (desayuno) y lunch (almuerzo).
<p>
  Lo cual queda perfecto para el día posterior a la fiesta o simplemente para aquellos días que 
  preferimos despertar más tarde.
</p>
<p>
  Tijuana como buena ciudad fronteriza, cuenta con excelentes opciones para "brunchear". Aquí te dejamos 3 Restaurantes:
</p>

<p>
  1. Restaurante Cielo
</p>
<p>
  Qué comer?
  <br />
  Churro Waffles y Huevos Rancheros
</p>
<p>
  <Lazy height={300}>
    <img src="/que-comer-en-tijuana/cielo.restaurante/churro-waffle-huevos-rancheros.webp" 
      alt="Churro Waffles y Huevos Rancheros" 
      width="750"
      height="938"
    />
  </Lazy>
</p>
<p>
  <a href="https://www.instagram.com/cielo.restaurante/" target="_blank" rel="nofollow noreferrer">@cielo.restaurante</a>
</p>

<p>
  2. Folklor Café
</p>
<p>
  Qué comer?
  <br />
  Huevos, Frijoles y Chilaquiles.
</p>
<p>
  <Lazy height={300}>
    <img src="/que-comer-en-tijuana/folklorcafe/desayuno.webp" 
      alt="Desayuno Folklor Café" 
      width="750"
      height="938"
    />
  </Lazy>
</p>
<p>
  <a href="https://www.instagram.com/folklorcafe/" target="_blank" rel="nofollow noreferrer">@folklorcafe</a>
</p>

<p>
  3. Restaurante Buna
</p>
<p>
  Qué comer?
  <br />
  Omelette de la Casa con Chilaquiles
</p>
<p>
  <Lazy height={300}>
    <img src="/que-comer-en-tijuana/buna/omelette-chilaquiles.webp" 
      alt="Omelette y Chilaquiles" 
      width="750"
      height="938"
    />
  </Lazy>
</p>
<p>
  <a href="https://www.instagram.com/bunatjmx/" target="_blank" rel="nofollow noreferrer">@bunatjmx</a>
</p>
