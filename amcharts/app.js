var data = [
    {
        'name': 'A',
        'value': 4
    },
    {
        'name': 'B',
        'value': 6
    },
    {
        'name': 'C',
        'value': 2
    },
    {
        'name': 'D',
        'value': 8
    }];

AmCharts.ready(function(){
    var chart = new AmCharts.AmSerialChart();
    chart.dataProvider = data;
    chart.categoryField = 'name';

    var graph = new AmCharts.AmChart();
    graph.valueField = 'value';
    graph.type = 'column';
    chart.addGraph(graph);

    chart.write('chart');
});
