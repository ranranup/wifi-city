// 百度地图API功能
$(function() {
	$.ajax({
			url : "/api/index" ,
			type : "GET" ,
			dataType : "json" ,
			success : function(data) {
				console.log(data);
				console.log("1111111");
			} ,
			error : function() {
				console.log("fail");
			}
	});
	
    var map = new BMap.Map("container");
    map.centerAndZoom(new BMap.Point(121.6, 29.821984), 10);
    map.enableScrollWheelZoom();
    var onePosition = new BMap.Point(121.682989, 29.804456),
        twoPosition = new BMap.Point(121.579006, 29.885259);

    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(onePosition, twoPosition);

    var points = [onePosition, twoPosition];

    var curve = new BMapLib.CurveLine(points, {
        strokeColor: "#00ACAC",
        strokeWeight: 3,
        strokeOpacity: 0.5
    }); //创建弧线对象
    map.addOverlay(curve); //添加到地图中
    curve.enableEditing(); //开启编辑功能
    
});
