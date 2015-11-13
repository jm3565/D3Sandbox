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
        'type': 'Headless'
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

    chart.clickGraphItem
});
