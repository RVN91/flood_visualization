/*
 * Main script to handle all SVG's
 *
 */

"use strict"; // Enforce strict type use

/* Maps */
// Size of SVG's
const w = 600;
const h = 600;

const svg_radar_exp = add_svg_to_div("#radar_map");

/* Define projections and geoconverter */
const projection = d3.geoMercator()
	.scale(500000)
	.center([9.929409, 57.031658]); 

// Converts lat / lon to pixel coordinates
const geoGenerator = d3.geoPath()
	.projection(projection)

// Color scale for data
const colorScale = d3.scaleLinear()
	             .domain([0, 10, 20, 30, 
			     40, 50, 60, 70, 
			     80])
	.range(["#FFFFFF", "#808080", "#ADD8E6", 
		"#00FB90", "#00BB00", "#FFFF70", 
		"#D0D060", "#FF6060", "#DA0000"])

const basemapSVG_radar = svg_radar_exp.append("g")
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

var fileNameArray = [
	"radar/radar201706160100.csv", "radar/radar201706160101.csv",
	"radar/radar201706160102.csv", "radar/radar201706160103.csv",
	"radar/radar201706160104.csv", "radar/radar201706160105.csv",
	"radar/radar201706160106.csv", "radar/radar201706160107.csv",
	"radar/radar201706160108.csv", "radar/radar201706160109.csv",
	"radar/radar201706160110.csv", "radar/radar201706160111.csv",
	"radar/radar201706160112.csv", "radar/radar201706160113.csv",
	"radar/radar201706160114.csv", "radar/radar201706160115.csv",
	"radar/radar201706160116.csv", "radar/radar201706160117.csv"
	];

const radarQueue = add_data_to_queue(fileNameArray, svg_radar_exp); 
// Start loading the radar data from que
radarQueue.awaitAll(load)

function add_svg_to_div(div_id) {
/*
 * Adds a SVG object to DOM
 */
	const svg = d3.select(div_id)
		.append("svg")
		.attr("width", w)
		.attr("height", h);
	return svg;
}

function add_data_to_queue(fileNameArray, svg) {
/*  
 * Put data from csv file in queue and return a nested array, * with the data in the same order as they are called.
 *, * d3.queue works asynchronous, which saves a lot of 
 * time. Props for whoever wrote that!
 *
 */ 
	const queue = d3.queue() // Start queue
	for (let index in fileNameArray) {
		queue.defer(d3.csv, fileNameArray[index]);
	}

	return queue;
}
