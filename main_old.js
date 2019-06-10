"use strict";

// Size of SVG's
const w = 600;
const h = 600;
let k = 0;	 // Number of frames to be visualized
let counter = 0; // Frame counter

// Flood extent MIKE
const svg_flood_extent = d3.select("#flood_extent_mike")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// Flood extent ECMWF
const svg_flood_extent_ecmwf = d3.select("#flood_extent_ecmwf")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// Radar image
const svg_radar = d3.select("#radar")
	.append("svg")
	.attr("width", w)
	.attr("height", h)
	.on("click", () => {
		// Set interval function to run through the animation
		var refreshIntervalId = setInterval(function(){
			// If it is not the first frame, remove the previously frame
			if (counter !== 0) {
				// Remove earlier radar and flood canvas
				d3.select('#canvas_radar_viz_' + (counter-1))
				.style('display', 'none');
				d3.select('#canvas_flood_viz_' + (counter-1))
				.style('display', 'none');
				d3.select('#canvas_flood_extent_ecmwf_viz_' + (counter-1))
				.style('display', 'none');
			}
			
			// If it is the last frame, clear the interval function
			// and reset the counter
			if (counter == 80) {
			counter = 0;
			d3.selectAll("circle")
				.attr("opacity", 0);
			d3.selectAll("line")
				.attr("opacity", 0);
			clearInterval(refreshIntervalId);
			} else {
				//console.log('#canvas_viz_' + counter)
				const radarToShow = d3.select('#canvas_radar_viz_' + counter);
				radarToShow.style('display', 'inline');

				const floodToShow = d3.select('#canvas_flood_viz_' + counter);
				floodToShow.style('display', 'inline');

				const floodToShowHYPE = d3.select('#canvas_flood_extent_ecmwf_viz_' + counter);
				floodToShowHYPE.style('display', 'inline');

				// Make forecast points visible
				var i; // counter for forecast frames
				for (i = 1; i < 60; i++) {
				d3.select('#precipitation_viz_' + (counter + i))
					.attr("fill", "#ff0000")
					.attr("opacity", 1);

				d3.select('#volume_viz_' + (counter + i))
					.attr("fill", "#ff0000")
					.attr("opacity", 1);
				}

				// Make rainfall points visible
				d3.select('#precipitation_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);
				// Make flood volume points visible
				d3.select('#volume_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);
				// Make lines visible 
				d3.select('#line_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);
				d3.select('#line_flood_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);


			//console.log('circle_viz_' + counter)
			}
			counter += 1; // Increase the frame count			
		}, 150); 		
	})

// Title
svg_radar.append("text")
	.attr("x", (w / 2))             
	.attr("y", 0 + 25)
	.attr("text-anchor", "middle")  
	.style("font-size", "30px") 
	.text("Radar Image");
	
// Title
svg_flood_extent.append("text")
	.attr("x", (w / 2))             
	.attr("y", 0 + 25)
	.attr("text-anchor", "middle")  
	.style("font-size", "30px") 
	.text("MIKE");
	
// Title
svg_flood_extent_ecmwf.append("text")
	.attr("x", (w / 2))             
	.attr("y", 0 + 25)
	.attr("text-anchor", "middle")  
	.style("font-size", "30px") 
	.text("MIKE + HYPE");
	
// Forecast button
// Add the options to the button
var allForecasts = ["AAU Nowcast", "MEP", "ECMWF"]
d3.select("#selectForecast")
	.selectAll('myOptions')
		.data(allForecasts)
	.enter()
		.append('option')
	.text(function (d) { return d; }) // text showed in the menu
