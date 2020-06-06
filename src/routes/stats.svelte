<script>
  import { onMount } from "svelte";

	import { getPosts } from '../utils/mintAPIUtil'

  let posts;
  let statsByDay = []

  let el;
  
  const props = [
      ['posts', '#173F5F'],
      ['users', '#20639B'],
      ['address', '#3CAEA3'],
      ['coordinates', '#F6D55C'],
      ['options', '#ED553B'],
      ['phones', '#888']
    ]

  onMount(async () => {
    posts = await getPosts(null, 500);
    const data = getStatsByDay(posts)

    for(let day in data) {
      statsByDay.push({...data[day]})
    }
    statsByDay.sort((a, b) => b.rawDate - a.rawDate)

    var margin = {top: 0, right: 30, bottom: 0, left: 20}
    var width = 440
    var height = 400

    var svg = d3.select(el)
      .append("svg")
        .attr("viewBox", `0 0 ${width + 20} ${height + 20}`)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
      .domain(d3.extent(statsByDay, d => d.rawDate ))
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(statsByDay, d => d.posts )])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    props.forEach(prop => {

      // Add the line 
      svg.append("path")
        .datum(statsByDay)
        .attr("fill", "none")
        .attr("stroke", prop[1])
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.rawDate) })
          .y(function(d) { return y(d[prop[0]]) })
          )
    })

  });
  
  function getDate(value) {
    const date = new Date(parseInt(value))

    return date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', day: '2-digit', month: '2-digit' });
  }

  function getCoordinates(post) {
    const { location } = post
    if (!location || !location.location || !location.location.coordinates || !Array.isArray(location.location.coordinates)) {
      return ''
    }

    return '&#x2713;'
  }

  function getStatsByDay(posts) {
    const users = {}

    const statsByDay = posts.reduce((accu, post) => {
      const date = new Date(parseInt(post.createdAt))
      const day = date.getDate()

      if (!accu[day]) {
        accu[day] = {
          rawDate: date,
          posts: 0,
          users: 0,
          address: 0,
          coordinates: 0,
          options: 0,
          phones: 0
        }
      }
      accu[day].date = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', day: '2-digit' });
      accu[day].posts += 1

      const user = post.user.username
      if (!users[user]) {
        users[user] = true
        accu[day].users += 1
      }

      const { location } = post
      if (location && location.address && location.address.street) {
        accu[day].address += 1
      }

      if (getCoordinates(post)) {
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

  .chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}

  .props {
    display: flex;
    width: 100%;
    text-align: center;
    color: white;
    font-weight: bold;
    text-transform: capitalize;
  }
  .props span {
    flex: 1;
    padding: 6px;
    margin: 6px;
  }

  .props :last-child {
    margin-right: 0
  }

  @media (max-width: 800px) {
    .props {
      font-size: 14px;
    }
		.props span{
			padding: 0;
      margin: 0;
		}
	}
</style>

<div class="container">
  <div bind:this={el} class="chart"></div>

  <div class="props">
    {#each props as prop}
      <span style={`background-color: ${prop[1]}`}>{prop[0]}</span>
    {/each}
  </div>

  <div class="table">
    {#if posts}
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
        </tr>
        {#each posts as post, index}
          <tr data-id={post._id}>
            <td>{index + 1}</td>
            <td>{post.user.fullName}</td>
            <td>{@html post.location && post.location.address && post.location.address.street && '&#x2713;' || ''}</td>
            <td>{@html getCoordinates(post)}</td>
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
