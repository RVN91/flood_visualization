/*
 * Canvas projecter for large arrays
 *
 * Solves the problem with displaying large data sets
 * on web pages using HTML5 canvas in memory instead of
 * using DOM elements and thereby getting much better
 * frame rates
 *
 * General approach:
 * 1. Bind data to custom "virtual" DOM elements in 
 * memory only
 *
 * 2. Use canvas to draw data elements
 *
 * 3. 
 *
 * Build upon Joanne Cheng's work with visualization of 
 * NEXRAD radar data:
 * https://github.com/joannecheng/nexrad-d3-experiment
 * 
 * Resources:
 * https://www.freecodecamp.org/news/d3-and-canvas-in-
 * 3-steps-8505c8b27444/
 *
 * Author: Rasmus Vest Nielsen
 *
 */

function load(error, array) {
/*
 * Loads elements from que as array and sends each nested elements
 * as array to draw function
 */
	// Return error if something went wrong
	if (error) {
		console.error("there was an error", error)
		return
	}
	
	// Pass the arrays to the drawing function
	for (let index in array) {
		draw(array[index], index);
	}
}

function draw(dataArray, index) {
/*
 * Draws array with geocoordinates and values
 *
 * Canvas does not have any nodes by default, which
 * is needed for D3 to bind data to it. This is solved by
 * creating dummy HTML canvas nodes with "display" style 
 * set to false, which will be updated later on and then 
 * rendering the frames one by one, thus creating the 
 * illusion of an animation. Each frame has an ID with 
 * the frame number, which is later used to change the 
 * "display" style to "inline", making it visible
 *
 * Input:
 * 	dataArray: Array with coordinates and values
 * 	index:     Index of the current frame
*/
	// Create canvas with the current frame
	
	const canvas = svg_radar_exp.append("foreignObject")
		.attr("width", w)
		.attr("height", h)
		.attr("opacity", 0.5)
		.attr("stroke-width", 0)
		.append('xhtml:canvas')
			.attr('id', 'canvas_radar_viz_' + index)
			.attr("width", w)
			.attr("height", h)
			.style('display', 'none')

	// Add context as object to contain properties
	// and methods (colors, brushes, etc.)
	const context = canvas.node().getContext('2d');

	/* Create custom data container in-memory only */
	// Create custom in-memory only base element
	const detachedContainer = document.createElement('custom');

	// Create detached container (not attached to any DOM)
	const dataContainer = d3.select(detachedContainer);

	/* Create data binding */
	const dataBinding = dataContainer.selectAll("custom.rect")
				       .data(dataArray, function(d)
				        { return d; });
	
	// For new elements create a custom DOM node
	dataBinding.enter()
		   .append("custom")
		   .classed("rect", true);
	
	// Draw canvas
	drawCanvas(dataContainer, context, canvas);
}

function drawCanvas(dataContainer, context, canvas) {
/*
 * Converts the DOM elements to canvas drawing
 */
	// Clear canvas by creating a big white box covering the image
	// Retarded solution -> Set opacity of current elements to zero
	// instead? I think I already have done that?
	context.fillStyle = "#fff";
	context.rect(0,0,canvas.attr("width"), canvas.attr("height"));
	context.fill();
	
	// Iterate through each data element and draw them
	var elements = dataContainer.selectAll("custom.rect");
	elements.each(function(d) {
		var node = d3.select(this);
		
		// Get coordinates and values
		const lat = parseFloat(d.lat);
		const lon = parseFloat(d.lon);
		const val = parseFloat(d.value);
		
		// If values equals zero, return function without 
		// drawing. Saves A LOT of computational time
		if (val == 0) { return }

		// Convert lon / lat to corresponding pixels
		const coords = projection([lon, lat]);

		context.beginPath();
		context.fillStyle = colorScale(val);
		// rect(x,y,width,height)
		context.rect(coords[0], coords[1], 14, 14);
		context.fill();
		context.closePath();
	})
}


