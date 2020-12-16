<script>
  import { onMount } from "svelte";
  
  import Line from '../components/graphs/line.svelte'
  import Bars from '../components/graphs/bars.svelte'
  import { getPosts } from '../utils/mintAPIUtil'
  import { getStatsByDay, getHashtags, getOptions } from '../utils/stats'

  let posts = [];
  let el;
  const lineProps = [{
    label: 'Posts',
    prop: 'posts',
    color: '#173F5F'
  }, {
    label: 'Usuarios',
    prop: 'users',
    color: '#3CAEA3'
  }]

  $: stats = getStatsByDay(posts)
  $: hashtags = getHashtags(posts)
  $: options = getOptions(posts)

  onMount(async () => {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    since.setHours(0,0,0,0)

    const to = new Date();
    to.setDate(to.getDate() - 1);
    to.setHours(23,59,59,999)

    posts = await getPosts({ first: 1000, since: since.toJSON(), to: to.toJSON() });
  });
  
  function getDate(value) {
    const date = new Date(parseInt(value))

    return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', day: '2-digit', month: '2-digit' });
  }

  
</script>

<style>
  .table {
    overflow-x: auto;
  }

	table {
		width: 100%;
    border-collapse: collapse;
	}

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th, td {
    border-bottom: 1px solid;
    text-align: center;
    padding: 6px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  hr {
    margin: 40px 0;
  }
</style>

<svelte:head>
  <script defer src="https://d3js.org/d3.v5.min.js"></script>
</svelte:head>

<div class="container">
  <h2>Relación Posts - Usuarios <small>(que postearon)</small> de los últimos 7 días.</h2>
  <Line data={stats.byDay} props={lineProps} />

  <hr />
  <h2>Relación Posts - Propiedades <small>(del post)</small> de los últimos 7 días.</h2>
  <Bars data={stats.summary} />

  <hr />
  <h2>Top 10 de Hashtags de los últimos 7 días</h2>
  <Bars data={hashtags} />

  <span>Nota: <b>Posts</b> siempre será la columan más alta. Las demás columnas muestran en cuántos post se encuentró dicha propiedad.</span>

  <hr />
  <h2>Opciones más usadas en los últimos 7 días <small>(*con más de 10 apariciones)</small></h2>
  <Bars data={options} />

  <hr />
  <h2>Listado de Posts de los últimos 7 días, ordenados por puntos.</h2>
  <div class="table">
    {#if posts}
      <br />
      <table>
        <tr>
          <th>#</th>
          <th>Usuarios</th>
          <th>Dirección</th>
          <th>Teléfonos</th>
          <th>Opciones</th>
          <th>Puntos</th>
          <th>Fecha</th>
        </tr>
        {#each posts as post, index}
          <tr data-id={post._id}>
            <td>{index + 1}</td>
            <td>{post.user.fullName || post.user.username}</td>
            <td>{@html post.location && post.location.address && post.location.address.street && '&#x2713;' || ''}</td>
            <td>{@html post.meta.phones && post.meta.phones.length && '&#x2713;' || ''}</td>
            <td>{@html post.meta.options && post.meta.options.length && '&#x2713;' || ''}</td>
            <td>{post.meta.rank}</td>
            <td>{getDate(post.createdAt)}</td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
</div>  
