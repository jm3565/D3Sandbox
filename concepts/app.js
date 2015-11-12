data = [
    {'name': 'A', value: 10}
    ,
    {'name': 'B', value: 5}
    ,
    {'name': 'C', value: 12},
    {'name': 'D', value: 6},
    {'name': 'E', value: 5},
    {'name': 'F', value: 9},
    {'name': 'G', value: 2},
    {'name': 'H', value: 4}
];

var _heightUnit = 10,
    _widthUnit = 20,
    _depthUnit = 5,
    _chartHeight = d3.max(data, function(d){
        return _heightUnit * +d.value;
    }),
    _chartWidth = _widthUnit * data.length;

// constructs a new linear scale with range and domain of [0,1]
var _scaleY = d3.scale.linear();

//Set the domain of a scale (Y coordinate)
_scaleY.domain([0, d3.max(data, function(d){
    return +d.value;
})]);

_scaleY.range([d3.max(data, function(d){
    return +d.value * _heightUnit;
}), 0]);

var chart = d3.select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", _chartWidth)
    .attr("height", _chartHeight);

var bar = chart.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i){
        return "translate(" + i * _widthUnit + ",0)";
    });

bar.append("rect")
    .attr("y", function(d){
        return _scaleY(d.value);
    })
    .attr("height", function(d){
        return _chartHeight - _scaleY(d.value);
    })
    .attr("width", _widthUnit - 1);
