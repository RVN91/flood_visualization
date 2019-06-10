/*
 * Plot of radar rainfall from pixel
 *
 * Author: Rasmus Nielsen
 *
 */

// Set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 60, left: 30},
	width = 300 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// Append SVG to div element
const svg_rainfall = d3.select("#rainfall_radar")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	// Translate this svg element to leave some margin.
	.append("g")
	.attr("transform", "translate(" + margin.left + "," 
	      + margin.top + ")");

// Read the data
d3.csv("https://raw.githubusercontent.com/RVN91/personal_webpage/master/rain_gauge_intensity.csv", 
// Specify the date format
function(d){ // 2003-09-10 05:16:00
	return {date: d3.timeParse("%Y-%m-%d %H:%M:%S")(d.date), intensity_gauge_1: d.intensity_gauge_1,
	intensity_gauge_2: d.intensity_gauge_2, intensity_gauge_3: d.intensity_gauge_3}
},

// Use the data set within this scope
function(data) {
	// List of groups (here I have one group per column)
	var allGroup = ["Event 1", "Event 2", "Event 3"]
	
	// Add the options to the button
	d3.select("#selectButton")
		.selectAll('myOptions')
			.data(allGroup)
		.enter()
			.append('option')
		.text(function (d) { return d; }) // text showed in the menu
		.attr("value", function (d) { return d; }) // corresponding value returned by the button

	// Add x-axis
	// X scale and Axis
	var x = d3.scaleTime()
		.domain(d3.extent(data, function(d) { return d.date; })) // This is the min and the max of the data: 0 to 100 if percentages
		.range([0, width]);                                      // This is the corresponding value I want in Pixel
	svg_rainfall
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
	svg_rainfall.append("text")
		.attr("x", (width / 2))             
		.attr("y", 0 + (margin.top))
		.attr("text-anchor", "middle")  
		.style("font-size", "20px") 
		.text("Precipitation [mm/h]");
	
	// X scale and Axis
	var y = d3.scaleLinear()
		.domain(d3.extent(data, function(d) { return d.intensity_gauge_1; })) // This is the min and the max of the data: 0 to 100 if percentages
		.range([height, 0]);                                                  // This is the corresponding value I want in Pixel
	
	var yAxis = d3.axisLeft(y)
	
	svg_rainfall
		.append('g')
		.call(d3.axisLeft(y))
		.attr("class", "yAxis"); // Give a class to this element: we'll have to call it later
	
	// Lines from zero to rainfall value
	let line_index = 0
	svg_rainfall.selectAll("myline")
	  .data(data)
	  .enter()
	  .append("line")
		.attr('id', function(d) {line_index++; return 'line_viz_' + (line_index - 1)} )
		.attr("x1", function(d) { return x(d.date); })
		.attr("x2", function(d) { return x(d.date); })
		.attr("y1", function(d) { return y(d.intensity_gauge_1); })
		.attr("y2", height)
		.attr("stroke", "grey")
		.attr("opacity", 0);

	// Add the points
	let point_index = 0
	var points = svg_rainfall
		.append("g")
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
			.attr('id', function(d) {point_index++; return 'precipitation_viz_' + (point_index - 1)} )
			.attr("cx", function(d) { return x(d.date) } )
			.attr("cy", function(d) { return y(d.intensity_gauge_1) } )
			.attr("r", 3)
			.attr("opacity", 0)
			.attr("fill", "#69b3a2");
	
	// A function that update the chart
	function update(selectedGroup) {
		// Create new data with the selection?
		var dataFilter = data.map(function(d){return {date: d.date, value: d[selectedGroup]} })
		
		y
			.domain(d3.extent(dataFilter, function(d) { return d.value; }));
			
		svg_rainfall.selectAll(".yAxis")
			.transition()
			.duration(1000)
			.call(yAxis);
			
		points
			.data(dataFilter)
			.transition()
			.duration(1000)
				.attr("cx", function(d) { return x(d.date) })
				.attr("cy", function(d) { return y(d.value) });
	}
		
	// When the button is changed, run the updateChart function
	d3.select("#selectButton").on("change", function(d) {
		// recover the option that has been chosen
		var selectedOption = d3.select(this).property("value")
		// run the updateChart function with this selected option
		update(selectedOption)
	});
	
	// Start the animation when the "Start" button is pressed
	d3.select("#start").on("click", function(d) {
		// Give these new data to update line
		lines
			.enter()
			.append("path")
			.datum(d)
			.transition()
			.duration(1000)
			.attr("d", d3.line()
				.x()
				.y(function(d) { return y(d.value) })
			);

		points
		.remove();
	});
})
