// 百度地图API功能
$(function() {
    var map = new BMap.Map("container");
    map.centerAndZoom(new BMap.Point(121.6, 29.821984), 11);
    map.enableScrollWheelZoom();    

    /*添加地图类型和缩略图*/
    var mapType = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
    //添加地图类型和缩略
    map.addControl(mapType);          //2D图，卫星图
    map.addControl(overView);          //添加默认缩略地图控件
    map.addControl(overViewOpen);      //右下角，打开 
    
    $('#btn-macInfo').on('click',function(){
        onShowMacTrack($("#macId").val());
        console.log($("#macId").val());
    });

    function onShowMacTrack(macId) {
        $.ajax({
                url : "/api/device-trail?mac=" + macId,
                type : "GET" ,
                dataType : "json" ,
                success : function(data) {
                    console.log(data);
                    var positions = [];
                    positinsDate = [];
                    for(var i = 0; i < data.points.length; i++) {
                        positions.push(new BMap.Point(data.points[i].ap_lng, data.points[i].ap_lat));
                        positinsDate.push("此刻时间：" + data.points[i].timestamp);
                    }

                    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
                    var length = positions.length;
                    driving.search(positions[0], positions[length-1], {waypoints:positions.slice(1,length-1)});//waypoints表示途经点
                
                    var opts = {
                        width : 50,     // 信息窗口宽度
                        height: 10,     // 信息窗口高度
                        backgroundColor: "#ccc",
                        title : "信息窗口" , // 信息窗口标题
                        enableMessage:true//设置允许信息窗发送短息
                    };

                    for(var i = 0;i < positions.length;i++){
                        var myPoint = positions[i];
                        var content = positinsDate[i];

                        var myIcon = new BMap.Icon("../../image/point.png", new BMap.Size(20, 20), {
                                    anchor : new BMap.Size(12, 30), // 中心点设置
                                });

                        var marker = new BMap.Marker(myPoint, {icon : myIcon}); // 创建标注
                        marker.setZIndex(999);
                        map.addOverlay(marker);               // 将标注添加到地图中
                        addMouseoverHandler(content,marker);
                        addMouseoutHandler(content,marker);
                    }
                    function addMouseoverHandler(content,marker){
                        marker.addEventListener("mouseover",function(e){
                            openInfo(content,e);
                        });
                    };
                    function addMouseoutHandler(content,marker){
                        marker.addEventListener("mouseout",function(e){
                            map.closeInfoWindow();
                        });
                    };
                    function openInfo(content,e){
                        var p = e.target;
                        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    };
                } ,
                error : function() {
                    console.log("fail");
                }
        });
    }
});



/*var  group = Math.floor( positions.length /11 ) ;
var mode = positions.length %11 ;

var driving = new BMap.DrivingRoute( map, {onSearchComplete: function(results){
      if (driving.getStatus() == BMAP_STATUS_SUCCESS){
             var plan = driving.getResults().getPlan(0);
             var  num = plan.getNumRoutes();
             alert("plan.num ："+num);
             for(var j =0;j<num ;j++){
              var pts= plan.getRoute(j).getPath();    //通过驾车实例，获得一系列点的数组
              var polyline = new BMap.Polyline(pts);    
              map.addOverlay(polyline); 
             }
      }
}});
for(var i =0;i<group;i++){
   var waypoints = positions.slice(i*11+1,(i+1)*11);
   driving.search(positions[i*11], positions[(i+1)*11],{waypoints:waypoints});//waypoints表示途经点
}   
if( mode != 0){
 var waypoints = positions.slice(group*11,positions.length-1);//多出的一段单独进行search
 driving.search(positions[group*11],positions[positions.length-1],{waypoints:waypoints});
}*/