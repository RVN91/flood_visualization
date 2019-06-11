/*
 * Aninmation handler
 *
 * Handles animation of different SVG and canvas
 * elements by iterating through DOM elements and
 * set make them visible and unvisible
 *
 * General approach:
 * 1. Attach functions to start and stop buttons
 *
 * 2. On click, iterate through the DOM elements
 *    defining different frames of the animations
 *
 * Author: Rasmus Vest Nielsen
 *
 */

/* Bind animation start to button */
let counter = 0; // Frame counter
let endFrame = 374; // Last frame to be displayed
d3.select("#startButton")
	.on("click", function() {
		console.log("click!")
		// Set interval function to run 
		// through the animation
		var refreshIntervalId = setInterval(
			                function(){
			
			// If it is not the first 
			// frame, remove the previously frame
			if (counter !== 0) {
				// Remove earlier radar 
				// and flood canvas
				d3.select('#canvas_radar_viz_' 
					  + (counter-1))
				.style('display', 'none');
				
				d3.select('#canvas_flood_viz_' 
					  + (counter-1))
				.style('display', 'none');
				
				d3.select('#canvas_flood_ecmwf_viz_' 
					  + (counter-1))
				.style('display', 'none');
			}
			
			// If it is the last frame, 
			// clear the interval function
			// and reset the counter
			if (counter == endFrame) {
				counter = 0;
				d3.selectAll("circle")
					.attr("opacity", 0);
				d3.selectAll("line")
					.attr("opacity", 0);
				clearInterval(refreshIntervalId);
			} else {
				const radarToShow = d3.select(
				      '#canvas_radar_viz_' + counter);
				radarToShow.style('display', 'inline');
				
				const floodToShow = d3.select(
				      '#canvas_flood_viz_' + counter);
				floodToShow.style('display', 'inline');
				
				const floodEcmwfToShow = d3.select(
				      '#canvas_flood_ecmwf_viz_' + counter);
				floodEcmwfToShow.style('display', 'inline');
				
				// Make forecast points visible
				var i; // counter for forecast frames
				for (i = 1; i < 60; i++) {
				d3.select('#precipitation_viz_' + (counter + i))
					.attr("fill", "#ff0000")
					.attr("opacity", 1);
				
				d3.select('#volume_viz_' + (counter + i))
					.attr("fill", "#ff0000")
					.attr("opacity", 1);
				
					// Make lines visible
				d3.select('#line_viz_' + (counter + i))
					.attr("stroke", "#ff0000")
					.attr("opacity", 1);
				
				d3.select('#line_flood_viz_' + (counter+ i))
					.attr("stroke", "#ff0000")
					.attr("opacity", 1);
				}
				
				// Make points visible
				d3.select('#precipitation_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);
				
				d3.select('#volume_viz_' + counter)
					.attr("fill", "#0000ff")
					.attr("opacity", 1);
				
				// Make lines visible
				d3.select('#line_viz_' + counter)
					.attr("stroke", "#0000ff")
					.attr("opacity", 1);
				
				d3.select('#line_flood_viz_' + counter)
					.attr("stroke", "#0000ff")
					.attr("opacity", 1);
			}
			counter += 1; // Increase the frame count			
		}, 100); 		
	})
