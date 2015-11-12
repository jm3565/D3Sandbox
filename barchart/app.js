data = [
    {'name': 'A', value: 10}
    ,
    {'name': 'B', value: 5}
//    ,
//    {'name': 'C', value: 12},
//    {'name': 'D', value: 6},
//    {'name': 'E', value: 5},
//    {'name': 'F', value: 9},
//    {'name': 'G', value: 2},
//    {'name': 'H', value: 4}
];

var _heightUnit = 10,
    _widthUnit = 20,
    _depthUnit = 5;

// constructs a new linear scale with range and domain of [0,1]
var _scale = d3.scale.linear();

//Set the domain of a scale (Y coordinate)
_scale.domain([0, d3.max(data, function(d){
    return +d.value;
})]);

_scale.range([d3.max(data, function(d){
    return +d.value * _heightUnit;
}), 0]);

// Create the chart tag and give it a
// width = max value in data * constant width unit for bars
// height = constant height for bars * the number of elements (bars) in the data
var chart = d3.select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", _widthUnit * data.length)
    .attr("height", d3.max(data, function(d){
        return _heightUnit * +d.value;
    }));

// Create all the gra
var bar = chart.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i){
        return "translate(" + i * _widthUnit + ",0)";
    });

bar.append("rect")
    .attr("width", _widthUnit - 1)
    .attr("height", function(d){
        return _scale(+d.value);
    });

//bar.append("rect")
//    .attr("width", function(d){
//        return _scale(+d.value);
//    })
//    .attr("height", _heightUnit - 1);
//
//
//
//bar.append("text")
//    .attr("x", function(d){
//        return _scale(+d.value) - 3;
//    })
//    .attr("y", _heightUnit / 2)
//    .attr("dy", ".35em")
//    .text(function(d){
//        return +d.value;
//    });



