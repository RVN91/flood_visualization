// Define projection
const projection_radar = d3.geoMercator()
	.scale(500000)
	.center([9.923038, 57.032173]) // Center of the map
	//.translate([w / 2, h / 2]);;

// Converts lat / lon to pixel coordinates
const geoGenerator_radar = d3.geoPath()
	.projection(projection_radar)

const basemapSVG_radar = svg_radar.append("g")
	.classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

	// Bind data to svg
	basemapSVG_radar
		.selectAll("path")
		.data(data.features)
		.enter()
			.append("path")
			.attr("d", geoGenerator)
			.attr("class", "state-boundary");
})

// Load and display radar data
const radarQueue = d3.queue() // Start que
radarQueue.defer(d3.csv, "radar/radar201706160039.csv")
radarQueue.defer(d3.csv, "radar/radar201706160040.csv")
radarQueue.defer(d3.csv, "radar/radar201706160041.csv")
radarQueue.defer(d3.csv, "radar/radar201706160042.csv")
radarQueue.defer(d3.csv, "radar/radar201706160043.csv")
radarQueue.defer(d3.csv, "radar/radar201706160044.csv")
radarQueue.defer(d3.csv, "radar/radar201706160045.csv")
radarQueue.defer(d3.csv, "radar/radar201706160046.csv")
radarQueue.defer(d3.csv, "radar/radar201706160047.csv")
radarQueue.defer(d3.csv, "radar/radar201706160048.csv")
radarQueue.defer(d3.csv, "radar/radar201706160049.csv")
radarQueue.defer(d3.csv, "radar/radar201706160050.csv")
radarQueue.defer(d3.csv, "radar/radar201706160051.csv")
radarQueue.defer(d3.csv, "radar/radar201706160052.csv")
radarQueue.defer(d3.csv, "radar/radar201706160053.csv")
radarQueue.defer(d3.csv, "radar/radar201706160054.csv")
radarQueue.defer(d3.csv, "radar/radar201706160055.csv")
radarQueue.defer(d3.csv, "radar/radar201706160056.csv")
radarQueue.defer(d3.csv, "radar/radar201706160057.csv")
radarQueue.defer(d3.csv, "radar/radar201706160058.csv")
radarQueue.defer(d3.csv, "radar/radar201706160059.csv")
radarQueue.defer(d3.csv, "radar/radar201706160100.csv")
radarQueue.defer(d3.csv, "radar/radar201706160101.csv")
radarQueue.defer(d3.csv, "radar/radar201706160102.csv")
radarQueue.defer(d3.csv, "radar/radar201706160103.csv")
radarQueue.defer(d3.csv, "radar/radar201706160104.csv")
radarQueue.defer(d3.csv, "radar/radar201706160105.csv")
radarQueue.defer(d3.csv, "radar/radar201706160106.csv")
radarQueue.defer(d3.csv, "radar/radar201706160107.csv")
radarQueue.defer(d3.csv, "radar/radar201706160108.csv")
radarQueue.defer(d3.csv, "radar/radar201706160109.csv")
radarQueue.defer(d3.csv, "radar/radar201706160110.csv")
radarQueue.defer(d3.csv, "radar/radar201706160111.csv")
radarQueue.defer(d3.csv, "radar/radar201706160112.csv")
radarQueue.defer(d3.csv, "radar/radar201706160113.csv")
radarQueue.defer(d3.csv, "radar/radar201706160114.csv")
radarQueue.defer(d3.csv, "radar/radar201706160115.csv")
radarQueue.defer(d3.csv, "radar/radar201706160116.csv")
radarQueue.defer(d3.csv, "radar/radar201706160117.csv")
radarQueue.defer(d3.csv, "radar/radar201706160118.csv")
radarQueue.await(loadRadar) // Start loading the radar data from que

function loadRadar(error) {
	if (error) {
		console.error("there was an error", error)
		return
	}

	const radarScans = Array.prototype.slice.call(arguments, 1);
	for (let index in radarScans) {
		drawRadar(radarScans[index], index);
	}
}

// Bind radar data to DOM and draw the data
function drawRadar(radarData, index) {
	const radarColorScale = d3.scaleLinear()
		.domain([0, 10, 20, 30, 40, 50, 60, 70, 80])
		.range(["#FFFFFF", "#808080", "#ADD8E6", "#00FB90", "#00BB00", "#FFFF70", "#D0D060", "#FF6060", "#DA0000"])
	
	// Create empty canvas and set opacity to zero
	// Assign ID to access them later
	const canvas_radar = svg_radar.append("foreignObject")
		.attr("width", w)
		.attr("height", h)
		.attr("opacity", 0.3)
		.attr("stroke-width", 0)
		.append('xhtml:canvas')
			.attr('id', 'canvas_radar_viz_' + index)
			.attr("width", w)
			.attr("height", h)
			.style('display', 'none')

	const context_radar = canvas_radar.node().getContext("2d")
	const detachedContainer_radar = document.createElement("custom");
	const dataContainer_radar = d3.select(detachedContainer_radar);

	const dataBinding_radar = dataContainer_radar.selectAll("custom.rect")
		.data(radarData, (d) => d)

	dataBinding_radar.enter()
		.append("custom")
		.classed("rect", true)

	drawCanvas(dataContainer_radar, context_radar, radarColorScale)
}

function drawCanvas(dataContainer, context_radar, radarColorScale) {
	const radarElements = dataContainer.selectAll('custom.rect')

	radarElements.each((d) => {
		const val = parseFloat(d.value)
		const lat = parseFloat(d.lat)
		const lon = parseFloat(d.lon)

		if (val === 0) { return }
		const coords = projection_radar([lon, lat])

		context_radar.beginPath()
		context_radar.rect(coords[0], coords[1], 15, 15)
		context_radar.fillStyle = radarColorScale(val)
		context_radar.fill()
		context_radar.closePath()
	})
}
