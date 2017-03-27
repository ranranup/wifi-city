$(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    $.ajax({
        url: "/api/ranklist/",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var tmp = data.poi;
            var categories = [];
            var data = [];
            for (let i = 1; i < tmp.length; i++) {
                for (let j = 0; j < tmp.length - 1; j++) {
                    if (tmp[j].total < 　tmp[j + 1].total) {
                        var mid = tmp[j].total;
                        tmp[j].total = tmp[j + 1].total;
                        tmp[j + 1].total = mid;
                        mid = tmp[j].name;
                        tmp[j].name = tmp[j + 1].name;
                        tmp[j + 1].name = mid;
                    }
                }
            }
            /*var categories = ['AP1', 'AP2', 'AP3', 'AP4', 'AP5', 'AP6', 'AP7', 'AP8', 'AP9', 'AP10']
            var data = [29900, 171500, 106400, 129332, 144320, 221760, 301356, 181485, 322164, 219431]*/
            for (let i = 0; i < 10; i++) {
                categories.push(tmp[i].name);
                data.push(tmp[i].total);
            }

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
                    categories: categories
                },
                yAxis: {
                    title: {
                        text: "AP负载量"
                    }
                },
                series: [{
                    name: "AP负载量",
                    data: data
                }],
                credits: {
                    enabled: false // 禁用版权信息
                }
            });


            // 负载量后十名AP
            var categories2 = [];
            var data2 = [];
            for (let i = tmp.length - 1; i > tmp.length - 11; i--) {
                categories2.push(tmp[i].name);
                data2.push(tmp[i].total);
            }
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
                    categories: categories2
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                series: [{
                    name: 'AP负载量',
                    data: data2
                }],
                credits: {
                    enabled: false // 禁用版权信息
                }
            });

            //3D饼图
            var sum = 0;
            var data3 = [];
            for (let m = 0; m < tmp.length; m++) {
                sum += tmp[m].total;
            }
            for (let i = 0; i < tmp.length; i++) {
                var ap = [];
                ap[0] = tmp[i].name;
                ap[1] = tmp[i].total / sum;
                data3[i] = ap;
            }
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
                    data: data3
                }]
            });
        },
        error: function() {
            console.log("fail");
        }
    });
});


/*var categories = ['AP1', 'AP2', 'AP3', 'AP4', 'AP5', 'AP6', 'AP7', 'AP8', 'AP9', 'AP10']
    var data = [29900, 171500, 106400, 129332, 144320, 221760, 301356, 181485, 322164, 219431]

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
            text: '截止日期2016年12月3日'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: categories
        },
        yAxis:{
        	title: {text: "AP负载量"}
		},
        series: [{
        	name: "AP负载量",
            data: data
        }],
        credits:{
		     enabled:false // 禁用版权信息
		}
    });*/

/* // 负载量后十名AP
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
	        text: '截止日期'+year+'年'+month+'月'+day+'日'
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
	});*/

/*//3D饼图
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
    });*/