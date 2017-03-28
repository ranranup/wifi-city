$(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var mydata = [];
    mydata = [
        ['一楼电梯旁', 45.0],
        ['二楼会议室', 26.8],
        ['后勤部', 12.8],
        ['电影院', 8.5],
        ['奶茶店', 6.2],
        ['童装专卖店', 0.7]
    ];

    /*
    (function($) {
        $.getUrlParam = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);*/

    var lng = sessionStorage.getItem("lng");
    var lat = sessionStorage.getItem("lat");
    var name = sessionStorage.getItem("name");
    console.log(name);
    console.log(lng);
    console.log(lat);
    $.ajax({
        type: "POST",
        url: "/api/aps-detail/",
        data: {
            "lng": lng,
            "lat": lat
        },
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log("fail");
        }

    })

    //饼图
    $('#pieChart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'xx商城各个AP负载量占总负载量的百分比（' + year + '年' + month + '月' + day + '日）'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: mydata
        }],
        credits: {
            enabled: false // 禁用版权信息
        }
    });

    //面积图
    Highcharts.setOptions({
        timezoneOffset: -8
    });
    $.getJSON('http://datas.org.cn/jsonp?filename=json/usdeur.json&callback=?', function(data) {
        $('#timeChart').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'xx商场负载总量的变化趋势图'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    '鼠标拖动可以进行缩放' : '手势操作进行缩放'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
            tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%Y-%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: '个数',
                data: data
            }],
            credits: {
                enabled: false // 禁用版权信息
            }
        });
    });

    //折线图
    $('#compareChart').highcharts({
        title: {
            text: 'AP负载对比图',
            x: -20 //center
        },
        subtitle: {
            text: year + '年' + month + '月' + day + '日',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '童装专卖店',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '奶茶店',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: '电影院',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: '后勤部',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }],
        credits: {
            enabled: false // 禁用版权信息
        }
    });
});