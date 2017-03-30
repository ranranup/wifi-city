$(function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    //实现图片轮播
    var time = 1;
    setInterval(function(){
        if(time<4){
            $("#top-content").css("background", "url('../image/lou"+time+".png')");
            time++;
        }
        else{
            time=1;
        }
    },5000);

    var mydata = [];
    //mydata = [
    //    ['一楼电梯旁', 45.0],
    //    ['二楼会议室', 26.8],
    //    ['后勤部', 12.8],
    //    ['电影院', 8.5],
    //    ['奶茶店', 6.2],
    //    ['童装专卖店', 0.7]
    //];
     function unique (array) {
        var arr = [];
        var map = new Map();
        for(var i = 0; i < array.length; i++){
            if(!map.has(array[i])){
                arr.push(array[i]);
                map.set(array[i],true)
            }
        }
        return arr;
    };

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
    $(".page-content .active").html(name);
    $(".top-content .title").html(name+"AP详情");
    $.ajax({
        type: "POST",
        url: "/api/aps-detail/",
        data: {
            "poi": name
        },
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            //console.log(".......");
            console.log(data);
            data = data.ap;
                $(".top-content .content-AP").html("该区域位于北纬"+lat+"，东经"+lng+"。该区域是"+name+"，在该区域中一共有"+data.length+"个AP。(点击右侧AP可进入详情页面)");
                $(".left-content .sub-title01").html(name+"-AP数据对比图")
                $(".left-content .sub-title02").html(name+"-楼层接入设备数量图")
                $(".left-content .sub-title03").html(name+"-每个设备接入数量图")
                //通过循环将AP添加在轴线上
                for(var i=0;i<data.length;i++){
                    $("#timeline").append("<li> <a class='time'>"+data[i].ap_postion+"<span>"+data[i].ap_mac+data[i].ap_count+"</span></a></li>");
                }

                //点击跳转到单个AP详情页面
                $(".time").click(function(event) {
                    //console.log("aaa......");
                    //  console.log($(this).html());
                    var item_data = $(this).html();
                    var item_array = item_data.split("<span>");
                    var item ={};
                    item.ap_postion = item_array[0];
                    item.ap_mac = item_array[1].substr(0,17);
                    item.ap_count = item_array[1].substr(17).split("</span>")[0];
                    sessionStorage.setItem("ap_postion", item.ap_postion);
                    sessionStorage.setItem("ap_mac", item.ap_mac);
                    sessionStorage.setItem("ap_count",item.ap_count);
                    window.location.href="../views/Detail/detail.html"
                })


                var location_data=[];
                var all_location_data=[];
                var location_item_data=[];
                var all_count_data=[];
                var count_data=[];
                for(var i=0;i<data.length;i++){
                    location_data.push(data[i].ap_postion.substring(0,2));
                    all_location_data.push(data[i].ap_postion);
                    all_count_data.push(data[i].ap_count)
                }
                location_data = unique(location_data);// 数组去重;
                var location_count = {}
                for(var i=0;i<location_data.length;i++){
                    location_count[location_data[i]]=0;
                }
                for(var i=0;i<data.length;i++){
                    var temp = data[i].ap_postion.substring(0,2);
                    location_count[temp] = location_count[temp]+data[i].ap_count;//"{A楼:1106}"
                }
                for(var i=0;i<location_data.length;i++){
                    mydata[i] = [];
                    mydata[i][0] = location_data[i];
                    mydata[i][1] = location_count[location_data[i]];
                    count_data.push(location_count[location_data[i]])
                }

                console.log(location_data);


                console.log(location_count);
                console.log(all_location_data);

                //饼图
                $('#pieChart').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: name+'各区域AP负载量占比图（' + year + '年' + month + '月' + day + '日）'
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
                        name: '该区域所占比例',
                        data: mydata
                    }],
                    credits: {
                        enabled: false // 禁用版权信息
                    }
                });
                //条形图
                $("#barGraph").highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '每个楼层具体连入数量'
                    },

                    xAxis: {
                        categories: location_data,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '连接数(个)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:f} 个</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: '连接数量',
                        data: count_data
                    }],
                    credits: {
                        enabled: false // 禁用版权信息
                    }
                });
                $('#compareChart').highcharts({
                    title: {
                        text: '各个AP接入数量图',
                        x: -20 //center
                    },
                    subtitle: {
                        text: year + '年' + month + '月' + day + '日',
                        x: -20
                    },
                    xAxis: {
                        categories:all_location_data
                    },
                    yAxis: {
                        title: {
                            text: '接入设备数 (个)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '个'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: ['接入数量'],
                        data: all_count_data
                    }],
                    credits: {
                        enabled: false // 禁用版权信息
                    }
                });




        },
        error: function() {
            console.log("fail");
        }

    })




    //折线图

});



