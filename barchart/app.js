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

var barWidth = 20,
    barHeight = 20;

var _scale2 = d3.scale.linear();
//    .range([0, barWidth]);

var chart = d3.select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", d3.max(data, function(d){
        return +d.value * barWidth;
    }));


_scale2.domain([0, d3.max(data, function(d){
    return +d.value;
})]);

_scale2.range([0, d3.max(data, function(d){
    return +d.value * barWidth;}
)]);

chart.attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i){
        return "translate(0," + i * barHeight + ")";
    });

bar.append("rect")
    .attr("width", function(d){
        return _scale2(+d.value);
    })
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d){
        return _scale2(+d.value) - 3;
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d){
        return +d.value;
    });



