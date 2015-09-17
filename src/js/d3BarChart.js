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
			var yScale = d3.scale.linear().domain([0, 100]).range([0, bottom-top]);

			//Create legend
			var legend = chart.append("g")
				.attr("class", "o-barchart-legend");
			legend.append("text")
				.attr("x", 30)
				.attr("y", top)
				.text("100%");
			legend.append("text")
				.attr("x", 30)
				.attr("y", bottom)
				.text("0%");
			legend.selectAll("line")
				.data([top, top+spacing, top+(spacing*2), top + (spacing*3), top + (spacing * 4), top + (spacing*5) -1])
			.enter().append("line")
				.attr("x1", 30)
				.attr("x2", width - 50)//100 for the "average"
				.attr("y1", function(d) { return d;})
				.attr("y2", function(d) { return d;});
			//Create legend

			//Create chart
			var bar = chart.append("g").selectAll("g")
				.data(data)
			.enter().append("g")
				.attr("transform", function(d, i) {
					return "translate(" + (((i+1) * (width / 10)) + 5) + ")";
				});

			bar.append("rect")
				.attr("width", 30)
				.attr("height", function(d) {
					return yScale(d.value);
				})
				.attr("y", function(d) {
					return bottom - yScale(d.value);
				})
				.on("mouseover", function(d, i) {
					this.style.fill = "#19A431";
					bar.select(".text-value" + i)
						.classed("hidden-item", false);
					chart.select(".classAverage")
						.classed("hidden-item", true);
					chart.select(".itemAverage" + i)
						.classed("hidden-item", false);
				})
				.on("mouseout", function(d, i) {
					bar.select(".text-value" + i)
						.classed("hidden-item", true);
					chart.select(".classAverage")
						.classed("hidden-item", false);
					chart.select(".itemAverage" + i)
						.classed("hidden-item", true);
					this.style.fill = "#5C656B";
				});

			//hidden percent value
			bar.append("text")
				.attr("y", function(d) {
					return bottom - yScale(d.value) - 5;
				})
				.attr("x", 15)
				.attr("class", function(d, i) {
					return "percent-value-text hidden-item text-value" + i;
				})
				.text(function(d) {
					return d.value + "%";
				});

			bar.append("text")
				.attr("y", bottom + 10)
				.attr("x", 15)
				.text(function(d){ return d.name;});

			//create chart

			//create item specific average
			var itemContainer = chart.append("g").selectAll("g")
				.data(data)
				.enter().append("g")
				.attr("class", function(d, i) {
					return "o-barchart-average hidden-item itemAverage" + i;
				})
				.attr("transform", function(d, i) {
					return "translate(" + (((i+1) * (width / 10)) + 5) + ")";
				});

			itemContainer.append("line")
				.attr("x1", 0)
				.attr("x2", 30)
				.attr("y1", function(d) {
					return bottom - yScale(d.average);
				})
				.attr("y2", function(d) {
					return bottom - yScale(d.average);
				});
			itemContainer.append("rect")
				.attr("width", 80)
				.attr("height", 20)
				.attr("y", function(d) {
					return bottom - yScale(d.average)-10;
				})//10 because we want to be in the middle with a 20 rect height
				.attr("x", 30);
			itemContainer.append("text")
				.attr("y", function(d) {
					return bottom - yScale(d.average)+3;
				})//+3 just to center the text better
				.attr("x", 110)
				.text(function(d) {
					return d.average + " Class Average";
				});

			//create class average

			var average = chart.append("g")
				.attr("class", "o-barchart-average classAverage");
			average.append("line")
				.attr("x1", 30)
				.attr("x2", 320)
				.attr("y1", bottom - yScale(classAverage))
				.attr("y2", bottom - yScale(classAverage));
			average.append("rect")
				.attr("width", 80)
				.attr("height", 20)
				.attr("y", bottom - yScale(classAverage) - 10)//10 because we want to be in the middle with a 20 rect height
				.attr("x", 320);
			average.append("text")
				.attr("y", bottom - yScale(classAverage) + 3)//+3 just to center the text better
				.attr("x", 400)
				.text("86 Class Average");
			//create class average

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
