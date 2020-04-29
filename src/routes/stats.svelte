<script>
	import { onMount } from "svelte";

	import { getPosts } from '../utils/mintAPIUtil'

  let posts;
  let statsByDay

  onMount(async () => {
    posts = await getPosts();
    statsByDay = getStatsByDay(posts)
  });
  
  function getDate(value) {
    const date = new Date(parseInt(value)).toJSON()

    return `${date.substr(5,11)}`
  }

  function getCoordinates(post) {
    const { location } = post
    if (!location.latitude || !location.longitude) {
      return ''
    }

    return `${location.latitude}, ${location.longitude}`
  }

  function getStatsByDay(data) {
    const users = {}

    const statsByDay = data.reduce((accu, post) => {
      const date = new Date(parseInt(post.createdAt))
      const day = date.getDate()

      if (!accu[day]) {
        accu[day] = {
          users: 0,
          address: 0,
          coordinates: 0,
          options: 0,
          phones: 0
        }
      }

      const user = post.user.username
      if (!users[user]) {
        users[user] = true
        accu[day].users += 1
      }

      const { location } = post
      if (location && location.address && location.address.street) {
        accu[day].address += 1
      }

      if (location && location.latitude && location.longitude) {
        accu[day].coordinates += 1
      }

      const { options, phones } = post.meta
      if (Array.isArray(options) && options.length ) {
        accu[day].options += 1
      }

      if (Array.isArray(phones) && phones.length ) {
        accu[day].phones += 1
      }

      return accu
    }, {})

    return statsByDay
  }
</script>

<style>
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
</style>

<div>
  {#if posts}
    <table>
      <tr>
        <th>Day</th>
        <th># Users</th>
        <th># Address</th>
        <th># Coordinates</th>
        <th># Options</th>
        <th># Phones</th>
      </tr>
      {#each Object.keys(statsByDay) as day}
        <tr>
          <td>{day}</td>
          <td>{statsByDay[day].users}</td>
          <td>{statsByDay[day].address}</td>
          <td>{statsByDay[day].coordinates}</td>
          <td>{statsByDay[day].options}</td>
          <td>{statsByDay[day].phones}</td>
        </tr>
      {/each}
    </table>

    <br />

    <table>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Address</th>
        <th>Coordinates</th>
        <th>Options</th>
        <th>Phones</th>
        <th>Rank</th>
        <th>Created</th>
        <th>Updated</th>
      </tr>
      {#each posts as post, index}
        <tr data-id={post._id}>
          <td>{index + 1}</td>
          <td>{post.user.fullName}</td>
          <td>{post.location && post.location.address && post.location.address.street || ''}</td>
          <td>{getCoordinates(post)}</td>
          <td>{post.meta.options}</td>
          <td>{post.meta.phones}</td>
          <td>{post.meta.rank}</td>
          <td>{getDate(post.createdAt)}</td>
          <td>{post.updatedAt === post.createdAt ? 0 : 1}</td>
        </tr>
      {/each}
    </table>
  {/if}
</div>
