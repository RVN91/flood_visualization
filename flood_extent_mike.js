// Define projection
const projection_flood_extent = d3.geoMercator()
	.scale(500000)
	.center([9.923038, 57.032173]) // Center of the map
	//.translate([w / 2, h / 2]);;

// Converts lat / lon to pixel coordinates
const geoGenerator = d3.geoPath()
    .projection(projection_flood_extent)

const basemapSVG_flood_extent = svg_flood_extent.append("g")
  .classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

  // Bind data to svg
  basemapSVG_flood_extent
	.selectAll("path")
	.data(data.features)
	.enter()
	.append("path")
    .attr("d", geoGenerator)
	.attr("class", "state-boundary");
})

/* // Load and display radar

const floodQueue = d3.queue()

floodQueue.defer(d3.csv, "radar/radar201706160039.csv")
floodQueue.defer(d3.csv, "radar/radar201706160040.csv")
floodQueue.defer(d3.csv, "radar/radar201706160041.csv")
floodQueue.defer(d3.csv, "radar/radar201706160042.csv")
floodQueue.defer(d3.csv, "radar/radar201706160043.csv")
floodQueue.defer(d3.csv, "radar/radar201706160044.csv")
floodQueue.defer(d3.csv, "radar/radar201706160045.csv")
floodQueue.defer(d3.csv, "radar/radar201706160046.csv")
floodQueue.defer(d3.csv, "radar/radar201706160047.csv")
floodQueue.defer(d3.csv, "radar/radar201706160048.csv")
floodQueue.defer(d3.csv, "radar/radar201706160049.csv")
floodQueue.defer(d3.csv, "radar/radar201706160050.csv")
floodQueue.defer(d3.csv, "radar/radar201706160051.csv")
floodQueue.defer(d3.csv, "radar/radar201706160052.csv")
floodQueue.defer(d3.csv, "radar/radar201706160053.csv")
floodQueue.defer(d3.csv, "radar/radar201706160054.csv")
floodQueue.defer(d3.csv, "radar/radar201706160055.csv")
floodQueue.defer(d3.csv, "radar/radar201706160056.csv")
floodQueue.defer(d3.csv, "radar/radar201706160057.csv")
floodQueue.defer(d3.csv, "radar/radar201706160058.csv")
floodQueue.defer(d3.csv, "radar/radar201706160059.csv")
floodQueue.defer(d3.csv, "radar/radar201706160100.csv")
floodQueue.defer(d3.csv, "radar/radar201706160101.csv")
floodQueue.defer(d3.csv, "radar/radar201706160102.csv")
floodQueue.defer(d3.csv, "radar/radar201706160103.csv")
floodQueue.defer(d3.csv, "radar/radar201706160104.csv")
floodQueue.defer(d3.csv, "radar/radar201706160105.csv")
floodQueue.defer(d3.csv, "radar/radar201706160106.csv")
floodQueue.defer(d3.csv, "radar/radar201706160107.csv")
floodQueue.defer(d3.csv, "radar/radar201706160108.csv")
floodQueue.defer(d3.csv, "radar/radar201706160109.csv")
floodQueue.defer(d3.csv, "radar/radar201706160110.csv")
floodQueue.defer(d3.csv, "radar/radar201706160111.csv")
floodQueue.defer(d3.csv, "radar/radar201706160112.csv")
floodQueue.defer(d3.csv, "radar/radar201706160113.csv")
floodQueue.defer(d3.csv, "radar/radar201706160114.csv")
floodQueue.defer(d3.csv, "radar/radar201706160115.csv")
floodQueue.defer(d3.csv, "radar/radar201706160116.csv")
floodQueue.defer(d3.csv, "radar/radar201706160117.csv")
floodQueue.defer(d3.csv, "radar/radar201706160118.csv")

floodQueue.await(loadFlood)

function loadFlood(error) {
  if (error) {
    console.error("there was an error", error)
    return
  }

  const floodScans = Array.prototype.slice.call(arguments, 1);
  for (let index in floodScans) {
    drawFlood(floodScans[index], index);
  }
}

// Draw flood
function drawFlood(floodData, index) {
  const floodColorScale = d3.scaleLinear()
    .domain([0, 10, 20, 30, 40, 50, 60, 70, 80])
    .range(["#FFFFFF", "#808080", "#ADD8E6", "#00FB90", "#00BB00", "#FFFF70", "#D0D060", "#FF6060", "#DA0000"])


  const canvas_flood = svg_flood_extent.append("foreignObject")
	.attr("width", w)
    .attr("height", h)
	.attr("opacity", 0.3)
    .append('xhtml:canvas')
    .attr('id', 'canvas_flood_viz_' + index)
    .attr("width", w)
    .attr("height", h)
    .style('display', 'none')
	
  const context_flood = canvas_flood.node().getContext("2d")
  const detachedContainer_flood = document.createElement("custom");
  const dataContainer_flood = d3.select(detachedContainer_flood);

  const dataBinding_flood = dataContainer_flood.selectAll("custom.rect")
    .data(floodData, (d) => d)

  dataBinding_flood.enter()
    .append("custom")
    .classed("rect", true)
	
  drawCanvas(dataContainer_flood, context_flood, floodColorScale)
}

function drawCanvas(dataContainer_flood, context_flood, floodColorScale) {
  const floodElements = dataContainer_flood.selectAll('custom.rect')

  floodElements.each((d) => {
    const val = parseFloat(d.value)
    const lat = parseFloat(d.lat)
    const lon = parseFloat(d.lon)

    if (val === 0) { return }
    const coords = projection_flood_extent([lon, lat])

    context_flood.beginPath()
    context_flood.rect(coords[0], coords[1], 10, 10)
    context_flood.fillStyle = floodColorScale(val)
    context_flood.fill()
    context_flood.closePath()
  })
} */