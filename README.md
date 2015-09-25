# o-barchartcard [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-barchart-card.svg)](https://travis-ci.org/Pearson-Higher-Ed/o-barchart-card)

## Use

To use, create a new instance of the card with a JSON configuration payload.

The JSON paramaters are as follows:

	 	data (required): data to be displayed in the bar chart
    title (required): title of the graph
    classAverage (required): The overall class average

This card works by building the card in a DOM node and then returning that node when .getDomNode() is called.

### Example HTML
	<div class="card-medium-wide" id="chart"></div>
	<script>
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
	</script>
