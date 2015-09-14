/*global require*/

"use strict";

document.addEventListener("DOMContentLoaded", function() {
	var BarChart = require("../../main");

	new BarChart("#chart", {
		size:"medium",
		data:[
			{name: "HW 1.1", value:70},
			{name: "HW 1.2", value:65},
			{name: "HW 1.3", value:80},
			{name: "QZ 1.1", value:85},
			{name: "HW 1.4", value:90},
			{name: "HW 1.5", value:83},
			{name: "T 1", value:89}
		],
		classAverage:86}
	);

});
