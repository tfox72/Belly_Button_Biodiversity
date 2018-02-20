
// Populate the selected elements with the data


namesUrl = "/names";
Plotly.d3.json(namesUrl, function (error, response) {
    if (error) console.log(error);
    namesList = response;
    console.log(namesList);
    $datasetSelectList = document.getElementById("datasetSelect");
    for (var i = 0; i < namesList.length; i++) {
        var $option = document.createElement("option");
        $option.value = namesList[i];
        $option.text = namesList[i];
        $datasetSelectList.appendChild($option);
    }
    optionChanged(namesList[0]);
});


function optionChanged(DataToPlot) {
    var metadataUrl = `/metadata/${DataToPlot}`
    var pieChartUrl = `/piechart/${DataToPlot}`
    var wfreqUrl = `/wfreq/${DataToPlot}`;
    var bubbleChartUrl = `/bubblechart/${DataToPlot}`

    // add metadata to page
    Plotly.d3.json(metadataUrl, function (error, response){
        addMetadata(response)
    });

     // chart data to page
     Plotly.d3.json(pieChartUrl, function (error, response){
        renderPieChart(response);
    });

    // Plotly.d3.json(metadataUrl, function (error, response){
    //     renderGuage(response.WFREQ);
    // });
    
    // Plotly.d3.json(bubbleChartUrl, function (error, response){
    //     renderBubbleChart(response);
    // });
}

function addMetadata(metadataDict) {
    $metadataCard = document.getElementById('metadataCard');
    $metadataCard.innerHTML = `<p>Age: ${metadataDict.AGE} <br>
    BBType: ${metadataDict.BBTYPE}<br>
    Ethnicity: ${metadataDict.ETHNICITY}<br>
    Gender: ${metadataDict.GENDER}<br>
    Location: ${metadataDict.LOCATION}<br>
    Sample ID: ${metadataDict.SAMPLEID}<br>`  
}

function renderPieChart(responseDict) {
    var data = [{
        values: responseDict.sample_values,
        labels: responseDict.otu_ids,
        hovertext: responseDict.otu_descriptions,
        type: 'pie'
    }];

    var layout = {
        title: '% of Samples Observed',
    };

    Plotly.newPlot('pieChart', data, layout);
}