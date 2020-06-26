function getPlot(id) {
    // The data from the JSON file
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        var wfreq = data.metedata.map(d => d.wfeq)
        console.log(`Frequency: ${wfreq}`)
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
        //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        var sampleValues = samples.sample_values.slice(0, 10);
        console.log(sampleValues);
        //Use`sample_values` as the values for the bar chart.
        
        //Use`otu_ids` as the labels for the bar chart.

        //Use`otu_labels` as the hovertext for the chart.



    });
}