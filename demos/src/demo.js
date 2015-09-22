/*global require*/
"use strict";

document.addEventListener("DOMContentLoaded", function() {
	var BarChart = require("../../main");

	new BarChart("#chart", {
		size:"medium",
		data:[
			{name: "HW 1.1", value: 70, average: 65},
			{name: "HW 1.2", value: 65, average: 55},
			{name: "HW 1.3", value: 80, average: 95},
			{name: "QZ 1.1", value: 85, average: 75},
			{name: "HW 1.4", value: 90, average: 80},
			{name: "HW 1.5", value: 83, average: 86},
			{name: "T 1", value: 89, average: 85}
		],
		classAverage:86,
		title: "Assignment Performance"}
	);

});
