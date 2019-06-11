/*
 * Plot of flood volume
 *
 * Author: Rasmus Nielsen
 *
 */

// Set the dimensions and margins of the graph
var margin_flood = {top: 10, right: 40, bottom: 60, left: 40},
	width = 300 - margin.left - margin_flood.right,
	height = 300 - margin_flood.top - margin_flood.bottom;

// Append SVG to div element
const svg_flood_volume = d3.select("#flood_volume")
	.append("svg")
	.attr("width", width + margin_flood.left + margin_flood.right)
	.attr("height", height + margin_flood.top + margin_flood.bottom)
	// Translate this svg element to leave some margin.
	.append("g")
	.attr("transform", "translate(" + margin_flood.left + "," 
	      + margin.top + ")");

// Read the data
d3.csv("flood_depth/flood_volume.csv",
	// Specify the date format
	function(d){ // 2003-09-10 05:16:00
		return {date: d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date), flood_volume: d.flood_volume}
	},
	// Use the data set within this scope
	function(data) {	
		// Add x-axis
		// X scale and Axis
		var x = d3.scaleTime()
			.domain(d3.extent(data, function(d) { return d.date; })) // This is the min and the max of the data: 0 to 100 if percentages
			.range([0, width]);                                      // This is the corresponding value I want in Pixel
		svg_flood_volume
			.append('g')
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x)
				.tickFormat(d3.timeFormat("%m-%d %H:%M")))
			.selectAll("text")	
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-65)");
		
		// Title
		svg_flood_volume.append("text")
			.attr("x", (width / 2))             
			.attr("y", 0 + (margin.top))
			.attr("text-anchor", "middle")  
			.style("font-size", "20px") 
			.text("Flood Volume [m^3]");
	
		// X scale and Axis
		var y = d3.scaleLinear()
			.domain([0, 2000])
			//.domain(d3.extent(data, function(d) { return d.flood_volume; })) // This is the min and the max of the data: 0 to 100 if percentages
			.range([height, 0]);                                             // This is the corresponding value I want in Pixel
		
		var yAxis = d3.axisLeft(y)
		
		svg_flood_volume
			.append('g')
			.call(d3.axisLeft(y))
			.attr("class", "yAxis"); // Give a class to this element: we'll have to call it later
			
		// Lines
		let line_index = 0
		svg_flood_volume.selectAll("myline")
		  .data(data)
		  .enter()
		  .append("line")
			.attr('id', function(d) {line_index++; return 'line_flood_viz_' + (line_index - 1)} )
			.attr("x1", function(d) { return x(d.date); })
			.attr("x2", function(d) { return x(d.date); })
			.attr("y1", function(d) { return y(d.flood_volume); })
			.attr("y2", height)
			.attr("stroke", "grey")
			.attr("opacity", 0);
			
		// Add the points
		let point_index = 0
		var points = svg_flood_volume
			.append("g")
			.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
				.attr('id', function(d) {point_index++; return 'volume_viz_' + (point_index - 1)} )
				.attr("cx", function(d) { return x(d.date) } )
				.attr("cy", function(d) { return y(d.flood_volume) } )
				.attr("r", 3)
				.attr("opacity", 0)
				.attr("fill", "#69b3a2");
	}
)
