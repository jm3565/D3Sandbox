var data = [4, 5, 12, 6, 5, 9, 2, 4];

var h1 = d3.select("body")
            .append("h1")
            .text("Hello World!");

// This function is going to use a linear scale to eliminate the
// harcoded 10 value given to scale the widths of the divs that compose the graph
// Here we are saying that the specified max with of the chart will be 420
var _scale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0,300]);


// This is going to create the chart
d3.select("body")
    .append("div").attr("class", "chart")
    .selectAll("div")
        .data(data)
        .enter()
        .append("div")
            .style("width", function(d){
                return _scale(d) + "px";
            })
            .text(function(d){
                return d;
            });

