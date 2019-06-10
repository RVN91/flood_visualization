// Define projection
const projection_flood_extent_ecmwf = d3.geoMercator()
	.scale(500000)
	.center([9.923038, 57.032173]) // Center of the map
	//.translate([w / 2, h / 2]);;

// Converts lat / lon to pixel coordinates
const geoGenerator_ecmwf = d3.geoPath()
    .projection(projection_flood_extent_ecmwf)

const basemapSVG_flood_extent_ecmwf = svg_flood_extent_ecmwf.append("g")
  .classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

  // Bind data to svg
  basemapSVG_flood_extent_ecmwf
	.selectAll("path")
	.data(data.features)
	.enter()
	.append("path")
    .attr("d", geoGenerator_ecmwf)
	.attr("class", "state-boundary");
})

/* // Load and display radar

const floodQueuet_ecmwf = d3.queue()

floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_0.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_1.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_2.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_3.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_4.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_5.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_6.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_7.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_8.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_9.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_10.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_11.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_12.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_13.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_14.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_15.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_16.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_17.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_18.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_19.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_20.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_21.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_22.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_23.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_24.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_25.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_26.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_27.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_28.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_29.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_30.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_31.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_32.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_33.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_34.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_35.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_36.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_37.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_38.csv")
floodQueuet_ecmwf.defer(d3.csv, "genFlood/flood_39.csv")

floodQueuet_ecmwf.await(loadFloodecmwf)

function loadFloodecmwf(error) {
  if (error) {
    console.error("there was an error", error)
    return
  }

  const floodScansecmwf = Array.prototype.slice.call(arguments, 1);
  for (let index in floodScansecmwf) {
    drawFlood(floodScansecmwf[index], index);
  }
}

// Draw flood
function drawFlood(floodData, index) {
  const floodColorScale_extent_ecmwf = d3.scaleLinear()
    .domain([0, 0.1, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80])
    .range(["#FFFFFF", "#808080", "#ADD8E6", "#00FB90", "#00BB00", "#FFFF70", "#D0D060", "#FF6060", "#DA0000"])


  const canvas_flood_extent_ecmwf = svg_flood_extent_ecmwf.append("foreignObject")
	.attr("width", w)
    .attr("height", h)
	.attr("opacity", 0.3)
    .append('xhtml:canvas')
    .attr('id', 'canvas_flood_extent_ecmwf_viz_' + index)
    .attr("width", w)
    .attr("height", h)
    .style('display', 'none')
	
  const context_flood_extent_ecmwf = canvas_flood_extent_ecmwf.node().getContext("2d")
  const detachedContainer_flood_extent_ecmwf = document.createElement("custom");
  const dataContainer_flood_extent_ecmwf = d3.select(detachedContainer_flood_extent_ecmwf);

  const dataBinding_flood_extent_ecmwf = dataContainer_flood_extent_ecmwf.selectAll("custom.rect")
    .data(floodData, (d) => d)

  dataBinding_flood_extent_ecmwf.enter()
    .append("custom")
    .classed("rect", true)
	
  drawCanvas(dataContainer_flood_extent_ecmwf, context_flood_extent_ecmwf, floodColorScale_extent_ecmwf)
}

function drawCanvas(dataContainer_flood_extent_ecmwf, context_flood_extent_ecmwf, floodColorScale_extent_ecmwf) {
  const floodElements_extent_ecmwf = dataContainer_flood_extent_ecmwf.selectAll('custom.rect')

  floodElements_extent_ecmwf.each((d) => {
    const val = parseFloat(d.value)
    const lat = parseFloat(d.lat)
    const lon = parseFloat(d.lon)

    if (val === 0) { return }
    const coords = projection_flood_extent_ecmwf([lon, lat])

    context_flood_extent_ecmwf.beginPath()
    context_flood_extent_ecmwf.rect(coords[0], coords[1], 10, 10)
    context_flood_extent_ecmwf.fillStyle = floodColorScale_extent_ecmwf(val)
    context_flood_extent_ecmwf.fill()
    context_flood_extent_ecmwf.closePath()
  })
} */