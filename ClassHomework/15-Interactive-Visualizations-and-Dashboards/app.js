function getPlot(id) {
    // The data from the JSON file
    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        var labels = data.samples[0].otu_labels.slice(0, 10);
        console.log(labels)
        //top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's 
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
        // get labels for the plot
        var labels = data.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`)
        //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.       
        //Use`sample_values` as the values for the bar chart.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#:~:text=The%20slice()%20method%20returns,of%20items%20in%20that%20array.
        //Use`otu_ids` as the labels for the bar chart.
        //Use`otu_labels` as the hovertext for the chart.
        // Trace1 for the Data
        var trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: "purple"
            },
            type: "bar",
            orientation: "h"
        };
        var data = [trace1];
        Plotly.newPlot("bar", data, trace1);
        //Create a bubble chart that displays each sample.
        //Use`otu_ids` for the x values.
        //Use`sample_values` for the y values.
        //Use`sample_values` for the marker size.
        //Use`otu_ids` for the marker colors.
        //Use`otu_labels` for the text values.
        //The Bubble Chart
        var trace1 = {
            x: sampleValues.otu_ids,
            y: sampleValues.sample_values,
            text: sampleValues.otu_labels,
            mode: "markers",
            marker: {
                color: sampleValues.otu_ids,
                size: sampleValues.sample_values
            },
        };


        //creating data variable 
        var data1 = [trace1];

        //set the layout for the bubble plot
        var layout_2 = {
            title: "Bubble Chart",
            showlegend: false,
            height: 600,
            width: 1000
        };

        //create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2);

    });
}

//Display each key - value pair from the metadata JSON object somewhere on the page.
//Update all of the plots any time that a new sample is selected.
//Display the sample metadata, i.e., an individual's demographic information.
function getInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data) => {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
        var demoGraphic = d3.select("#sample-metadata");

        // empty the demographic info
        demoGraphic.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demoGraphic.append("h5").text(key[0].toUpperCase() + ": " + key[1]);
        });
    });
}
// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the function for the initial data rendering
function updatePage() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data) => {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        // display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

updatePage();