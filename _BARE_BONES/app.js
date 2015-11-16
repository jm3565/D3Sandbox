data = [
    {'name': 'A', value: 5},
    {'name': 'B', value: 10},
    {'name': 'C', value: 12},
    {'name': 'D', value: 6},
    {'name': 'E', value: 5},
    {'name': 'F', value: 9},
    {'name': 'G', value: 2},
    {'name': 'H', value: 4}
];

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
var _scaleX = d3.scale.ordinal();

_scaleX.rangeBands([0, _chartWidth]);
_scaleX.domain(data.map(function(d){
    return d.name;
}));

//Set the domain/range of a scale (for the Y coordinate of the columns)
_scaleY.domain([0, d3.max(data, function(d){
    return +d.value;
})]);

_scaleY.range([d3.max(data, function(d){
    return +d.value * _heightUnit;
}), 0]);

var xAxis = d3.svg.axis()
    .scale(_scaleX)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(_scaleY)
    .orient("left");

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

chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + _chartHeight + ")")
      .call(xAxis);

chart.append("g")
  .attr("class", "y axis")
  .call(yAxis);

chart.selectAll(".bar")
  .data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return _scaleX(d.name); })
  .attr("y", function(d) { return _scaleY(d.value) + _addedChartHeight; })
  .attr("height", function(d) { return _chartHeight - _scaleY(d.value); })
  .attr("width", _scaleX.rangeBand());

//var bar = chart.selectAll("g")
//    .data(data)
//    .enter()
//    .append("g")
//    .attr("transform", function(d, i){
//        return "translate(" + i * _widthUnit + ",0)";
//    });

//bar.append("rect")
//    .attr("y", function(d){
//        return _scaleY(d.value) + _addedChartHeight;
//    })
//    .attr("height", function(d){
//        return _chartHeight - _scaleY(d.value) - _addedChartHeight;
//    })
//    .attr("width", _widthUnit - 1);
//
//bar.append("polygon")
//    .attr("points", function(d){
//        pts = _getPointsPolyTop(d.value);
//        return pts.join(" ");
//});
//
//bar.append("polygon")
//    .attr("points", function(d){
//        pts = _getPointsPolySide(d.value);
//        return pts.join(" ");
//});
//
//bar.append("text")
//    .attr("x", (_scaleX.rangeBand() / 2) - 10)
//    .attr("y", function(d){
//        return _scaleY(d.value) + 25;
//    })
//    .attr("dy", ".75em")
//    .text(function(d){
//        return d.value;
//});
