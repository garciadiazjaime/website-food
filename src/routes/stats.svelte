<script>
  import { onMount } from "svelte";
  
  import Line from '../components/graphs/line.svelte'
  import Bars from '../components/graphs/bars.svelte'
	import { getPosts } from '../utils/mintAPIUtil'

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

  onMount(async () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);

    posts = await getPosts({ first: 500, since: date.toJSON() });
  });
  
  function getDate(value) {
    const date = new Date(parseInt(value))

    return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', day: '2-digit', month: '2-digit' });
  }

  function getStatsByDay(posts) {
    if (!Array.isArray(posts) || !posts.length) {
      return []
    }

    const users = {}

    const data = posts.reduce((accu, post) => {
      const date = new Date(parseInt(post.createdAt))
      const day = date.getDate()

      if (!accu.byDay[day]) {
        accu.byDay[day] = {
          date: new Date(date.toDateString()),
          posts: 0,
          users: 0,
        }
      }
      accu.byDay[day].posts += 1
      accu.summary.posts.value += 1

      const user = post.user.username
      if (!users[user]) {
        users[user] = true
        accu.byDay[day].users += 1
      }

      const { location } = post
      if (location && location.address && location.address.street) {
        accu.summary.address.value += 1
      }

      const { options, phones } = post.meta
      if (Array.isArray(options) && options.length ) {
        accu.summary.options.value += 1
      }

      if (Array.isArray(phones) && phones.length ) {
        accu.summary.phones.value += 1
      }

      return accu
    }, {
      byDay: {},
      summary: {
        posts: {
          value: 0,
          label: 'Posts'
        },
        address: {
          value: 0,
          label: 'Dirección'
        },
        options: {
          value: 0,
          label: 'Opciones'
        },
        phones: {
          value: 0,
          label: 'Teléfono'
        },
      }
    })

    const byDay = []
    for(let day in data.byDay) {
      byDay.push({...data.byDay[day]})
    }
    byDay.sort((a, b) => a.date - b.date)

    const summary = Object.keys(data.summary)
        .map(key => data.summary[key])
        .sort((a, b) => b.value - a.value)

    return {
      byDay,
      summary
    }
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

<div class="container">
  <h2>Posts vs Usuarios <small>(que postearon)</small> de los últimos 7 días.</h2>

  <Line data={stats.byDay} props={lineProps} />

  <hr />

  <h2>Posts vs Propiedades <small>(encontradas)</small> de los últimos 7 días.</h2>

  <Bars data={stats.summary} />

  <span>Nota: <b>Posts</b> siempre será la columan más alta. Las demás columnas muestran en cuántos post se encuentró dicha propiedad.</span>

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
          <th>Opciones</th>
          <th>Teléfonos</th>
          <th>Puntos</th>
          <th>Fecha</th>
        </tr>
        {#each posts as post, index}
          <tr data-id={post._id}>
            <td>{index + 1}</td>
            <td>{post.user.fullName}</td>
            <td>{@html post.location && post.location.address && post.location.address.street && '&#x2713;' || ''}</td>
            <td>{@html post.meta.options && post.meta.options.length && '&#x2713;' || ''}</td>
            <td>{@html post.meta.phones && post.meta.phones.length && '&#x2713;' || ''}</td>
            <td>{post.meta.rank}</td>
            <td>{getDate(post.createdAt)}</td>
          </tr>
        {/each}
      </table>
    {/if}
  </div>
</div>  
