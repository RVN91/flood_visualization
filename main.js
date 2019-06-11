/*
 * Main script to handle all SVG's
 *
 */

"use strict"; // Enforce strict type use

/* Define projections and geoconverter */
const projection = d3.geoMercator()
	.scale(900000)
	.center([9.930209, 57.031658]); 

// Converts lat / lon to pixel coordinates
const geoGenerator = d3.geoPath()
	.projection(projection)


/* Maps */
// Size of SVG's
const w = 500;
const h = 500;

/* Radar map */
var svgName = "#radar_map"
var svg_map_radar = add_svg_to_div(svgName);

// color scale for data
const colorScaleRadar = d3.scaleLinear()
	             .domain([0, 10, 20, 30, 
			     40, 50, 60, 70, 
			     80])
	.range(["#ffffff", "#808080", "#add8e6", 
		"#00fb90", "#00bb00", "#ffff70", 
		"#d0d060", "#ff6060", "#da0000"])

svg_map_radar.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
  .shapeWidth(30)
  .title("Precipitation [mm/h] (x-band radar)")
  .orient('vertical')
  .scale(colorScaleRadar);

svg_map_radar.select(".legendLinear")
  .call(legendLinear);

var fileNameArray = [
"radar/radar201706160000.csv", "radar/radar201706160001.csv",
"radar/radar201706160002.csv", "radar/radar201706160003.csv",
"radar/radar201706160004.csv", "radar/radar201706160005.csv",
"radar/radar201706160006.csv", "radar/radar201706160007.csv",
"radar/radar201706160008.csv", "radar/radar201706160009.csv",
"radar/radar201706160010.csv", "radar/radar201706160011.csv",
"radar/radar201706160012.csv", "radar/radar201706160013.csv",
"radar/radar201706160014.csv", "radar/radar201706160015.csv",
"radar/radar201706160016.csv", "radar/radar201706160017.csv",
"radar/radar201706160018.csv", "radar/radar201706160019.csv",
"radar/radar201706160020.csv", "radar/radar201706160021.csv",
"radar/radar201706160022.csv", "radar/radar201706160023.csv",
"radar/radar201706160024.csv", "radar/radar201706160025.csv",
"radar/radar201706160026.csv", "radar/radar201706160027.csv",
"radar/radar201706160028.csv", "radar/radar201706160029.csv",
"radar/radar201706160030.csv", "radar/radar201706160031.csv",
"radar/radar201706160032.csv", "radar/radar201706160033.csv",
"radar/radar201706160034.csv", "radar/radar201706160035.csv",
"radar/radar201706160036.csv", "radar/radar201706160037.csv",
"radar/radar201706160038.csv", "radar/radar201706160039.csv",
"radar/radar201706160040.csv", "radar/radar201706160041.csv",
"radar/radar201706160042.csv", "radar/radar201706160043.csv",
"radar/radar201706160044.csv", "radar/radar201706160045.csv",
"radar/radar201706160046.csv", "radar/radar201706160047.csv",
"radar/radar201706160048.csv", "radar/radar201706160049.csv",
"radar/radar201706160050.csv", "radar/radar201706160051.csv",
"radar/radar201706160052.csv", "radar/radar201706160053.csv",
"radar/radar201706160054.csv", "radar/radar201706160055.csv",
"radar/radar201706160056.csv", "radar/radar201706160057.csv",
"radar/radar201706160058.csv", "radar/radar201706160059.csv",
"radar/radar201706160100.csv", "radar/radar201706160101.csv",
"radar/radar201706160102.csv", "radar/radar201706160103.csv",
"radar/radar201706160104.csv", "radar/radar201706160105.csv",
"radar/radar201706160106.csv", "radar/radar201706160107.csv",
"radar/radar201706160108.csv", "radar/radar201706160109.csv",
"radar/radar201706160110.csv", "radar/radar201706160111.csv",
"radar/radar201706160112.csv", "radar/radar201706160113.csv",
"radar/radar201706160114.csv", "radar/radar201706160115.csv",
"radar/radar201706160116.csv", "radar/radar201706160117.csv",
"radar/radar201706160118.csv", "radar/radar201706160119.csv",
"radar/radar201706160120.csv", "radar/radar201706160121.csv",
"radar/radar201706160122.csv", "radar/radar201706160123.csv",
"radar/radar201706160124.csv", "radar/radar201706160125.csv",
"radar/radar201706160126.csv", "radar/radar201706160127.csv",
"radar/radar201706160128.csv", "radar/radar201706160129.csv",
"radar/radar201706160130.csv", "radar/radar201706160131.csv",
"radar/radar201706160132.csv", "radar/radar201706160133.csv",
"radar/radar201706160134.csv", "radar/radar201706160135.csv",
"radar/radar201706160136.csv", "radar/radar201706160137.csv",
"radar/radar201706160138.csv", "radar/radar201706160139.csv",
"radar/radar201706160140.csv", "radar/radar201706160141.csv",
"radar/radar201706160142.csv", "radar/radar201706160143.csv",
"radar/radar201706160144.csv", "radar/radar201706160145.csv",
"radar/radar201706160146.csv", "radar/radar201706160147.csv",
"radar/radar201706160148.csv", "radar/radar201706160149.csv",
"radar/radar201706160150.csv", "radar/radar201706160151.csv",
"radar/radar201706160152.csv", "radar/radar201706160153.csv",
"radar/radar201706160154.csv", "radar/radar201706160155.csv",
"radar/radar201706160156.csv", "radar/radar201706160157.csv",
"radar/radar201706160158.csv", "radar/radar201706160159.csv",
"radar/radar201706160200.csv", "radar/radar201706160201.csv",
"radar/radar201706160202.csv", "radar/radar201706160203.csv",
"radar/radar201706160204.csv", "radar/radar201706160205.csv",
"radar/radar201706160206.csv", "radar/radar201706160207.csv",
"radar/radar201706160208.csv", "radar/radar201706160209.csv",
"radar/radar201706160210.csv", "radar/radar201706160211.csv",
"radar/radar201706160212.csv", "radar/radar201706160213.csv",
"radar/radar201706160214.csv", "radar/radar201706160215.csv",
"radar/radar201706160216.csv", "radar/radar201706160217.csv",
"radar/radar201706160218.csv", "radar/radar201706160219.csv",
"radar/radar201706160220.csv", "radar/radar201706160221.csv",
"radar/radar201706160222.csv", "radar/radar201706160223.csv",
"radar/radar201706160224.csv", "radar/radar201706160225.csv",
"radar/radar201706160226.csv", "radar/radar201706160227.csv",
"radar/radar201706160228.csv", "radar/radar201706160229.csv",
"radar/radar201706160230.csv", "radar/radar201706160231.csv",
"radar/radar201706160232.csv", "radar/radar201706160233.csv",
"radar/radar201706160234.csv", "radar/radar201706160235.csv",
"radar/radar201706160236.csv", "radar/radar201706160237.csv",
"radar/radar201706160238.csv", "radar/radar201706160239.csv",
"radar/radar201706160240.csv", "radar/radar201706160241.csv",
"radar/radar201706160242.csv", "radar/radar201706160243.csv",
"radar/radar201706160244.csv", "radar/radar201706160245.csv",
"radar/radar201706160246.csv", "radar/radar201706160247.csv",
"radar/radar201706160248.csv", "radar/radar201706160249.csv",
"radar/radar201706160250.csv", "radar/radar201706160251.csv",
"radar/radar201706160252.csv", "radar/radar201706160253.csv",
"radar/radar201706160254.csv", "radar/radar201706160255.csv",
"radar/radar201706160256.csv", "radar/radar201706160257.csv",
"radar/radar201706160258.csv", "radar/radar201706160259.csv",
"radar/radar201706160300.csv", "radar/radar201706160301.csv",
"radar/radar201706160302.csv", "radar/radar201706160303.csv",
"radar/radar201706160304.csv", "radar/radar201706160305.csv",
"radar/radar201706160306.csv", "radar/radar201706160307.csv",
"radar/radar201706160308.csv", "radar/radar201706160309.csv",
"radar/radar201706160310.csv", "radar/radar201706160311.csv",
"radar/radar201706160312.csv", "radar/radar201706160313.csv",
"radar/radar201706160314.csv", "radar/radar201706160315.csv",
"radar/radar201706160316.csv", "radar/radar201706160317.csv",
"radar/radar201706160318.csv", "radar/radar201706160319.csv",
"radar/radar201706160320.csv", "radar/radar201706160321.csv",
"radar/radar201706160322.csv", "radar/radar201706160323.csv",
"radar/radar201706160324.csv", "radar/radar201706160325.csv",
"radar/radar201706160326.csv", "radar/radar201706160327.csv",
"radar/radar201706160328.csv", "radar/radar201706160329.csv",
"radar/radar201706160330.csv", "radar/radar201706160331.csv",
"radar/radar201706160332.csv", "radar/radar201706160333.csv",
"radar/radar201706160334.csv", "radar/radar201706160335.csv",
"radar/radar201706160336.csv", "radar/radar201706160337.csv",
"radar/radar201706160338.csv", "radar/radar201706160339.csv",
"radar/radar201706160340.csv", "radar/radar201706160341.csv",
"radar/radar201706160342.csv", "radar/radar201706160343.csv",
"radar/radar201706160344.csv", "radar/radar201706160345.csv",
"radar/radar201706160346.csv", "radar/radar201706160347.csv",
"radar/radar201706160348.csv", "radar/radar201706160349.csv",
"radar/radar201706160350.csv", "radar/radar201706160351.csv",
"radar/radar201706160352.csv", "radar/radar201706160353.csv",
"radar/radar201706160354.csv", "radar/radar201706160355.csv",
"radar/radar201706160356.csv", "radar/radar201706160357.csv",
"radar/radar201706160358.csv", "radar/radar201706160359.csv",
"radar/radar201706160400.csv", "radar/radar201706160401.csv",
"radar/radar201706160402.csv", "radar/radar201706160403.csv",
"radar/radar201706160404.csv", "radar/radar201706160405.csv",
"radar/radar201706160406.csv", "radar/radar201706160407.csv",
"radar/radar201706160408.csv", "radar/radar201706160409.csv",
"radar/radar201706160410.csv", "radar/radar201706160411.csv",
"radar/radar201706160412.csv", "radar/radar201706160413.csv",
"radar/radar201706160414.csv", "radar/radar201706160415.csv",
"radar/radar201706160416.csv", "radar/radar201706160417.csv",
"radar/radar201706160418.csv", "radar/radar201706160419.csv",
"radar/radar201706160420.csv", "radar/radar201706160421.csv",
"radar/radar201706160422.csv", "radar/radar201706160423.csv",
"radar/radar201706160424.csv", "radar/radar201706160425.csv",
"radar/radar201706160426.csv", "radar/radar201706160427.csv",
"radar/radar201706160428.csv", "radar/radar201706160429.csv",
"radar/radar201706160430.csv", "radar/radar201706160431.csv",
"radar/radar201706160432.csv", "radar/radar201706160433.csv",
"radar/radar201706160434.csv", "radar/radar201706160435.csv",
"radar/radar201706160436.csv", "radar/radar201706160437.csv",
"radar/radar201706160438.csv", "radar/radar201706160439.csv",
"radar/radar201706160440.csv", "radar/radar201706160441.csv",
"radar/radar201706160442.csv", "radar/radar201706160443.csv",
"radar/radar201706160444.csv", "radar/radar201706160445.csv",
"radar/radar201706160446.csv", "radar/radar201706160447.csv",
"radar/radar201706160448.csv", "radar/radar201706160449.csv",
"radar/radar201706160450.csv", "radar/radar201706160451.csv",
"radar/radar201706160452.csv", "radar/radar201706160453.csv",
"radar/radar201706160454.csv", "radar/radar201706160455.csv",
"radar/radar201706160456.csv", "radar/radar201706160457.csv",
"radar/radar201706160458.csv", "radar/radar201706160459.csv",
"radar/radar201706160500.csv", "radar/radar201706160501.csv",
"radar/radar201706160502.csv", "radar/radar201706160503.csv",
"radar/radar201706160504.csv", "radar/radar201706160505.csv",
"radar/radar201706160506.csv", "radar/radar201706160507.csv",
"radar/radar201706160508.csv", "radar/radar201706160509.csv",
"radar/radar201706160510.csv", "radar/radar201706160511.csv",
"radar/radar201706160512.csv", "radar/radar201706160513.csv",
"radar/radar201706160514.csv", "radar/radar201706160515.csv",
"radar/radar201706160516.csv", "radar/radar201706160517.csv",
"radar/radar201706160518.csv", "radar/radar201706160519.csv",
"radar/radar201706160520.csv", "radar/radar201706160521.csv",
"radar/radar201706160522.csv", "radar/radar201706160523.csv",
"radar/radar201706160524.csv", "radar/radar201706160525.csv",
"radar/radar201706160526.csv", "radar/radar201706160527.csv",
"radar/radar201706160528.csv", "radar/radar201706160529.csv",
"radar/radar201706160530.csv", "radar/radar201706160531.csv",
"radar/radar201706160532.csv", "radar/radar201706160533.csv",
"radar/radar201706160534.csv", "radar/radar201706160535.csv",
"radar/radar201706160536.csv", "radar/radar201706160537.csv",
"radar/radar201706160538.csv", "radar/radar201706160539.csv",
"radar/radar201706160540.csv", "radar/radar201706160541.csv",
"radar/radar201706160542.csv", "radar/radar201706160543.csv",
"radar/radar201706160544.csv", "radar/radar201706160545.csv",
"radar/radar201706160546.csv", "radar/radar201706160547.csv",
"radar/radar201706160548.csv", "radar/radar201706160549.csv",
"radar/radar201706160550.csv", "radar/radar201706160551.csv",
"radar/radar201706160552.csv", "radar/radar201706160553.csv",
"radar/radar201706160554.csv", "radar/radar201706160555.csv",
"radar/radar201706160556.csv", "radar/radar201706160557.csv",
"radar/radar201706160558.csv", "radar/radar201706160559.csv",
"radar/radar201706160600.csv", "radar/radar201706160601.csv",
"radar/radar201706160602.csv", "radar/radar201706160603.csv",
"radar/radar201706160604.csv", "radar/radar201706160605.csv",
"radar/radar201706160606.csv", "radar/radar201706160607.csv",
"radar/radar201706160608.csv", "radar/radar201706160609.csv",
"radar/radar201706160610.csv", "radar/radar201706160611.csv",
"radar/radar201706160612.csv", "radar/radar201706160613.csv",
"radar/radar201706160614.csv", "radar/radar201706160615.csv",
	];

const radarQueue = add_data_to_queue(fileNameArray); 
// Start loading the radar data from que
radarQueue.awaitAll(load_radar)

var basemapSVGRadar = svg_map_radar.append("g")
	.classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

	// Bind data to svg
	basemapSVGRadar
		.selectAll("path")
		.data(data.features)
		.enter()
			.append("path")
			.attr("d", geoGenerator)
			.attr("class", "state-boundary");
})

/* Flood map */
var svgName = "#flood_map"
var svg_map_flood = add_svg_to_div(svgName);

// Color scale for data
const colorScaleFlood = d3.scaleLinear()
	             .domain([0, 0.015, 0.02, 0.025, 
			     0.05, 0.1, 0.15, 0.2, 
			     0.24])
	.range(["#00ff00", "#40ff00", "#80ff00", 
		"#bfff00", "#ffff00", "#ffbf00", 
		"#ff8000", "#ff4000", "#ff0000"])

svg_map_flood.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
  .shapeWidth(30)
  .title("Flood Depth [m] (MIKE)")
  .orient('vertical')
  .scale(colorScaleFlood);

svg_map_flood.select(".legendLinear")
  .call(legendLinear);

var fileNameArray = [
"flood_depth/flood_depth_reprojected_000.csv", "flood_depth/flood_depth_reprojected_001.csv",
"flood_depth/flood_depth_reprojected_002.csv", "flood_depth/flood_depth_reprojected_003.csv",
"flood_depth/flood_depth_reprojected_004.csv", "flood_depth/flood_depth_reprojected_005.csv",
"flood_depth/flood_depth_reprojected_006.csv", "flood_depth/flood_depth_reprojected_007.csv",
"flood_depth/flood_depth_reprojected_008.csv", "flood_depth/flood_depth_reprojected_009.csv",
"flood_depth/flood_depth_reprojected_010.csv", "flood_depth/flood_depth_reprojected_011.csv",
"flood_depth/flood_depth_reprojected_012.csv", "flood_depth/flood_depth_reprojected_013.csv",
"flood_depth/flood_depth_reprojected_014.csv", "flood_depth/flood_depth_reprojected_015.csv",
"flood_depth/flood_depth_reprojected_016.csv", "flood_depth/flood_depth_reprojected_017.csv",
"flood_depth/flood_depth_reprojected_018.csv", "flood_depth/flood_depth_reprojected_019.csv",
"flood_depth/flood_depth_reprojected_020.csv", "flood_depth/flood_depth_reprojected_021.csv",
"flood_depth/flood_depth_reprojected_022.csv", "flood_depth/flood_depth_reprojected_023.csv",
"flood_depth/flood_depth_reprojected_024.csv", "flood_depth/flood_depth_reprojected_025.csv",
"flood_depth/flood_depth_reprojected_026.csv", "flood_depth/flood_depth_reprojected_027.csv",
"flood_depth/flood_depth_reprojected_028.csv", "flood_depth/flood_depth_reprojected_029.csv",
"flood_depth/flood_depth_reprojected_030.csv", "flood_depth/flood_depth_reprojected_031.csv",
"flood_depth/flood_depth_reprojected_032.csv", "flood_depth/flood_depth_reprojected_033.csv",
"flood_depth/flood_depth_reprojected_034.csv", "flood_depth/flood_depth_reprojected_035.csv",
"flood_depth/flood_depth_reprojected_036.csv", "flood_depth/flood_depth_reprojected_037.csv",
"flood_depth/flood_depth_reprojected_038.csv", "flood_depth/flood_depth_reprojected_039.csv",
"flood_depth/flood_depth_reprojected_040.csv", "flood_depth/flood_depth_reprojected_041.csv",
"flood_depth/flood_depth_reprojected_042.csv", "flood_depth/flood_depth_reprojected_043.csv",
"flood_depth/flood_depth_reprojected_044.csv", "flood_depth/flood_depth_reprojected_045.csv",
"flood_depth/flood_depth_reprojected_046.csv", "flood_depth/flood_depth_reprojected_047.csv",
"flood_depth/flood_depth_reprojected_048.csv", "flood_depth/flood_depth_reprojected_049.csv",
"flood_depth/flood_depth_reprojected_050.csv", "flood_depth/flood_depth_reprojected_051.csv",
"flood_depth/flood_depth_reprojected_052.csv", "flood_depth/flood_depth_reprojected_053.csv",
"flood_depth/flood_depth_reprojected_054.csv", "flood_depth/flood_depth_reprojected_055.csv",
"flood_depth/flood_depth_reprojected_056.csv", "flood_depth/flood_depth_reprojected_057.csv",
"flood_depth/flood_depth_reprojected_058.csv", "flood_depth/flood_depth_reprojected_059.csv",
"flood_depth/flood_depth_reprojected_060.csv", "flood_depth/flood_depth_reprojected_061.csv",
"flood_depth/flood_depth_reprojected_062.csv", "flood_depth/flood_depth_reprojected_063.csv",
"flood_depth/flood_depth_reprojected_064.csv", "flood_depth/flood_depth_reprojected_065.csv",
"flood_depth/flood_depth_reprojected_066.csv", "flood_depth/flood_depth_reprojected_067.csv",
"flood_depth/flood_depth_reprojected_068.csv", "flood_depth/flood_depth_reprojected_069.csv",
"flood_depth/flood_depth_reprojected_070.csv", "flood_depth/flood_depth_reprojected_071.csv",
"flood_depth/flood_depth_reprojected_072.csv", "flood_depth/flood_depth_reprojected_073.csv",
"flood_depth/flood_depth_reprojected_074.csv", "flood_depth/flood_depth_reprojected_075.csv",
"flood_depth/flood_depth_reprojected_076.csv", "flood_depth/flood_depth_reprojected_077.csv",
"flood_depth/flood_depth_reprojected_078.csv", "flood_depth/flood_depth_reprojected_079.csv",
"flood_depth/flood_depth_reprojected_080.csv", "flood_depth/flood_depth_reprojected_081.csv",
"flood_depth/flood_depth_reprojected_082.csv", "flood_depth/flood_depth_reprojected_083.csv",
"flood_depth/flood_depth_reprojected_084.csv", "flood_depth/flood_depth_reprojected_085.csv",
"flood_depth/flood_depth_reprojected_086.csv", "flood_depth/flood_depth_reprojected_087.csv",
"flood_depth/flood_depth_reprojected_088.csv", "flood_depth/flood_depth_reprojected_089.csv",
"flood_depth/flood_depth_reprojected_090.csv", "flood_depth/flood_depth_reprojected_091.csv",
"flood_depth/flood_depth_reprojected_092.csv", "flood_depth/flood_depth_reprojected_093.csv",
"flood_depth/flood_depth_reprojected_094.csv", "flood_depth/flood_depth_reprojected_095.csv",
"flood_depth/flood_depth_reprojected_096.csv", "flood_depth/flood_depth_reprojected_097.csv",
"flood_depth/flood_depth_reprojected_098.csv", "flood_depth/flood_depth_reprojected_099.csv",
"flood_depth/flood_depth_reprojected_100.csv", "flood_depth/flood_depth_reprojected_101.csv",
"flood_depth/flood_depth_reprojected_102.csv", "flood_depth/flood_depth_reprojected_103.csv",
"flood_depth/flood_depth_reprojected_104.csv", "flood_depth/flood_depth_reprojected_105.csv",
"flood_depth/flood_depth_reprojected_106.csv", "flood_depth/flood_depth_reprojected_107.csv",
"flood_depth/flood_depth_reprojected_108.csv", "flood_depth/flood_depth_reprojected_109.csv",
"flood_depth/flood_depth_reprojected_110.csv", "flood_depth/flood_depth_reprojected_111.csv",
"flood_depth/flood_depth_reprojected_112.csv", "flood_depth/flood_depth_reprojected_113.csv",
"flood_depth/flood_depth_reprojected_114.csv", "flood_depth/flood_depth_reprojected_115.csv",
"flood_depth/flood_depth_reprojected_116.csv", "flood_depth/flood_depth_reprojected_117.csv",
"flood_depth/flood_depth_reprojected_118.csv", "flood_depth/flood_depth_reprojected_119.csv",
"flood_depth/flood_depth_reprojected_120.csv", "flood_depth/flood_depth_reprojected_121.csv",
"flood_depth/flood_depth_reprojected_122.csv", "flood_depth/flood_depth_reprojected_123.csv",
"flood_depth/flood_depth_reprojected_124.csv", "flood_depth/flood_depth_reprojected_125.csv",
"flood_depth/flood_depth_reprojected_126.csv", "flood_depth/flood_depth_reprojected_127.csv",
"flood_depth/flood_depth_reprojected_128.csv", "flood_depth/flood_depth_reprojected_129.csv",
"flood_depth/flood_depth_reprojected_130.csv", "flood_depth/flood_depth_reprojected_131.csv",
"flood_depth/flood_depth_reprojected_132.csv", "flood_depth/flood_depth_reprojected_133.csv",
"flood_depth/flood_depth_reprojected_134.csv", "flood_depth/flood_depth_reprojected_135.csv",
"flood_depth/flood_depth_reprojected_136.csv", "flood_depth/flood_depth_reprojected_137.csv",
"flood_depth/flood_depth_reprojected_138.csv", "flood_depth/flood_depth_reprojected_139.csv",
"flood_depth/flood_depth_reprojected_140.csv", "flood_depth/flood_depth_reprojected_141.csv",
"flood_depth/flood_depth_reprojected_142.csv", "flood_depth/flood_depth_reprojected_143.csv",
"flood_depth/flood_depth_reprojected_144.csv", "flood_depth/flood_depth_reprojected_145.csv",
"flood_depth/flood_depth_reprojected_146.csv", "flood_depth/flood_depth_reprojected_147.csv",
"flood_depth/flood_depth_reprojected_148.csv", "flood_depth/flood_depth_reprojected_149.csv",
"flood_depth/flood_depth_reprojected_150.csv", "flood_depth/flood_depth_reprojected_151.csv",
"flood_depth/flood_depth_reprojected_152.csv", "flood_depth/flood_depth_reprojected_153.csv",
"flood_depth/flood_depth_reprojected_154.csv", "flood_depth/flood_depth_reprojected_155.csv",
"flood_depth/flood_depth_reprojected_156.csv", "flood_depth/flood_depth_reprojected_157.csv",
"flood_depth/flood_depth_reprojected_158.csv", "flood_depth/flood_depth_reprojected_159.csv",
"flood_depth/flood_depth_reprojected_160.csv", "flood_depth/flood_depth_reprojected_161.csv",
"flood_depth/flood_depth_reprojected_162.csv", "flood_depth/flood_depth_reprojected_163.csv",
"flood_depth/flood_depth_reprojected_164.csv", "flood_depth/flood_depth_reprojected_165.csv",
"flood_depth/flood_depth_reprojected_166.csv", "flood_depth/flood_depth_reprojected_167.csv",
"flood_depth/flood_depth_reprojected_168.csv", "flood_depth/flood_depth_reprojected_169.csv",
"flood_depth/flood_depth_reprojected_170.csv", "flood_depth/flood_depth_reprojected_171.csv",
"flood_depth/flood_depth_reprojected_172.csv", "flood_depth/flood_depth_reprojected_173.csv",
"flood_depth/flood_depth_reprojected_174.csv", "flood_depth/flood_depth_reprojected_175.csv",
"flood_depth/flood_depth_reprojected_176.csv", "flood_depth/flood_depth_reprojected_177.csv",
"flood_depth/flood_depth_reprojected_178.csv", "flood_depth/flood_depth_reprojected_179.csv",
"flood_depth/flood_depth_reprojected_180.csv", "flood_depth/flood_depth_reprojected_181.csv",
"flood_depth/flood_depth_reprojected_182.csv", "flood_depth/flood_depth_reprojected_183.csv",
"flood_depth/flood_depth_reprojected_184.csv", "flood_depth/flood_depth_reprojected_185.csv",
"flood_depth/flood_depth_reprojected_186.csv", "flood_depth/flood_depth_reprojected_187.csv",
"flood_depth/flood_depth_reprojected_188.csv", "flood_depth/flood_depth_reprojected_189.csv",
"flood_depth/flood_depth_reprojected_190.csv", "flood_depth/flood_depth_reprojected_191.csv",
"flood_depth/flood_depth_reprojected_192.csv", "flood_depth/flood_depth_reprojected_193.csv",
"flood_depth/flood_depth_reprojected_194.csv", "flood_depth/flood_depth_reprojected_195.csv",
"flood_depth/flood_depth_reprojected_196.csv", "flood_depth/flood_depth_reprojected_197.csv",
"flood_depth/flood_depth_reprojected_198.csv", "flood_depth/flood_depth_reprojected_199.csv",
"flood_depth/flood_depth_reprojected_200.csv", "flood_depth/flood_depth_reprojected_201.csv",
"flood_depth/flood_depth_reprojected_202.csv", "flood_depth/flood_depth_reprojected_203.csv",
"flood_depth/flood_depth_reprojected_204.csv", "flood_depth/flood_depth_reprojected_205.csv",
"flood_depth/flood_depth_reprojected_206.csv", "flood_depth/flood_depth_reprojected_207.csv",
"flood_depth/flood_depth_reprojected_208.csv", "flood_depth/flood_depth_reprojected_209.csv",
"flood_depth/flood_depth_reprojected_210.csv", "flood_depth/flood_depth_reprojected_211.csv",
"flood_depth/flood_depth_reprojected_212.csv", "flood_depth/flood_depth_reprojected_213.csv",
"flood_depth/flood_depth_reprojected_214.csv", "flood_depth/flood_depth_reprojected_215.csv",
"flood_depth/flood_depth_reprojected_216.csv", "flood_depth/flood_depth_reprojected_217.csv",
"flood_depth/flood_depth_reprojected_218.csv", "flood_depth/flood_depth_reprojected_219.csv",
"flood_depth/flood_depth_reprojected_220.csv", "flood_depth/flood_depth_reprojected_221.csv",
"flood_depth/flood_depth_reprojected_222.csv", "flood_depth/flood_depth_reprojected_223.csv",
"flood_depth/flood_depth_reprojected_224.csv", "flood_depth/flood_depth_reprojected_225.csv",
"flood_depth/flood_depth_reprojected_226.csv", "flood_depth/flood_depth_reprojected_227.csv",
"flood_depth/flood_depth_reprojected_228.csv", "flood_depth/flood_depth_reprojected_229.csv",
"flood_depth/flood_depth_reprojected_230.csv", "flood_depth/flood_depth_reprojected_231.csv",
"flood_depth/flood_depth_reprojected_232.csv", "flood_depth/flood_depth_reprojected_233.csv",
"flood_depth/flood_depth_reprojected_234.csv", "flood_depth/flood_depth_reprojected_235.csv",
"flood_depth/flood_depth_reprojected_236.csv", "flood_depth/flood_depth_reprojected_237.csv",
"flood_depth/flood_depth_reprojected_238.csv", "flood_depth/flood_depth_reprojected_239.csv",
"flood_depth/flood_depth_reprojected_240.csv", "flood_depth/flood_depth_reprojected_241.csv",
"flood_depth/flood_depth_reprojected_242.csv", "flood_depth/flood_depth_reprojected_243.csv",
"flood_depth/flood_depth_reprojected_244.csv", "flood_depth/flood_depth_reprojected_245.csv",
"flood_depth/flood_depth_reprojected_246.csv", "flood_depth/flood_depth_reprojected_247.csv",
"flood_depth/flood_depth_reprojected_248.csv", "flood_depth/flood_depth_reprojected_249.csv",
"flood_depth/flood_depth_reprojected_250.csv", "flood_depth/flood_depth_reprojected_251.csv",
"flood_depth/flood_depth_reprojected_252.csv", "flood_depth/flood_depth_reprojected_253.csv",
"flood_depth/flood_depth_reprojected_254.csv", "flood_depth/flood_depth_reprojected_255.csv",
"flood_depth/flood_depth_reprojected_256.csv", "flood_depth/flood_depth_reprojected_257.csv",
"flood_depth/flood_depth_reprojected_258.csv", "flood_depth/flood_depth_reprojected_259.csv",
"flood_depth/flood_depth_reprojected_260.csv", "flood_depth/flood_depth_reprojected_261.csv",
"flood_depth/flood_depth_reprojected_262.csv", "flood_depth/flood_depth_reprojected_263.csv",
"flood_depth/flood_depth_reprojected_264.csv", "flood_depth/flood_depth_reprojected_265.csv",
"flood_depth/flood_depth_reprojected_266.csv", "flood_depth/flood_depth_reprojected_267.csv",
"flood_depth/flood_depth_reprojected_268.csv", "flood_depth/flood_depth_reprojected_269.csv",
"flood_depth/flood_depth_reprojected_270.csv", "flood_depth/flood_depth_reprojected_271.csv",
"flood_depth/flood_depth_reprojected_272.csv", "flood_depth/flood_depth_reprojected_273.csv",
"flood_depth/flood_depth_reprojected_274.csv", "flood_depth/flood_depth_reprojected_275.csv",
"flood_depth/flood_depth_reprojected_276.csv", "flood_depth/flood_depth_reprojected_277.csv",
"flood_depth/flood_depth_reprojected_278.csv", "flood_depth/flood_depth_reprojected_279.csv",
"flood_depth/flood_depth_reprojected_280.csv", "flood_depth/flood_depth_reprojected_281.csv",
"flood_depth/flood_depth_reprojected_282.csv", "flood_depth/flood_depth_reprojected_283.csv",
"flood_depth/flood_depth_reprojected_284.csv", "flood_depth/flood_depth_reprojected_285.csv",
"flood_depth/flood_depth_reprojected_286.csv", "flood_depth/flood_depth_reprojected_287.csv",
"flood_depth/flood_depth_reprojected_288.csv", "flood_depth/flood_depth_reprojected_289.csv",
"flood_depth/flood_depth_reprojected_290.csv", "flood_depth/flood_depth_reprojected_291.csv",
"flood_depth/flood_depth_reprojected_292.csv", "flood_depth/flood_depth_reprojected_293.csv",
"flood_depth/flood_depth_reprojected_294.csv", "flood_depth/flood_depth_reprojected_295.csv",
"flood_depth/flood_depth_reprojected_296.csv", "flood_depth/flood_depth_reprojected_297.csv",
"flood_depth/flood_depth_reprojected_298.csv", "flood_depth/flood_depth_reprojected_299.csv",
"flood_depth/flood_depth_reprojected_300.csv", "flood_depth/flood_depth_reprojected_301.csv",
"flood_depth/flood_depth_reprojected_302.csv", "flood_depth/flood_depth_reprojected_303.csv",
"flood_depth/flood_depth_reprojected_304.csv", "flood_depth/flood_depth_reprojected_305.csv",
"flood_depth/flood_depth_reprojected_306.csv", "flood_depth/flood_depth_reprojected_307.csv",
"flood_depth/flood_depth_reprojected_308.csv", "flood_depth/flood_depth_reprojected_309.csv",
"flood_depth/flood_depth_reprojected_310.csv", "flood_depth/flood_depth_reprojected_311.csv",
"flood_depth/flood_depth_reprojected_312.csv", "flood_depth/flood_depth_reprojected_313.csv",
"flood_depth/flood_depth_reprojected_314.csv", "flood_depth/flood_depth_reprojected_315.csv",
"flood_depth/flood_depth_reprojected_316.csv", "flood_depth/flood_depth_reprojected_317.csv",
"flood_depth/flood_depth_reprojected_318.csv", "flood_depth/flood_depth_reprojected_319.csv",
"flood_depth/flood_depth_reprojected_320.csv", "flood_depth/flood_depth_reprojected_321.csv",
"flood_depth/flood_depth_reprojected_322.csv", "flood_depth/flood_depth_reprojected_323.csv",
"flood_depth/flood_depth_reprojected_324.csv", "flood_depth/flood_depth_reprojected_325.csv",
"flood_depth/flood_depth_reprojected_326.csv", "flood_depth/flood_depth_reprojected_327.csv",
"flood_depth/flood_depth_reprojected_328.csv", "flood_depth/flood_depth_reprojected_329.csv",
"flood_depth/flood_depth_reprojected_330.csv", "flood_depth/flood_depth_reprojected_331.csv",
"flood_depth/flood_depth_reprojected_332.csv", "flood_depth/flood_depth_reprojected_333.csv",
"flood_depth/flood_depth_reprojected_334.csv", "flood_depth/flood_depth_reprojected_335.csv",
"flood_depth/flood_depth_reprojected_336.csv", "flood_depth/flood_depth_reprojected_337.csv",
"flood_depth/flood_depth_reprojected_338.csv", "flood_depth/flood_depth_reprojected_339.csv",
"flood_depth/flood_depth_reprojected_340.csv", "flood_depth/flood_depth_reprojected_341.csv",
"flood_depth/flood_depth_reprojected_342.csv", "flood_depth/flood_depth_reprojected_343.csv",
"flood_depth/flood_depth_reprojected_344.csv", "flood_depth/flood_depth_reprojected_345.csv",
"flood_depth/flood_depth_reprojected_346.csv", "flood_depth/flood_depth_reprojected_347.csv",
"flood_depth/flood_depth_reprojected_348.csv", "flood_depth/flood_depth_reprojected_349.csv",
"flood_depth/flood_depth_reprojected_350.csv", "flood_depth/flood_depth_reprojected_351.csv",
"flood_depth/flood_depth_reprojected_352.csv", "flood_depth/flood_depth_reprojected_353.csv",
"flood_depth/flood_depth_reprojected_354.csv", "flood_depth/flood_depth_reprojected_355.csv",
"flood_depth/flood_depth_reprojected_356.csv", "flood_depth/flood_depth_reprojected_357.csv",
"flood_depth/flood_depth_reprojected_358.csv", "flood_depth/flood_depth_reprojected_359.csv",
"flood_depth/flood_depth_reprojected_360.csv", "flood_depth/flood_depth_reprojected_361.csv",
"flood_depth/flood_depth_reprojected_362.csv", "flood_depth/flood_depth_reprojected_363.csv",
"flood_depth/flood_depth_reprojected_364.csv", "flood_depth/flood_depth_reprojected_365.csv",
"flood_depth/flood_depth_reprojected_366.csv", "flood_depth/flood_depth_reprojected_367.csv",
"flood_depth/flood_depth_reprojected_368.csv", "flood_depth/flood_depth_reprojected_369.csv",
"flood_depth/flood_depth_reprojected_370.csv", "flood_depth/flood_depth_reprojected_371.csv",
"flood_depth/flood_depth_reprojected_372.csv", "flood_depth/flood_depth_reprojected_373.csv",
"flood_depth/flood_depth_reprojected_374.csv", "flood_depth/flood_depth_reprojected_375.csv",
	];

const floodQueue = add_data_to_queue(fileNameArray); 
// Start loading the radar data from que
floodQueue.awaitAll(load_flood)

var basemapSVGFlood = svg_map_flood.append("g")
	.classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

	// Bind data to svg
	basemapSVGFlood 
		.selectAll("path")
		.data(data.features)
		.enter()
			.append("path")
			.attr("d", geoGenerator)
			.attr("class", "state-boundary");
})

/* Flood ECMWF map */
var svgName = "#flood_ecmwf_map"
var svg_map_flood_ecmwf = add_svg_to_div(svgName);

// Color scale for data
const colorScaleFloodEcmwf = d3.scaleLinear()
	             .domain([0, 0.015, 0.02, 0.025, 
			     0.05, 0.1, 0.15, 0.2, 
			     0.24])
	.range(["#00ff00", "#40ff00", "#80ff00", 
		"#bfff00", "#ffff00", "#ffbf00", 
		"#ff8000", "#ff4000", "#ff0000"])

svg_map_flood_ecmwf.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legendColor()
  .shapeWidth(30)
  .title("Flood Depth [m] (MIKE + HYPE ECMWF)")
  .orient('vertical')
  .scale(colorScaleFlood);

svg_map_flood_ecmwf.select(".legendLinear")
  .call(legendLinear);

var fileNameArray = [
"flood_depth/ecmwf/flood_depth_reprojected_000.csv", "flood_depth/ecmwf/flood_depth_reprojected_001.csv",
"flood_depth/ecmwf/flood_depth_reprojected_002.csv", "flood_depth/ecmwf/flood_depth_reprojected_003.csv",
"flood_depth/ecmwf/flood_depth_reprojected_004.csv", "flood_depth/ecmwf/flood_depth_reprojected_005.csv",
"flood_depth/ecmwf/flood_depth_reprojected_006.csv", "flood_depth/ecmwf/flood_depth_reprojected_007.csv",
"flood_depth/ecmwf/flood_depth_reprojected_008.csv", "flood_depth/ecmwf/flood_depth_reprojected_009.csv",
"flood_depth/ecmwf/flood_depth_reprojected_010.csv", "flood_depth/ecmwf/flood_depth_reprojected_011.csv",
"flood_depth/ecmwf/flood_depth_reprojected_012.csv", "flood_depth/ecmwf/flood_depth_reprojected_013.csv",
"flood_depth/ecmwf/flood_depth_reprojected_014.csv", "flood_depth/ecmwf/flood_depth_reprojected_015.csv",
"flood_depth/ecmwf/flood_depth_reprojected_016.csv", "flood_depth/ecmwf/flood_depth_reprojected_017.csv",
"flood_depth/ecmwf/flood_depth_reprojected_018.csv", "flood_depth/ecmwf/flood_depth_reprojected_019.csv",
"flood_depth/ecmwf/flood_depth_reprojected_020.csv", "flood_depth/ecmwf/flood_depth_reprojected_021.csv",
"flood_depth/ecmwf/flood_depth_reprojected_022.csv", "flood_depth/ecmwf/flood_depth_reprojected_023.csv",
"flood_depth/ecmwf/flood_depth_reprojected_024.csv", "flood_depth/ecmwf/flood_depth_reprojected_025.csv",
"flood_depth/ecmwf/flood_depth_reprojected_026.csv", "flood_depth/ecmwf/flood_depth_reprojected_027.csv",
"flood_depth/ecmwf/flood_depth_reprojected_028.csv", "flood_depth/ecmwf/flood_depth_reprojected_029.csv",
"flood_depth/ecmwf/flood_depth_reprojected_030.csv", "flood_depth/ecmwf/flood_depth_reprojected_031.csv",
"flood_depth/ecmwf/flood_depth_reprojected_032.csv", "flood_depth/ecmwf/flood_depth_reprojected_033.csv",
"flood_depth/ecmwf/flood_depth_reprojected_034.csv", "flood_depth/ecmwf/flood_depth_reprojected_035.csv",
"flood_depth/ecmwf/flood_depth_reprojected_036.csv", "flood_depth/ecmwf/flood_depth_reprojected_037.csv",
"flood_depth/ecmwf/flood_depth_reprojected_038.csv", "flood_depth/ecmwf/flood_depth_reprojected_039.csv",
"flood_depth/ecmwf/flood_depth_reprojected_040.csv", "flood_depth/ecmwf/flood_depth_reprojected_041.csv",
"flood_depth/ecmwf/flood_depth_reprojected_042.csv", "flood_depth/ecmwf/flood_depth_reprojected_043.csv",
"flood_depth/ecmwf/flood_depth_reprojected_044.csv", "flood_depth/ecmwf/flood_depth_reprojected_045.csv",
"flood_depth/ecmwf/flood_depth_reprojected_046.csv", "flood_depth/ecmwf/flood_depth_reprojected_047.csv",
"flood_depth/ecmwf/flood_depth_reprojected_048.csv", "flood_depth/ecmwf/flood_depth_reprojected_049.csv",
"flood_depth/ecmwf/flood_depth_reprojected_050.csv", "flood_depth/ecmwf/flood_depth_reprojected_051.csv",
"flood_depth/ecmwf/flood_depth_reprojected_052.csv", "flood_depth/ecmwf/flood_depth_reprojected_053.csv",
"flood_depth/ecmwf/flood_depth_reprojected_054.csv", "flood_depth/ecmwf/flood_depth_reprojected_055.csv",
"flood_depth/ecmwf/flood_depth_reprojected_056.csv", "flood_depth/ecmwf/flood_depth_reprojected_057.csv",
"flood_depth/ecmwf/flood_depth_reprojected_058.csv", "flood_depth/ecmwf/flood_depth_reprojected_059.csv",
"flood_depth/ecmwf/flood_depth_reprojected_060.csv", "flood_depth/ecmwf/flood_depth_reprojected_061.csv",
"flood_depth/ecmwf/flood_depth_reprojected_062.csv", "flood_depth/ecmwf/flood_depth_reprojected_063.csv",
"flood_depth/ecmwf/flood_depth_reprojected_064.csv", "flood_depth/ecmwf/flood_depth_reprojected_065.csv",
"flood_depth/ecmwf/flood_depth_reprojected_066.csv", "flood_depth/ecmwf/flood_depth_reprojected_067.csv",
"flood_depth/ecmwf/flood_depth_reprojected_068.csv", "flood_depth/ecmwf/flood_depth_reprojected_069.csv",
"flood_depth/ecmwf/flood_depth_reprojected_070.csv", "flood_depth/ecmwf/flood_depth_reprojected_071.csv",
"flood_depth/ecmwf/flood_depth_reprojected_072.csv", "flood_depth/ecmwf/flood_depth_reprojected_073.csv",
"flood_depth/ecmwf/flood_depth_reprojected_074.csv", "flood_depth/ecmwf/flood_depth_reprojected_075.csv",
"flood_depth/ecmwf/flood_depth_reprojected_076.csv", "flood_depth/ecmwf/flood_depth_reprojected_077.csv",
"flood_depth/ecmwf/flood_depth_reprojected_078.csv", "flood_depth/ecmwf/flood_depth_reprojected_079.csv",
"flood_depth/ecmwf/flood_depth_reprojected_080.csv", "flood_depth/ecmwf/flood_depth_reprojected_081.csv",
"flood_depth/ecmwf/flood_depth_reprojected_082.csv", "flood_depth/ecmwf/flood_depth_reprojected_083.csv",
"flood_depth/ecmwf/flood_depth_reprojected_084.csv", "flood_depth/ecmwf/flood_depth_reprojected_085.csv",
"flood_depth/ecmwf/flood_depth_reprojected_086.csv", "flood_depth/ecmwf/flood_depth_reprojected_087.csv",
"flood_depth/ecmwf/flood_depth_reprojected_088.csv", "flood_depth/ecmwf/flood_depth_reprojected_089.csv",
"flood_depth/ecmwf/flood_depth_reprojected_090.csv", "flood_depth/ecmwf/flood_depth_reprojected_091.csv",
"flood_depth/ecmwf/flood_depth_reprojected_092.csv", "flood_depth/ecmwf/flood_depth_reprojected_093.csv",
"flood_depth/ecmwf/flood_depth_reprojected_094.csv", "flood_depth/ecmwf/flood_depth_reprojected_095.csv",
"flood_depth/ecmwf/flood_depth_reprojected_096.csv", "flood_depth/ecmwf/flood_depth_reprojected_097.csv",
"flood_depth/ecmwf/flood_depth_reprojected_098.csv", "flood_depth/ecmwf/flood_depth_reprojected_099.csv",
"flood_depth/ecmwf/flood_depth_reprojected_100.csv", "flood_depth/ecmwf/flood_depth_reprojected_101.csv",
"flood_depth/ecmwf/flood_depth_reprojected_102.csv", "flood_depth/ecmwf/flood_depth_reprojected_103.csv",
"flood_depth/ecmwf/flood_depth_reprojected_104.csv", "flood_depth/ecmwf/flood_depth_reprojected_105.csv",
"flood_depth/ecmwf/flood_depth_reprojected_106.csv", "flood_depth/ecmwf/flood_depth_reprojected_107.csv",
"flood_depth/ecmwf/flood_depth_reprojected_108.csv", "flood_depth/ecmwf/flood_depth_reprojected_109.csv",
"flood_depth/ecmwf/flood_depth_reprojected_110.csv", "flood_depth/ecmwf/flood_depth_reprojected_111.csv",
"flood_depth/ecmwf/flood_depth_reprojected_112.csv", "flood_depth/ecmwf/flood_depth_reprojected_113.csv",
"flood_depth/ecmwf/flood_depth_reprojected_114.csv", "flood_depth/ecmwf/flood_depth_reprojected_115.csv",
"flood_depth/ecmwf/flood_depth_reprojected_116.csv", "flood_depth/ecmwf/flood_depth_reprojected_117.csv",
"flood_depth/ecmwf/flood_depth_reprojected_118.csv", "flood_depth/ecmwf/flood_depth_reprojected_119.csv",
"flood_depth/ecmwf/flood_depth_reprojected_120.csv", "flood_depth/ecmwf/flood_depth_reprojected_121.csv",
"flood_depth/ecmwf/flood_depth_reprojected_122.csv", "flood_depth/ecmwf/flood_depth_reprojected_123.csv",
"flood_depth/ecmwf/flood_depth_reprojected_124.csv", "flood_depth/ecmwf/flood_depth_reprojected_125.csv",
"flood_depth/ecmwf/flood_depth_reprojected_126.csv", "flood_depth/ecmwf/flood_depth_reprojected_127.csv",
"flood_depth/ecmwf/flood_depth_reprojected_128.csv", "flood_depth/ecmwf/flood_depth_reprojected_129.csv",
"flood_depth/ecmwf/flood_depth_reprojected_130.csv", "flood_depth/ecmwf/flood_depth_reprojected_131.csv",
"flood_depth/ecmwf/flood_depth_reprojected_132.csv", "flood_depth/ecmwf/flood_depth_reprojected_133.csv",
"flood_depth/ecmwf/flood_depth_reprojected_134.csv", "flood_depth/ecmwf/flood_depth_reprojected_135.csv",
"flood_depth/ecmwf/flood_depth_reprojected_136.csv", "flood_depth/ecmwf/flood_depth_reprojected_137.csv",
"flood_depth/ecmwf/flood_depth_reprojected_138.csv", "flood_depth/ecmwf/flood_depth_reprojected_139.csv",
"flood_depth/ecmwf/flood_depth_reprojected_140.csv", "flood_depth/ecmwf/flood_depth_reprojected_141.csv",
"flood_depth/ecmwf/flood_depth_reprojected_142.csv", "flood_depth/ecmwf/flood_depth_reprojected_143.csv",
"flood_depth/ecmwf/flood_depth_reprojected_144.csv", "flood_depth/ecmwf/flood_depth_reprojected_145.csv",
"flood_depth/ecmwf/flood_depth_reprojected_146.csv", "flood_depth/ecmwf/flood_depth_reprojected_147.csv",
"flood_depth/ecmwf/flood_depth_reprojected_148.csv", "flood_depth/ecmwf/flood_depth_reprojected_149.csv",
"flood_depth/ecmwf/flood_depth_reprojected_150.csv", "flood_depth/ecmwf/flood_depth_reprojected_151.csv",
"flood_depth/ecmwf/flood_depth_reprojected_152.csv", "flood_depth/ecmwf/flood_depth_reprojected_153.csv",
"flood_depth/ecmwf/flood_depth_reprojected_154.csv", "flood_depth/ecmwf/flood_depth_reprojected_155.csv",
"flood_depth/ecmwf/flood_depth_reprojected_156.csv", "flood_depth/ecmwf/flood_depth_reprojected_157.csv",
"flood_depth/ecmwf/flood_depth_reprojected_158.csv", "flood_depth/ecmwf/flood_depth_reprojected_159.csv",
"flood_depth/ecmwf/flood_depth_reprojected_160.csv", "flood_depth/ecmwf/flood_depth_reprojected_161.csv",
"flood_depth/ecmwf/flood_depth_reprojected_162.csv", "flood_depth/ecmwf/flood_depth_reprojected_163.csv",
"flood_depth/ecmwf/flood_depth_reprojected_164.csv", "flood_depth/ecmwf/flood_depth_reprojected_165.csv",
"flood_depth/ecmwf/flood_depth_reprojected_166.csv", "flood_depth/ecmwf/flood_depth_reprojected_167.csv",
"flood_depth/ecmwf/flood_depth_reprojected_168.csv", "flood_depth/ecmwf/flood_depth_reprojected_169.csv",
"flood_depth/ecmwf/flood_depth_reprojected_170.csv", "flood_depth/ecmwf/flood_depth_reprojected_171.csv",
"flood_depth/ecmwf/flood_depth_reprojected_172.csv", "flood_depth/ecmwf/flood_depth_reprojected_173.csv",
"flood_depth/ecmwf/flood_depth_reprojected_174.csv", "flood_depth/ecmwf/flood_depth_reprojected_175.csv",
"flood_depth/ecmwf/flood_depth_reprojected_176.csv", "flood_depth/ecmwf/flood_depth_reprojected_177.csv",
"flood_depth/ecmwf/flood_depth_reprojected_178.csv", "flood_depth/ecmwf/flood_depth_reprojected_179.csv",
"flood_depth/ecmwf/flood_depth_reprojected_180.csv", "flood_depth/ecmwf/flood_depth_reprojected_181.csv",
"flood_depth/ecmwf/flood_depth_reprojected_182.csv", "flood_depth/ecmwf/flood_depth_reprojected_183.csv",
"flood_depth/ecmwf/flood_depth_reprojected_184.csv", "flood_depth/ecmwf/flood_depth_reprojected_185.csv",
"flood_depth/ecmwf/flood_depth_reprojected_186.csv", "flood_depth/ecmwf/flood_depth_reprojected_187.csv",
"flood_depth/ecmwf/flood_depth_reprojected_188.csv", "flood_depth/ecmwf/flood_depth_reprojected_189.csv",
"flood_depth/ecmwf/flood_depth_reprojected_190.csv", "flood_depth/ecmwf/flood_depth_reprojected_191.csv",
"flood_depth/ecmwf/flood_depth_reprojected_192.csv", "flood_depth/ecmwf/flood_depth_reprojected_193.csv",
"flood_depth/ecmwf/flood_depth_reprojected_194.csv", "flood_depth/ecmwf/flood_depth_reprojected_195.csv",
"flood_depth/ecmwf/flood_depth_reprojected_196.csv", "flood_depth/ecmwf/flood_depth_reprojected_197.csv",
"flood_depth/ecmwf/flood_depth_reprojected_198.csv", "flood_depth/ecmwf/flood_depth_reprojected_199.csv",
"flood_depth/ecmwf/flood_depth_reprojected_200.csv", "flood_depth/ecmwf/flood_depth_reprojected_201.csv",
"flood_depth/ecmwf/flood_depth_reprojected_202.csv", "flood_depth/ecmwf/flood_depth_reprojected_203.csv",
"flood_depth/ecmwf/flood_depth_reprojected_204.csv", "flood_depth/ecmwf/flood_depth_reprojected_205.csv",
"flood_depth/ecmwf/flood_depth_reprojected_206.csv", "flood_depth/ecmwf/flood_depth_reprojected_207.csv",
"flood_depth/ecmwf/flood_depth_reprojected_208.csv", "flood_depth/ecmwf/flood_depth_reprojected_209.csv",
"flood_depth/ecmwf/flood_depth_reprojected_210.csv", "flood_depth/ecmwf/flood_depth_reprojected_211.csv",
"flood_depth/ecmwf/flood_depth_reprojected_212.csv", "flood_depth/ecmwf/flood_depth_reprojected_213.csv",
"flood_depth/ecmwf/flood_depth_reprojected_214.csv", "flood_depth/ecmwf/flood_depth_reprojected_215.csv",
"flood_depth/ecmwf/flood_depth_reprojected_216.csv", "flood_depth/ecmwf/flood_depth_reprojected_217.csv",
"flood_depth/ecmwf/flood_depth_reprojected_218.csv", "flood_depth/ecmwf/flood_depth_reprojected_219.csv",
"flood_depth/ecmwf/flood_depth_reprojected_220.csv", "flood_depth/ecmwf/flood_depth_reprojected_221.csv",
"flood_depth/ecmwf/flood_depth_reprojected_222.csv", "flood_depth/ecmwf/flood_depth_reprojected_223.csv",
"flood_depth/ecmwf/flood_depth_reprojected_224.csv", "flood_depth/ecmwf/flood_depth_reprojected_225.csv",
"flood_depth/ecmwf/flood_depth_reprojected_226.csv", "flood_depth/ecmwf/flood_depth_reprojected_227.csv",
"flood_depth/ecmwf/flood_depth_reprojected_228.csv", "flood_depth/ecmwf/flood_depth_reprojected_229.csv",
"flood_depth/ecmwf/flood_depth_reprojected_230.csv", "flood_depth/ecmwf/flood_depth_reprojected_231.csv",
"flood_depth/ecmwf/flood_depth_reprojected_232.csv", "flood_depth/ecmwf/flood_depth_reprojected_233.csv",
"flood_depth/ecmwf/flood_depth_reprojected_234.csv", "flood_depth/ecmwf/flood_depth_reprojected_235.csv",
"flood_depth/ecmwf/flood_depth_reprojected_236.csv", "flood_depth/ecmwf/flood_depth_reprojected_237.csv",
"flood_depth/ecmwf/flood_depth_reprojected_238.csv", "flood_depth/ecmwf/flood_depth_reprojected_239.csv",
"flood_depth/ecmwf/flood_depth_reprojected_240.csv", "flood_depth/ecmwf/flood_depth_reprojected_241.csv",
"flood_depth/ecmwf/flood_depth_reprojected_242.csv", "flood_depth/ecmwf/flood_depth_reprojected_243.csv",
"flood_depth/ecmwf/flood_depth_reprojected_244.csv", "flood_depth/ecmwf/flood_depth_reprojected_245.csv",
"flood_depth/ecmwf/flood_depth_reprojected_246.csv", "flood_depth/ecmwf/flood_depth_reprojected_247.csv",
"flood_depth/ecmwf/flood_depth_reprojected_248.csv", "flood_depth/ecmwf/flood_depth_reprojected_249.csv",
"flood_depth/ecmwf/flood_depth_reprojected_250.csv", "flood_depth/ecmwf/flood_depth_reprojected_251.csv",
"flood_depth/ecmwf/flood_depth_reprojected_252.csv", "flood_depth/ecmwf/flood_depth_reprojected_253.csv",
"flood_depth/ecmwf/flood_depth_reprojected_254.csv", "flood_depth/ecmwf/flood_depth_reprojected_255.csv",
"flood_depth/ecmwf/flood_depth_reprojected_256.csv", "flood_depth/ecmwf/flood_depth_reprojected_257.csv",
"flood_depth/ecmwf/flood_depth_reprojected_258.csv", "flood_depth/ecmwf/flood_depth_reprojected_259.csv",
"flood_depth/ecmwf/flood_depth_reprojected_260.csv", "flood_depth/ecmwf/flood_depth_reprojected_261.csv",
"flood_depth/ecmwf/flood_depth_reprojected_262.csv", "flood_depth/ecmwf/flood_depth_reprojected_263.csv",
"flood_depth/ecmwf/flood_depth_reprojected_264.csv", "flood_depth/ecmwf/flood_depth_reprojected_265.csv",
"flood_depth/ecmwf/flood_depth_reprojected_266.csv", "flood_depth/ecmwf/flood_depth_reprojected_267.csv",
"flood_depth/ecmwf/flood_depth_reprojected_268.csv", "flood_depth/ecmwf/flood_depth_reprojected_269.csv",
"flood_depth/ecmwf/flood_depth_reprojected_270.csv", "flood_depth/ecmwf/flood_depth_reprojected_271.csv",
"flood_depth/ecmwf/flood_depth_reprojected_272.csv", "flood_depth/ecmwf/flood_depth_reprojected_273.csv",
"flood_depth/ecmwf/flood_depth_reprojected_274.csv", "flood_depth/ecmwf/flood_depth_reprojected_275.csv",
"flood_depth/ecmwf/flood_depth_reprojected_276.csv", "flood_depth/ecmwf/flood_depth_reprojected_277.csv",
"flood_depth/ecmwf/flood_depth_reprojected_278.csv", "flood_depth/ecmwf/flood_depth_reprojected_279.csv",
"flood_depth/ecmwf/flood_depth_reprojected_280.csv", "flood_depth/ecmwf/flood_depth_reprojected_281.csv",
"flood_depth/ecmwf/flood_depth_reprojected_282.csv", "flood_depth/ecmwf/flood_depth_reprojected_283.csv",
"flood_depth/ecmwf/flood_depth_reprojected_284.csv", "flood_depth/ecmwf/flood_depth_reprojected_285.csv",
"flood_depth/ecmwf/flood_depth_reprojected_286.csv", "flood_depth/ecmwf/flood_depth_reprojected_287.csv",
"flood_depth/ecmwf/flood_depth_reprojected_288.csv", "flood_depth/ecmwf/flood_depth_reprojected_289.csv",
"flood_depth/ecmwf/flood_depth_reprojected_290.csv", "flood_depth/ecmwf/flood_depth_reprojected_291.csv",
"flood_depth/ecmwf/flood_depth_reprojected_292.csv", "flood_depth/ecmwf/flood_depth_reprojected_293.csv",
"flood_depth/ecmwf/flood_depth_reprojected_294.csv", "flood_depth/ecmwf/flood_depth_reprojected_295.csv",
"flood_depth/ecmwf/flood_depth_reprojected_296.csv", "flood_depth/ecmwf/flood_depth_reprojected_297.csv",
"flood_depth/ecmwf/flood_depth_reprojected_298.csv", "flood_depth/ecmwf/flood_depth_reprojected_299.csv",
"flood_depth/ecmwf/flood_depth_reprojected_300.csv", "flood_depth/ecmwf/flood_depth_reprojected_301.csv",
"flood_depth/ecmwf/flood_depth_reprojected_302.csv", "flood_depth/ecmwf/flood_depth_reprojected_303.csv",
"flood_depth/ecmwf/flood_depth_reprojected_304.csv", "flood_depth/ecmwf/flood_depth_reprojected_305.csv",
"flood_depth/ecmwf/flood_depth_reprojected_306.csv", "flood_depth/ecmwf/flood_depth_reprojected_307.csv",
"flood_depth/ecmwf/flood_depth_reprojected_308.csv", "flood_depth/ecmwf/flood_depth_reprojected_309.csv",
"flood_depth/ecmwf/flood_depth_reprojected_310.csv", "flood_depth/ecmwf/flood_depth_reprojected_311.csv",
"flood_depth/ecmwf/flood_depth_reprojected_312.csv", "flood_depth/ecmwf/flood_depth_reprojected_313.csv",
"flood_depth/ecmwf/flood_depth_reprojected_314.csv", "flood_depth/ecmwf/flood_depth_reprojected_315.csv",
"flood_depth/ecmwf/flood_depth_reprojected_316.csv", "flood_depth/ecmwf/flood_depth_reprojected_317.csv",
"flood_depth/ecmwf/flood_depth_reprojected_318.csv", "flood_depth/ecmwf/flood_depth_reprojected_319.csv",
"flood_depth/ecmwf/flood_depth_reprojected_320.csv", "flood_depth/ecmwf/flood_depth_reprojected_321.csv",
"flood_depth/ecmwf/flood_depth_reprojected_322.csv", "flood_depth/ecmwf/flood_depth_reprojected_323.csv",
"flood_depth/ecmwf/flood_depth_reprojected_324.csv", "flood_depth/ecmwf/flood_depth_reprojected_325.csv",
"flood_depth/ecmwf/flood_depth_reprojected_326.csv", "flood_depth/ecmwf/flood_depth_reprojected_327.csv",
"flood_depth/ecmwf/flood_depth_reprojected_328.csv", "flood_depth/ecmwf/flood_depth_reprojected_329.csv",
"flood_depth/ecmwf/flood_depth_reprojected_330.csv", "flood_depth/ecmwf/flood_depth_reprojected_331.csv",
"flood_depth/ecmwf/flood_depth_reprojected_332.csv", "flood_depth/ecmwf/flood_depth_reprojected_333.csv",
"flood_depth/ecmwf/flood_depth_reprojected_334.csv", "flood_depth/ecmwf/flood_depth_reprojected_335.csv",
"flood_depth/ecmwf/flood_depth_reprojected_336.csv", "flood_depth/ecmwf/flood_depth_reprojected_337.csv",
"flood_depth/ecmwf/flood_depth_reprojected_338.csv", "flood_depth/ecmwf/flood_depth_reprojected_339.csv",
"flood_depth/ecmwf/flood_depth_reprojected_340.csv", "flood_depth/ecmwf/flood_depth_reprojected_341.csv",
"flood_depth/ecmwf/flood_depth_reprojected_342.csv", "flood_depth/ecmwf/flood_depth_reprojected_343.csv",
"flood_depth/ecmwf/flood_depth_reprojected_344.csv", "flood_depth/ecmwf/flood_depth_reprojected_345.csv",
"flood_depth/ecmwf/flood_depth_reprojected_346.csv", "flood_depth/ecmwf/flood_depth_reprojected_347.csv",
"flood_depth/ecmwf/flood_depth_reprojected_348.csv", "flood_depth/ecmwf/flood_depth_reprojected_349.csv",
"flood_depth/ecmwf/flood_depth_reprojected_350.csv", "flood_depth/ecmwf/flood_depth_reprojected_351.csv",
"flood_depth/ecmwf/flood_depth_reprojected_352.csv", "flood_depth/ecmwf/flood_depth_reprojected_353.csv",
"flood_depth/ecmwf/flood_depth_reprojected_354.csv", "flood_depth/ecmwf/flood_depth_reprojected_355.csv",
"flood_depth/ecmwf/flood_depth_reprojected_356.csv", "flood_depth/ecmwf/flood_depth_reprojected_357.csv",
"flood_depth/ecmwf/flood_depth_reprojected_358.csv", "flood_depth/ecmwf/flood_depth_reprojected_359.csv",
"flood_depth/ecmwf/flood_depth_reprojected_360.csv", "flood_depth/ecmwf/flood_depth_reprojected_361.csv",
"flood_depth/ecmwf/flood_depth_reprojected_362.csv", "flood_depth/ecmwf/flood_depth_reprojected_363.csv",
"flood_depth/ecmwf/flood_depth_reprojected_364.csv", "flood_depth/ecmwf/flood_depth_reprojected_365.csv",
"flood_depth/ecmwf/flood_depth_reprojected_366.csv", "flood_depth/ecmwf/flood_depth_reprojected_367.csv",
"flood_depth/ecmwf/flood_depth_reprojected_368.csv", "flood_depth/ecmwf/flood_depth_reprojected_369.csv",
"flood_depth/ecmwf/flood_depth_reprojected_370.csv", "flood_depth/ecmwf/flood_depth_reprojected_371.csv",
"flood_depth/ecmwf/flood_depth_reprojected_372.csv", "flood_depth/ecmwf/flood_depth_reprojected_373.csv",
"flood_depth/ecmwf/flood_depth_reprojected_374.csv", "flood_depth/ecmwf/flood_depth_reprojected_375.csv"
	];

const floodQueueEcmwf = add_data_to_queue(fileNameArray); 
// Start loading the radar data from que
floodQueueEcmwf.awaitAll(load_flood_ecmwf)

var basemapSVGFloodEcmwf = svg_map_flood_ecmwf.append("g")
	.classed("map", true)

// Plot geoJSON
d3.json("local_area.json", function(err, data) {

	// Bind data to svg
	basemapSVGFloodEcmwf 
		.selectAll("path")
		.data(data.features)
		.enter()
			.append("path")
			.attr("d", geoGenerator)
			.attr("class", "state-boundary");
})

// Forecast button
// Add the options to the button
var allForecasts = ["ECMWF", "MEP member 1", "MEP member 2", "MEP member 3"]
d3.select("#selectForecast")
	.selectAll('myOptions')
		.data(allForecasts)
	.enter()
		.append('option')
	.text(function (d) { return d; }) // text showed in the menu
	.attr("value", function (d) { return d; }) // corresponding value returned by the button


// When the button is changed, run the updateChart function
d3.select("#selectForecast").on("change", function(d) {
	// recover the option that has been chosen
	var selectedOption = d3.select(this).property("value")
	// run the updateChart function with this selected option
	updateForecast(selectedOption)
});


// A function that update the chart
function updateForecast(selectedGroup) {
	// Create new chart titles with the selection
	svg_rainfall.select("text")
		.text("Precipitation [mm/h] (" + selectedGroup + ")");
}


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

function add_data_to_queue(fileNameArray) {
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
