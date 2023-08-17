<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<Nav {segment} />
<main>
  <slot />
</main>

<footer>
  <br />

  <div>
    Síguenos en
    <ul>
      <li>
        <a
          href="https://www.instagram.com/feedmetijuana/"
          target="_blank"
          title="Restaurantes en Tijuana">Instagram</a
        >
      </li>
      <li>
        <a
          href="https://www.facebook.com/Feedmetj-104064654962934"
          target="_blank"
          title="Restaurantes en Tijuana">Facebook</a
        >
      </li>
    </ul>
  </div>

  <br />

  <div>
    <p>Proyecto en Colaboración con:</p>
    <div>
      <ul>
        <li>
          <a href="https://www.garitacenter.com/">Reporte de Garitas Tijuana</a>
        </li>
        <li>
          <a href="https://www.playami.com/"
            >Restaurantes en Playas de Tijuana</a
          >
        </li>
        <li>
          <a href="https://coupons.garitacenter.com/"
            >Papa Johns Coupons and Promo Codes</a
          >
        </li>
        <li>
          <a href="https://www.larutadelvinoensenada.com/"
            >La Ruta del Vino Ensenada</a
          >
        </li>
        <li>
          <a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
        </li>
      </ul>
    </div>
  </div>
</footer>

<style>
  main,
  footer {
    max-width: 56em;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    font-size: 1.2em;
  }
  ul {
    padding: 0;
    list-style-type: none;
  }

  @media (max-width: 56em) {
    footer {
      padding: 12px;
    }
  }
</style>
