// Use D3  to read samples.json

d3.json("samples.json").then((data) => {
  var names = data.names;
  var metadata = data.metadata;
  var samples = data.samples;
  // console.log(samples);

  function barname(name){
      // pull out name (id)
      console.log(samples)
      var i;
      var OTU_ids = [];
      var sample_values = [];
      var OTU_labels = [];






      // Find the id (name)
      for (i=0;i<samples.length;i++){
          if (samples[i].id === name){
              console.log("DID IT");


              // Find OTU ids, otu labels, and sample values
              for (j = 0; j<samples[i].otu_ids.length; j++){
                  OTU_ids.push(samples[i].otu_ids[j]);
                  sample_values.push(samples[i].sample_values[j]);
                  OTU_labels.push(samples[i].otu_labels[j]);

                  
              }
              //console.log(OTU_ids);

              break;
          }


      }
      var ids = OTU_ids.slice(0,9);
      ids = ids.map(String)
      var ids2 = []
      for (i=0;i<ids.length;i++){
          ids2.push("OTU "+ ids[i])
      }
      console.log(ids2)
      var values = sample_values.slice(0,9);
      var labels = OTU_labels.slice(0,9);
      
      var trace1 = {
          x: values,
          y: ids2,
          type: "bar",
          orientation: 'h',
          text: labels
      }
      var layout = {
          
      }
      Plotly.newPlot("bar", [trace1])

      var trace2 = {
          x: OTU_ids,
          y: sample_values,
          mode: 'markers',
          marker: {
              size: sample_values,
              color: OTU_ids
          },
          text: OTU_labels
      
      }
      Plotly.newPlot("bubble", [trace2])
  }
  function buildMetadata(name) {
      // Loop through metadata
     for (i = 0; i < metadata.length; i++){
          if (metadata[i].id === parseInt(name)){
              document.getElementById("subject_id").innerHTML = `id : ${metadata[i].id}`;
              document.getElementById("subject_ethnicity").innerHTML = `ethnicity : ${metadata[i].ethnicity}`;
              document.getElementById("subject_gender").innerHTML = `gender : ${metadata[i].gender}`;
              document.getElementById("subject_age").innerHTML = `age : ${metadata[i].age}`;
              document.getElementById("subject_location").innerHTML = `location : ${metadata[i].location}`;
              document.getElementById("subject_bbtype").innerHTML = `bbtype : ${metadata[i].bbtype}`;
              document.getElementById("subject_wfreq").innerHTML = `wfreq : ${metadata[i].wfreq}`;
          }
      }
  }
  
  
    // Use D3 to select the dropdown menu

  d3.selectAll("#selDataset").on("change", updatePlotly);
  var select = document.getElementById("selDataset")
  
  console.log(names)
  for (i = 0; i < names.length; i++){
      var nm = names[i];
      var el = document.createElement("option");
      el.text = nm;
      el.value = nm;
      select.appendChild(el);
  }
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");

      barname(dataset);
      buildMetadata(dataset);
  }


  //var attempt = barname("940")


});

// Create horizontal bar chart



// Make bubble chart

// Display sample metadata

// Display each key-value pair from the metadata JSON object sommewhere

// Update all plots when one is selected