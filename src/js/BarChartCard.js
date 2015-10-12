/*global*/
"use strict";

var barChart = require("./barchart");

function BarChartCard(element, params) {
	if (!(this instanceof BarChartCard)) {
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

	if(!params.size || !params.data || !params.classAverage || !params.title) {
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
	chartDiv.className = "o-barchart";

	var chartTitle = document.createElement("h1");
	chartTitle.className = "o-barchart-title";
	chartTitle.innerHTML = params.title;

	chartDiv.appendChild(chartTitle);
	this.card = document.createElement("div");
	this.card.appendChild(chartDiv);
	this.card.className = "o-card o-card--" + params.size;

	var chart = barChart().width(400).height(200).classAverage(params.classAverage).data(params.data);
	chart(chartDiv);

	element.appendChild(this.card);

}

module.exports = BarChartCard;
