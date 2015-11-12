data = [
    [
        {'name': 'A', value: 5},
        {'name': 'B', value: 10}
    ]
    ,
    [
        {'name': 'C', value: 12},
        {'name': 'D', value: 6}
    ]
];


//    ,
//    {'name': 'C', value: 12},
//    {'name': 'D', value: 6},
//    {'name': 'E', value: 5},
//    {'name': 'F', value: 9},
//    {'name': 'G', value: 2},
//    {'name': 'H', value: 4}

// Get an array with the max values of each group
function getMaxVals(data){
    var mArr = [];
    for(var i = 0; i < data.length; i++){
        var g = data[i];
        var m = d3.max(g, function(c){
            return +c.value;
        });
        mArr.push(m);
    }
    return mArr;
}

var _heightUnit = 10,
    _widthUnit = 20,
    _depthUnit = 5,
    _addedChartHeight = 10,
    _addedChartWidth = 15,
    _groupSpacing = 10;
    _maxColHeight = d3.max(getMaxVals(data), function(m){
        return +m * _heightUnit;
    }),
    _totalCols = data[0].length * data.length, // Assumes there is an equal amount of columns in each group
    _chartHeight = _maxColHeight + _addedChartHeight,
    _chartWidth = _widthUnit * _totalCols + _addedChartWidth;

// constructs a new linear scale with range and domain of [0,1]
var _scaleY = d3.scale.linear();
//
////Set the domain of a scale (Y coordinate)
_scaleY.domain([0, d3.max(getMaxVals(data), function(d){
    return +d;
})]);

_scaleY.range([d3.max(getMaxVals(data), function(d){
    return +d * _heightUnit;
}), 0]);

function _getPointsPolyTop(colValue){
    var pArr = [],
        yCoord = _scaleY(colValue) + _addedChartHeight;

    pArr.push("" + (_widthUnit - 9) + "," + (yCoord - 5) + "");
    pArr.push("" + (_widthUnit + 10) + "," + (yCoord - 5) + "");
    pArr.push("" + (_widthUnit - 1) + "," + yCoord + "");
    pArr.push("" + 0 + "," + yCoord + "");

    return pArr;
}

function _getPointsPolySide(colValue){
    var pArr = [],
        yCoord = _scaleY(colValue) + _addedChartHeight;

    pArr.push("" + (_widthUnit - 1) + "," + yCoord + "");
    pArr.push("" + (_widthUnit + 10) + "," + (yCoord - 5) + "");
    pArr.push("" + (_widthUnit + 10) + "," + (_maxColHeight + 5) + "");
    pArr.push("" + (_widthUnit - 1) + "," + (_maxColHeight + _addedChartHeight) + "");

    return pArr;
}

var chart = d3.select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", _chartWidth)
    .attr("height", _chartHeight);

function renderGroup(data){
//    var group = chart.append("div");
//    var bar = group.selectAll("g")
    console.log(chart.selectAll("g"));

    var bar = chart.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i){
                return "translate(" + i * _widthUnit + ",0)";
            });

    bar.append("rect")
        .attr("y", function(d){
            console.log(d);
            return _scaleY(d.value) + _addedChartHeight;
        })
        .attr("height", function(d){
            return _chartHeight - _scaleY(d.value) - _addedChartHeight;
        })
        .attr("width", _widthUnit - 1);
}

function render(){
    for(var i = 0; i < data.length; i++){
        console.log('renderGroup ' + i);
        renderGroup(data[i]);
        console.log('finished rendering group: ' + i);
    }
}

render();


//var bar = chart.selectAll("g")
//    .data()
//    .enter()
//    .append("g")
//    .attr("transform", function(d){
//
//
//        console.log(d);
//        console.log(i);
//        return "translate(" + i * _widthUnit + ",0)";
//    });
//
//bar.append("rect")
//    .attr("y", function(d){
//        console.log(d);
//        return _scaleY(d) + _addedChartHeight;
//    })
//    .attr("height", function(d){
//        return _chartHeight - _scaleY(d) - _addedChartHeight;
//    })
//    .attr("width", _widthUnit - 1);
//
//bar.append("polygon")
//    .attr("points", function(d){
//        pts = _getPointsPolyTop(d);
//        return pts.join(" ");
//});
//
//bar.append("polygon")
//    .attr("points", function(d){
//        pts = _getPointsPolySide(d);
//        return pts.join(" ");
//});
