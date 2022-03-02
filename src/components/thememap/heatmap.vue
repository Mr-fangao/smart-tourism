<template>
  <div class="com-heatmap">
    <div id="map"></div>
  </div>
</template>
<script>
import heatMapData from "../../assets/json/heatMapData.json";
export default {
  name: "heatmap",
  mounted() {
    this.initmap();
  },
 methods: {
    initmap() {
      this.$mapboxgl.accessToken =
         "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
        var map = new this.$mapboxgl.Map({
            container: 'map',
             style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
            center: [110, 40],
            zoom: 5,
        })
      map.on("load", function () {
       map.addSource('heatDataSource', {
          "type": "geojson",
          // "data": "./data/heatMapData.json",
          "data": heatMapData,
        });
        map.addLayer({
          //此id可随意设置，但是要唯一
          "id": "testdatalayer",
          //指定类型为热力图
          "type": "heatmap",
          //指定数据来源，要和addSource中的id保持一致
          "source": "heatDataSource",
          //最大显示等级
          "maxzoom": 12,
          //设置绘制效果
          "paint": {
            //通过mag属性的值来设置每一个点对热力图强度的贡献
            //数值在0~6之间线性变化时,热力图的强度从0~1进行线性变化
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "AVG_SALARY"],
              3, 0,
              35, 1
            ],
            //根据地图的缩放级别来设置热力图的强度
            //缩放级别在0~9之间进行线性变化的时候，热力图的强度从1~3进行线性变化
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 1,
              12, 3
            ],
            //根据密度来设置热力图颜色
            //密度在0~1之间线性变换时，颜色也跟随变换
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.3, "rgb(103,169,207)",
              0.6, "rgb(209,229,240)",
              0.9, "rgb(253,219,199)",
              1, "rgb(239,138,98)",
            ],
            //根据地图的缩放级别来设置热力图的半径
            //缩放级别在0~9之间进行线性变化的时候，热力图的半径从2~20进行线性变化
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 1,
              12, 20
            ],
            //设置热力图的透明度，在zoom处于7~9间将热力图逐渐的透明，在zoom大于9的时候完全透明
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10, 1,
              12, 0
            ]
          }
        });
      });  
      var navigationControl = new mapboxgl.NavigationControl();
      map.addControl(navigationControl, "top-left");
      map.addControl(new mapboxgl.FullscreenControl(), "top-right");
      function checkFullscreenSupport() {
        return !!(
          window.document.fullscreenEnabled ||
          window.document.mozFullScreenEnabled ||
          window.document.msFullscreenEnabled ||
          window.document.webkitFullscreenEnabled
        );
      };
     var scale = new mapboxgl.ScaleControl({
        "maxWidth": 100,
        "unit": "metric"
      });
      map.addControl(scale, "bottom-left");
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-heatmap {
  #map {
    height: 100%;
    // border: 1px solid red;
  }
  height: 100%;
}
</style>
