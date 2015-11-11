//var data = [4, 5, 12, 6, 5, 9, 2, 4];
//
//var h1 = d3.select("body")
//            .append("h1")
//            .text("Hello World!");
//
//// This function is going to use a linear scale to eliminate the
//// harcoded 10 value given to scale the widths of the divs that compose the graph
//// Here we are saying that the specified max with of the chart will be 420
//var _scale = d3.scale.linear()
//    .domain([0, d3.max(data)])
//    .range([0,300]);
//
//
//// This is going to create the chart
//d3.select("body")
//    .append("div").attr("class", "chart")
//    .selectAll("div")
//        .data(data)
//        .enter()
//        .append("div")
//            .style("width", function(d){
//                return _scale(d) + "px";
//            })
//            .text(function(d){
//                return d;
//            });

// Pulling the data from a json file
data = [
    {'name': 'A', value: 4},
    {'name': 'B', value: 5},
    {'name': 'C', value: 12},
    {'name': 'D', value: 6},
    {'name': 'E', value: 5},
    {'name': 'F', value: 9},
    {'name': 'G', value: 2},
    {'name': 'H', value: 4}
];


var width = 420,
    barHeight = 20;

var _scale2 = d3.scale.linear()
    .range([0, width]);

var chart = d3.select("body")
    .append("svg").attr("class", "chart").attr("width", width);


    _scale2.domain([0, d3.max(data, function(d) { return +d.value; })]);

    chart.attr("height", barHeight * data.length);

   var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return _scale2(+d.value); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return _scale2(+d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return +d.value; });




