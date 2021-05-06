<script>
  const account = {
    user: 'hamburguesastitos',
    address: '16 Blvd. De Las Americas, Buena Vista',
    tel: '(664) 878-1940',
    facebook: 'www.facebook.com/HamburguesasTitosTJ',
  }

  const dates = {
    published: '11 de Mayo del 2021',
    announcement: '26 de Abril del 2021'
  }
</script>
<style>
  .container {
    padding: 12px;
    max-width: 800px;
    margin: 0 auto;
    border: 1px dotted black;
  }

  .post {
    background-color: white;
    padding: 12px;
    width: 400px;
  }

  .aggreatment {
    height: 300px;
    border: 1px solid black;
    display: flex;
    text-align: center;
    padding: 12px;
  }

  .aggreatment span {
    text-decoration: underline;
  }

  .aggreatment div {
    flex: 1;
    align-self: flex-end;
  }

  .img-responsive {
    width: 100%;
    height: auto;
  }
</style>

<div class="container">

  <h1>Acuerdo para Rifa de $100 m.n.</h1>

  <h2>Datos del Cliente</h2>
  <p>
    Cuenta: <b>{account.user}</b>
    <br />
    Dirección: <b>{account.address}</b>
    <br />
    Teléfono: <b>{account.tel}</b>
    <br />
    Facebook: <b>{account.facebook}</b>
  </p>

  <h2>
    Compromisos del cliente:
  </h2>
  <ul>
    <li>Hacer válido el monto de $100 m.n. a la persona que resulte ganadora de la rifa.</li>
    <li>El monto se podrá utilizar como balance para la compra de cualquier producto que ofrezca el cliente.</li>
    <li>El monto se utilizará en una única transacción.</li>
    <li>El monto no generará saldo a favor, es decir no se dará cambio.</li>
    <li>El monto tendrá una vigencia de un mes después de la fecha del sorteo.</li>
  </ul>

  <h2>Rifa</h2>

  <p>
    El martes <b>{dates.published}</b>, la cuenta <b>@feedmetj</b> hará una publicación con el siguiente contenido:
  </p>

  <div class="post">
    <p>
      <img src="https://bxecreative.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg" alt="imagen dummy" class="img-responsive" />
    </p>
    <p>
      Participa en la rifa de un Gift Card de $100 m.n. cortesía de <b>@{account.user}</b>.
    </p>
    <p>
      Para participar solo debes darle like a esta publicación.
    </p>
    <p>
      Para más entradas: <br />
      - Etiqueta a un amigo <br />
      - Sigue a la cuenta: <b>@{account.user}</b> <br />
      - Sube este post a tus historias <br />
      - Etiqueta a más amigos <br />
    </p>

    <p>
      La cuenta ganadora se notificará el próximo lunes.
    </p>

    <p>
      Suerte 😎
    </p>
  </div>

  <br>

  <h2>Transacción</h2>

  <ul>
    <li>El usuario ganador tendrá un QR Code, el cual el cliente va escanear con la cámara de su teléfono.</li>
    <li>El QR abrirá una página de Internet en el teléfono del cliente con los datos del ganador.</li>
    <li>El cliente presionará el botón de "Aceptar", con lo cual quedará claro que el ganadaro ha usado su premio.</li>
  </ul>

  <p>
    * Ejemplo de QR Code: <br />
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" width="150px" alt="ejemplo de qr code" />
  </p>

  <br />
  <h2>Acuerdo</h2>
  <div class="aggreatment">
    <div>
        De acuerdo <br /><br /><br /><br /><br />
        <span>Equipo de Feedmetj</span>
    </div>
    <div>
      <span><b>@{account.user}</b></span>
    </div>
  </div>

</div>
