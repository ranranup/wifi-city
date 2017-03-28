$(document).ready(function() {
    App.init();
});
$(function () {
    // 负载量前十名AP
    var data = [29900, 171500, 106400, 129332, 144320, 221760, 301356, 181485, 322164, 219431];
    var chart = Highcharts.chart('top10', {
        title: {
            text: 'AP负载量排行榜Top 10'
        },
        subtitle: {
            text: '截止日期2016年12月3日'
        },
        xAxis: {
            categories: ['AP1', 'AP2', 'AP3', 'AP4', 'AP5', 'AP6', 'AP7', 'AP8', 'AP9', 'AP10']
        },
        yAxis:{
            title: {text: "AP负载量"}
        },
        series: [{
            type: 'column',
            name: "AP负载量",
            colorByPoint: true,
            data: data,
            showInLegend: false
        }],
        credits:{
             enabled:false // 禁用版权信息
        }
    });
     $('#plain').click(function () {
             chart.update({
                 chart: {
                     inverted: false,
                     polar: false
                 },
                 subtitle: {
                     text: '截止日期2016年12月3日'
                 }
             });
         });
     $('#inverted').click(function () {
         // chart.update 支持全部属性动态更新
         chart.update({
             chart: {
                 inverted: true,
                 polar: false
             },
             subtitle: {
                 text: '截止日期2016年12月3日'
             }
         });
     });
    $('#polar').click(function () {
            chart.update({
                chart: {
                    inverted: false,
                    polar: true
                },
                subtitle: {
                    text: '截止日期2016年12月3日'
                }
            });
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
	        text: '截止日期2016年12月3日'
	    },
	    plotOptions: {
	        column: {
	            depth: 25
	        }
	    },
	    xAxis: {
	        categories: ['AP11', 'AP12', 'AP13', 'AP14', 'AP15', 'AP16', 'AP17', 'AP18', 'AP19', 'AP20']
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
	    credits:{
		     enabled:false // 禁用版权信息
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
                ['AP1',   45.0],
                ['AP2',       26.8],
                {
                    name: 'AP5',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['AP3',    8.5],
                ['AP4',     6.2],
                ['AP11',   45.0],
                ['AP13',    8.5],
                ['AP14',     6.2],
                ['其他',   0.7]
            ]
        }]
    });	
});
