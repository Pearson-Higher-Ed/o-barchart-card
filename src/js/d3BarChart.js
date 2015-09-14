/*global d3*/

"use strict";

module.exports = function() {
	var width = 400;
	var height = 200;
	var classAverage = 50;

	function chart(selection) {
		selection.each(function(data) {
			var chart = d3.select(this)
				.append("svg")
				.attr("width", width)
				.attr("height", height);

			var top = height / 4;
			var bottom = top * 3;
			var spacing = (bottom - top) / 5;
			//create legend
			var g = chart.append("g")
				.attr("class", "chart-legend");
			g.append("text")
				.attr("x", 30)
				.attr("y", top)
				.text("100%");
			g.append("text")
				.attr("x", 30)
				.attr("y", bottom)
				.text("0%");
			g.selectAll("line")
				.data([top, top+spacing, top+(spacing*2), top + (spacing*3), top + (spacing * 4), top + (spacing*5) -1])
			.enter().append("line")
				.attr("x1", 30)
				.attr("x2", width - 100)//100 for the "class average" box
				.attr("y1", function(d) { return d;})
				.attr("y2", function(d) { return d;});

			var widthSpace = width / 10;
			var bar = chart.selectAll("g")
				.data(data)
			.enter().append("g")
				.attr("transform", function(d, i) {
					return "translate(" + ((i * widthSpace) + 5) + ")";//add 5 really for initial spacing
				});

			var scale = bottom - top;
			var yScale = d3.scale.linear().domain([0, 100]).range([0, scale]);
			//the rect height will be a percentage representation of the total aarea we have to work with.
			//the starting point will be the bottom of the graph subtracted the yscale since we draw from top down
			bar.append("rect")
				.attr("width", 30)
				.attr("height", function(d) {
					return yScale(d.value);
				})
				.attr("y", function(d) {
					return bottom - yScale(d.value);
				});

			bar.append("text")
				.attr("y", bottom + 10)
				.attr("x", 12.5)
				.text(function(d){ return d.name;});

			//create average
			var average = chart.append("g")
				.attr("class", "class-average");
			average.append("line")
				.attr("x1", 30)
				.attr("x2", 300)
				.attr("y1", bottom - yScale(classAverage))
				.attr("y2", bottom - yScale(classAverage));
			average.append("rect")
				.attr("width", 80)
				.attr("height", 20)
				.attr("y", bottom - yScale(classAverage) - 10)//10 because we want to be in the middle with a 20 rect height
				.attr("x", 300);
			average.append("text")
				.attr("y", bottom - yScale(classAverage) + 3)//+3 just to center the text better
				.attr("x", 378)
				.text("86 class average");

		});
	}

	chart.width = function(value) {
		if (!arguments.length) {
			return width;
		}
		width = value;
		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) {
			return height;
		}
		height = value;
		return chart;
	};

	chart.classAverage = function(value) {
		if (!arguments.length) {
			return classAverage;
		}
		classAverage = value;
		return chart;
	};

	return chart;
};
