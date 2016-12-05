$(function() {
	var map = new BMap.Map("container", {enableMapClick : false}); // 创建地图实例并关闭默认地图POI事件
	
	var point = new BMap.Point(121.6, 29.821984);
	map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
	map.enableScrollWheelZoom(); // 允许滚轮缩放
	map.setMapStyle({style : 'dark'});
	
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
	marker.enableDragging(); // 设置点可拖拽
	
	/*
	 * var points = []; $(function() { $.ajax({ url: 'json/point.json', success:
	 * function(data) { points = data; console.log(points); } }) })
	 */
	
	var points = [{
				"lng" : 121.682989,
				"lat" : 29.804456,
				"count" : 1000
			}, {
				"lng" : 121.680201,
				"lat" : 29.78392,
				"count" : 510
			}, {
				"lng" : 121.645309,
				"lat" : 29.748794,
				"count" : 150
			}, {
				"lng" : 121.579006,
				"lat" : 29.885259,
				"count" : 400
			}, {
				"lng" : 121.592496,
				"lat" : 29.880364,
				"count" : 1000
			},
	
			{
				"lng" : 121.555134,
				"lat" : 29.897363,
				"count" : 60
			}, {
				"lng" : 121.609405,
				"lat" : 29.912858,
				"count" : 180
			}, {
				"lng" : 121.579006,
				"lat" : 29.885259,
				"count" : 800
			}, {
				"lng" : 121.635028,
				"lat" : 29.924854,
				"count" : 110
			}, {
				"lng" : 121.603217,
				"lat" : 29.870361,
				"count" : 70
			},
	
			{
				"lng" : 121.579006,
				"lat" : 29.885259,
				"count" : 420
			}, {
				"lng" : 121.545331,
				"lat" : 29.877311,
				"count" : 40
			}, {
				"lng" : 121.517606,
				"lat" : 29.85621,
				"count" : 270
			}, {
				"lng" : 121.586426,
				"lat" : 29.859608,
				"count" : 230
			}, {
				"lng" : 121.550288,
				"lat" : 29.805446,
				"count" : 600
			},
	
			{
				"lng" : 121.619161,
				"lat" : 29.937494,
				"count" : 80
			}, {
				"lng" : 121.579006,
				"lat" : 29.885259,
				"count" : 150
			}, {
				"lng" : 121.567682,
				"lat" : 29.860679,
				"count" : 250
			}, {
				"lng" : 121.622719,
				"lat" : 29.862048,
				"count" : 210
			}, {
				"lng" : 121.573505,
				"lat" : 29.838737,
				"count" : 10
			},
	
			{
				"lng" : 121.563129,
				"lat" : 29.828899,
				"count" : 510
			}, {
				"lng" : 121.551881,
				"lat" : 29.820615,
				"count" : 70
			}, {
				"lng" : 121.544197,
				"lat" : 29.812816,
				"count" : 110
			}, {
				"lng" : 121.553433,
				"lat" : 29.823484,
				"count" : 350
			}, {
				"lng" : 121.610195,
				"lat" : 29.891873,
				"count" : 220
			},
	
			{
				"lng" : 121.577891,
				"lat" : 29.890862,
				"count" : 40
			}, {
				"lng" : 121.579006,
				"lat" : 29.885259,
				"count" : 50
			}, {
				"lng" : 121.543819,
				"lat" : 29.868502,
				"count" : 30
			}, {
				"lng" : 121.55131,
				"lat" : 29.833056,
				"count" : 1000
			}];
	
	for (var i = 0; i < points.length; i++) {
		var hotPoint = new BMap.Point(points[i].lng, points[i].lat);
	
		// 自定义覆盖物
		var myIcon = new BMap.Icon("image/point.png", new BMap.Size(20, 20), {
					anchor : new BMap.Size(12, 14) // 中心点设置
				});
	
		var marker = new BMap.Marker(hotPoint, {icon : myIcon}); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
	
		marker.addEventListener("click", getAttr);
		function getAttr() {
			var p = marker.getPosition(); // 获取marker的位置
			p.id = "123";
			console.log("点的位置是" + hotPoint.lng + "," + hotPoint.lat);
			console.log("marker的位置是" + p.lng + "," + p.lat);
			location.href = "area-AP.html";// 转到二级页面
		}
	}
	
	if (!isSupportCanvas()) {
		alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
	}
	
	heatmapOverlay = new BMapLib.HeatmapOverlay({"radius" : 15});
	map.addOverlay(heatmapOverlay);
	heatmapOverlay.setDataSet({
				data : points,
				max : 100
			});
	// 显示热力图
	heatmapOverlay.show();
	function setGradient() {
		var gradient = {};
		var colors = document.querySelectorAll("input[type='color']");
		colors = [].slice.call(colors, 0);
		colors.forEach(function(ele) {
					gradient[ele.getAttribute("data-key")] = ele.value;
				});
		heatmapOverlay.setOptions({
					"gradient" : gradient
				});
	}
	// 判断浏览区是否支持canvas
	function isSupportCanvas() {
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}
});