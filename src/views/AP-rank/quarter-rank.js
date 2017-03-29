$(document).ready(function() {
    App.init();
});
$(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 负载量前十名AP
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'top10',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: 'AP负载量排行榜Top 10'
        },
        subtitle: {
            text: '截止日期' + year + '年' + month + '月' + day + '日'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: ['维也纳国际酒店(象山影视城)3楼', '银苑大酒店D幢', '维也纳国际酒店(宁波环城南路店)3楼', '锦江之星酒店(宁波火车站店)1楼', '达蓬山大酒店4楼', '宁波南苑新城酒店D幢', '四季瑞丽酒店2楼', '达蓬山大酒店1楼', '四季永逸大饭店大厅', '真和大酒店5楼']
        },
        yAxis: {
            title: {
                text: "AP负载量"
            }
        },
        series: [{
            name: "AP负载量",
            data: [29900, 171500, 106400, 129332, 144320, 221760, 301356, 181485, 322164, 219431]
        }],
        credits: {
            enabled: false // 禁用版权信息
        }
    });

    // 负载量后十名AP
    $('#bottom10').highcharts({
        chart: {
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'AP负载量排行榜bottom 10'
        },
        subtitle: {
            text: '截止日期' + year + '年' + month + '月' + day + '日'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: ['维也纳国际酒店(宁波环城南路店)1楼', '四季瑞丽酒店B幢', '锦江之星酒店(宁波火车站店)2楼', '真和大酒店3楼', '宁波饭店7楼', '海俱大酒店3楼', '首南大酒店2楼', '银苑大酒店C幢', '日月宾馆4楼', '宁波朗逸大酒店E幢']
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'AP负载量',
            data: [2, 3, 0, 4, 0, 5, 1, 4, 6, 3]
        }],
        credits: {
            enabled: false // 禁用版权信息
        }
    });

    //3D饼图
    $('#pie').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'AP总负载占有率'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '负载量占有率',
            data: [
                ['四季瑞丽酒店A幢', 45.0],
                ['银苑大酒店D幢', 26.8], {
                    name: 'AP5',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['维也纳国际酒店(宁波环城南路店)3楼', 8.5],
                ['宁波大酒店6楼', 6.2],
                ['达蓬山大酒店4楼', 45.0],
                ['宁波南苑新城酒店D幢', 8.5],
                ['日月宾馆4楼', 6.2],
                ['其他', 0.7]
            ]
        }]
    });
});