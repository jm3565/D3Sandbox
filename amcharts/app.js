var data = [
    {
        'name': 'A',
        'value': 4,
        'type': 'Headless'
    },
    {
        'name': 'B',
        'value': 6,
        'type': 'Gui'
    },
    {
        'name': 'C',
        'value': 2,
        'type': 'Headless',
        'subdata': [{'name': 'a', 'value': 1},
            {'name': 'b', 'value': 2},
            {'name': 'c', 'value': 3}]
    },
    {
        'name': 'D',
        'value': 8,
        'type': 'Gui'
    }];

var chart;

AmCharts.ready(function(){
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = data;
    chart.categoryField = 'name';
    chart.depth3D = 15;
    chart.angle = 30;

    // Asjust the background grid
    var xAxis = chart.categoryAxis;
    xAxis.autoGridCount = false;
    xAxis.gridCount = data.length;
    xAxis.gridPosition = 'start';

    var graph = new AmCharts.AmGraph();
    graph.valueField = 'value';
    graph.type = 'column';
    graph.fillAlphas = 0.8;
    graph.balloonText = '[[category]]: <b>[[value]]</b>'

    chart.addGraph(graph);
    chart.write('chartDiv');

    chart.addListener("clickGraphItem", function(e){
        if(e.item.dataContext.subdata != undefined){
            console.log(e);
            e.chart.dataProvider = e.item.dataContext.subdata;
            e.chart.validateData();
        }
    });

    chart.addListener("clickGraph", function(e){
        console.log(e);
    })
});
