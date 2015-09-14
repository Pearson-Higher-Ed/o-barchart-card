/*global*/
"use strict";

var d3 = require("../../bower_components/d3/d3");
var d3BarChart = require("./d3BarChart");

function BarChart(element, params) {
	if (!(this instanceof BarChart)) {
		throw new TypeError("Constructor BarChart requires \"new\"");
	}
	if (!element) {
		throw new TypeError("missing required argument: element");
	}
	if (typeof element === "string") {
		element = document.querySelector(element);
	}
	if (!element) {
		return;
	}

	if(!params.size || !params.data || !params.classAverage) {
		throw "No data provided. Please configuration data.";
	}

	var width = 400;
	var height = 200;
	switch(params.size) {
		case "small":
			throw new Error("Size cannot be small");
		case "medium":
			width = 400;
			height = 200;
			break;
		case "large":
			width = 400;
			height = 400;
			break;
		default:
			break;
	}
	var chartDiv = document.createElement("div");
	chartDiv.className = "o-barchartcard";

	this.card = document.createElement("div");
	this.card.appendChild(chartDiv);
	this.card.className = "o-card o-card--" + params.size;

	var barChart = d3BarChart().width(width).height(height).classAverage(params.classAverage);

	d3.select(chartDiv)
		.datum(params.data)
		.call(barChart);

	element.appendChild(this.card);

}

module.exports = BarChart;
