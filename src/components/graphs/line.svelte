<script>
  export let data
  export let props

  $: updateChart(data)

  let el;

  function updateChart(data) {
    if (!Array.isArray(data) || !data.length) {
      return null
    }

    var width = 600
    var height = 400

    var svg = d3.select(el)
      .append("svg")
        .attr("viewBox", `0 0 ${width + 50} ${height + 40}`)
      .append("g")
        .attr("transform", "translate(30, 0)");

    var x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date ))
      .range([ 0, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3
        .axisBottom(x)
        .ticks(data.length)
        .tickFormat(d3.timeFormat("%m/%d"))
      );

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[props[0].prop] )])
      .range([ height, 0 ]);

    svg.append("g")
      .call(d3.axisLeft(y));

    props.forEach(prop => 
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", prop.color)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x((d) => x(d.date))
          .y((d) => y(d[prop.prop]))
        )
    )

  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 12px 0 0;
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
  }

  .props > * {
    flex: 1;
    color: white;
    padding: 6px;
    text-align: center;
  }
</style>

<div class="container">
  <div bind:this={el} class="chart"></div>

  <div class="props">
    {#each props as prop}
      <span style={`background-color: ${prop.color}`}>{prop.label}</span>
    {/each}
  </div>

</div>  
