/*global*/

"use strict";

module.exports = function() {
	var _width = 400;
	var _height = 200;
	var _classAverage = 50;
	var _data = {};
	var _element = null;

	var top = _height / 4;
	var bottom = top * 3;
	var spacing = (bottom - top) / 5;

	function chart(dom) {

		var svg = createSVGElement("svg");
		svg.setAttribute("width", _width);
		svg.setAttribute("height", _height);

		var legend = createLegend();
		svg.appendChild(legend, spacing);

		var svgChart = createChart(svg);
		svg.appendChild(svgChart);

		var averages = createItemAverages();
		svg.appendChild(averages);

		var totalAverage = createTotalAverage();
		svg.appendChild(totalAverage);

		dom.appendChild(svg);
	}

	chart.width = function(value) {
		if (!arguments.length) {
			return _width;
		}
		_width = value;
		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) {
			return _height;
		}
		_height = value;
		return chart;
	};

	chart.classAverage = function(value) {
		if (!arguments.length) {
			return _classAverage;
		}
		_classAverage = value;
		return chart;
	};

	chart.data = function(value) {
		if (!arguments.length) {
			return _data;
		}
		_data = value;
		return chart;
	};

	chart.element = function(value) {
		if (!arguments.length) {
			return _element;
		}
		_element = value;
		return chart;
	};

	return chart;

	// Convienient functions are below for creating the whole chart.
	function createSVGElement(element) {
		return document.createElementNS("http://www.w3.org/2000/svg", element);
	}

	function createLegend() {
		var legend = createSVGElement("g");
		legend.setAttribute("class", "o-barchart__legend");
		var text = createSVGElement("text");
		text.setAttribute("x", 30);
		text.setAttribute("y", top);
		text.appendChild(document.createTextNode("100%"));
		legend.appendChild(text);
		text = createSVGElement("text");
		text.setAttribute("x", 30);
		text.setAttribute("y", bottom);
		text.appendChild(document.createTextNode("0%"));
		legend.appendChild(text);

		var i = 0;
		for(i = 0; i < 6; i++) {
			var line = createSVGElement("line");
			line.setAttribute("x1", 30);
			line.setAttribute("x2", _width - 50);
			line.setAttribute("y1", top + (i * spacing));
			line.setAttribute("y2", top + (i * spacing));
			legend.appendChild(line);
		}

		return legend;
	}

	function createChart(svg) {
		var chart = createSVGElement("g");

		_data.forEach(function(d, i) {
			var container = createSVGElement("g");
			container.setAttribute("transform", "translate("+ (((i+1) * (_width / 10)) + 5) + ")");

			var rect = createSVGElement("rect");
			rect.setAttribute("width", 30);
			rect.setAttribute("height", d.value);
			rect.setAttribute("y", bottom - d.value);
			container.appendChild(rect);

			var percent = createSVGElement("text");
			percent.setAttribute("y", bottom - d.value - 5);
			percent.setAttribute("x", 15);
			percent.setAttribute("class", "o-barchart__percent-value-text o-barchart-hidden-item text-value" + i);
			percent.appendChild(document.createTextNode(d.value + "%"));
			container.appendChild(percent);

			var name = createSVGElement("text");
			name.setAttribute("y", bottom + 10);
			name.setAttribute("x", 15);
			name.appendChild(document.createTextNode(d.name));
			container.appendChild(name);

			//rect events
			rect.onmouseover = function() {
				this.style.fill = "#19A431";
				percent.setAttribute("class", "");
				var itemAverage = svg.querySelector(".itemAverage" + i);
				itemAverage.setAttribute("class", "o-barchart__average itemAverage" + i);
				var totalAverage = svg.querySelector(".classAverage");
				totalAverage.setAttribute("class", "o-barchart__average classAverage o-barchart-hidden-item");
			};
			rect.onmouseout = function() {
				this.style.fill = "#5C656B";
				percent.setAttribute("class", "o-barchart-hidden-item");
				var itemAverage = svg.querySelector(".itemAverage" + i);
				itemAverage.setAttribute("class", "o-barchart__average o-barchart-hidden-item itemAverage" + i);
				var totalAverage = svg.querySelector(".classAverage");
				totalAverage.setAttribute("class", "o-barchart__average classAverage");
			};

			chart.appendChild(container);
		});
		return chart;
	}

	function createItemAverages() {
		var averages = createSVGElement("g");
		_data.forEach(function(d, i) {
			var container = createSVGElement("g");
			container.setAttribute("class", "o-barchart__average o-barchart-hidden-item itemAverage" + i);
			container.setAttribute("transform", "translate(" + (((i+1) * (_width / 10)) + 5) + ")");

			var line = createSVGElement("line");
			line.setAttribute("x1", 0);
			line.setAttribute("x2", 30);
			line.setAttribute("y1", bottom - d.average);
			line.setAttribute("y2", bottom-d.average);
			container.appendChild(line);

			var rect = createSVGElement("rect");
			rect.setAttribute("width", 80);
			rect.setAttribute("height", 20);
			rect.setAttribute("y", bottom - d.average - 10);
			rect.setAttribute("x", 30);

			var text = createSVGElement("text");
			text.setAttribute("y", bottom - d.average + 3);
			text.setAttribute("x", 110);
			text.appendChild(document.createTextNode(d.average + " Class Average"));

			container.appendChild(rect);
			container.appendChild(text);
			averages.appendChild(container);
		});

		return averages;
	}

	function createTotalAverage() {

		var average = createSVGElement("g");
		average.setAttribute("class", "o-barchart__average classAverage");
		var line = createSVGElement("line");
		line.setAttribute("x1", 30);
		line.setAttribute("x2", 320);
		line.setAttribute("y1", bottom - _classAverage);
		line.setAttribute("y2", bottom - _classAverage);
		average.appendChild(line);

		var rect = createSVGElement("rect");
		rect.setAttribute("width", 80);
		rect.setAttribute("height", 20);
		rect.setAttribute("y", bottom - _classAverage - 10);
		rect.setAttribute("x", 320);
		average.appendChild(rect);

		var text = createSVGElement("text");
		text.setAttribute("y", bottom - _classAverage + 3);
		text.setAttribute("x", 400);
		text.appendChild(document.createTextNode(_classAverage + "Class Average"));

		average.appendChild(text);

		return average;
	}
};
