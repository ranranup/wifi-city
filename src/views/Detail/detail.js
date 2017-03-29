$(function() {
    var name = sessionStorage.getItem("name");
    var lng = sessionStorage.getItem("lng");
    var lat = sessionStorage.getItem("lat");
    /*var ap_mac = sessionStorage.getItem("ap_mac");
    var ap_position = sessionStorage.getItem("ap_position");*/
    var ap_position = "";
    $(".top-content .top-left .title").html(name + "AP1的详情");
    $(".top-content .top-left .content-AP").html("该设备位于（" + lng + "," + lat + "）的" + name + ap_position);
    $(".top-content .top-right h1").html("300");
    $("#container .sub-title").html("该AP负载总量的变化趋势图");

    //面积图
    Highcharts.setOptions({
        timezoneOffset: -8
    });
    var data = [];
    /*data = [
                    ["09:00", 13],
                    ["10:00", 45],
                    ["11:00", 45],
                    ["12:00", 25],
                    ["13:00", 35],
                    ["14:00", 90]
                ];*/
    var messgae = {
        "count": [45, 39, 40, 52, 92],
        "hour_from": 9,
        "hour_to": 14
    };
    var hour_from = Number(messgae.hour_from);
    var hour_to = Number(messgae.hour_to);
    var count = messgae.count;

    var time = [];  
    var tmp = 0;
    for (let i = hour_from; i < hour_to + 1; i++) {
        if (i < 10) {
            time[tmp] = "0" + i + ": 00";
        } else {
            time[tmp] = i + ": 00";
        }
        tmp++;
    }
    for (let j = 0; j < count.length; j++) {
        let tmp_data = [];
        tmp_data[0] = time[j];
        tmp_data[1] = count[j];
        data[j] = tmp_data;
    }
    

    $('#timeChart').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: name + '负载总量的变化趋势图'
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

    /* $.ajax({
         url: 'api/single-ap-detail/',
         type: "GET",
         dataType: "json",
         success: function(data) {

             $('#timeChart').highcharts({
                 chart: {
                     zoomType: 'x'
                 },
                 title: {
                     text: name + '负载总量的变化趋势图'
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
         },
         error: function() {
             console.log("fail");
         }
     });*/

})