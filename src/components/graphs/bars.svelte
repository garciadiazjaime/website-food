<script>
  export let data

  $: updateChart(data)

  const colors = ['#173F5F', '#3CAEA3']
  let el;

  function updateChart(data) {
    if (!Array.isArray(data) || !data.length) {
      return null
    }

    var width = 600
    var height = 400

    var svg = d3.select(el)
      .append("svg")
        .attr("viewBox", `0 0 ${width + 50} ${height + 130}`)
      .append("g")
        .attr("transform", "translate(30, 10)")

    var xScale = d3.scaleBand()
      .range([ 0, width])
      .padding(0.1)
      .domain(data.map(d => d.label))

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

    var yScale = d3.scaleLinear()
      .range([ height, 0 ])
      .domain([0, d3.max(data, d => d.value )])

    svg.append("g")
      .call(d3.axisLeft(yScale))

    svg.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr("fill", (d, i) => i === 0 ? colors[0] : colors[1])
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value))
      .attr('width', xScale.bandwidth())

  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 12px 0;
  }

  .chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>

<div class="container">
  <div bind:this={el} class="chart"></div>
</div>  
