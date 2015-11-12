data = [
    {'name': 'A', value: 5}
    ,
    {'name': 'B', value: 10}
    ,
    {'name': 'C', value: 12},
    {'name': 'D', value: 6},
    {'name': 'E', value: 5},
    {'name': 'F', value: 9},
    {'name': 'G', value: 2},
    {'name': 'H', value: 4}
];

var _heightUnit = 20,
    _widthUnit = 40,
    _depthUnit = 10,
    _addedChartHeight = 20,
    _addedChartWidth = 30,
    _maxColHeight = d3.max(data, function(d){
        return +d.value * _heightUnit;
    }),
    _chartHeight = _maxColHeight + _addedChartHeight,
    _chartWidth = _widthUnit * data.length + _addedChartWidth;

// constructs a new linear scale with range and domain of [0,1]
var _scaleY = d3.scale.linear();

//Set the domain of a scale (Y coordinate)
_scaleY.domain([0, d3.max(data, function(d){
    return +d.value;
})]);

_scaleY.range([d3.max(data, function(d){
    return +d.value * _heightUnit;
}), 0]);

function _getPointsPolyTop(colValue){
    var pArr = [],
        yCoord = _scaleY(colValue) + _addedChartHeight;

    pArr.push("" + (_widthUnit * 0.3) + "," + (yCoord - _depthUnit) + "");
    pArr.push("" + (_widthUnit * 1.3) + "," + (yCoord - _depthUnit) + "");
    pArr.push("" + (_widthUnit) + "," + yCoord + "");
    pArr.push("" + 0 + "," + yCoord + "");

    return pArr;
}

function _getPointsPolySide(colValue){
    var pArr = [],
        yCoord = _scaleY(colValue) + _addedChartHeight;

    pArr.push("" + (_widthUnit - 1) + "," + yCoord + "");
    pArr.push("" + (_widthUnit * 1.3) + "," + (yCoord - _depthUnit) + "");
    pArr.push("" + (_widthUnit * 1.3) + "," + (_maxColHeight + _depthUnit) + "");
    pArr.push("" + (_widthUnit - 1) + "," + (_maxColHeight + _addedChartHeight) + "");

    return pArr;
}

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
        return _scaleY(d.value) + _addedChartHeight;
    })
    .attr("height", function(d){
        return _chartHeight - _scaleY(d.value) - _addedChartHeight;
    })
    .attr("width", _widthUnit - 1);

bar.append("polygon")
    .attr("points", function(d){
        pts = _getPointsPolyTop(d.value);
        return pts.join(" ");
});

bar.append("polygon")
    .attr("points", function(d){
        pts = _getPointsPolySide(d.value);
        return pts.join(" ");
});
