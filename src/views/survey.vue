<template>
  <div id="maptest">
    <div id="map"></div>
    <div class="main-content">
      <!-- <selectRegion :right="400" /> -->
      <SelectRegion ref="box" :right="400"></SelectRegion>
    </div>
  </div>
</template>

<script>
import eventBum from "../components/cityselect/EvebtBus";
import SelectRegion from "../components/cityselect/newselectRegion.vue";
import china from "../../src/assets/json/中华人民共和国.json";
export default {
  name: "survey",
  components: {
    eventBum,
    SelectRegion,
  },
  data() {
    return {
      json: "  ",
    };
  },
  mounted() {
    eventBum.$on("json", (json) => {
      this.json = json.name;
    });
    this.initmap();
  },
  methods: {
    initmap() {
      var _this = this;
      var layerIDs = [];
      console.log(_this);
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [110, 40],
        zoom: 4,
      });
      map.on("load", function () {
        //添加数据源
        map.addSource("china", {
          type: "geojson",
          data: china,
        });
        china.features.forEach(function (feature) {
          var sfName = feature.properties["name"];
          var layerID = "poi" + sfName;
          if (!map.getLayer(layerID)) {
            map.addLayer({
              id: layerID,
              type: "fill",
              source: "china",
              paint: {
                "fill-color": "#0163B3", //更改地图颜色
                "fill-outline-color": "#81D24E",
                "fill-opacity": 0.7 /* 透明度 */,
              },
              filter: ["==", "name", sfName],
            });
            layerIDs.push(layerID);
          }
        });
        //这一步是保证初始时不显示地图
        layerIDs.forEach(function (layerID) {
          map.setLayoutProperty(
            layerID,
            "visibility",
            layerID.indexOf(_this.json) > -1 ? "visible" : "none"
          );
        });
        //获取子组件中的dom元素
        var box = _this.$refs.box.$el;
        var queding = box.querySelector("#choice .right");
        //监听点击事件
        queding.addEventListener("click", function (e) {
          var diming = _this.json;
          layerIDs.forEach(function (layerID) {
            map.setLayoutProperty(
              layerID,
              "visibility",
              layerID.indexOf(diming) > -1 ? "visible" : "none"
            );
          });
          var list = china.features;
          //判断选择的省份
          list.some((itme, index) => {
            if (itme.properties.name == _this.json) {
              //未选择省份时不执行
              if (_this.json != "") {
                map.flyTo({
                  center: itme.properties.centroid,
                  zoom: 6.5, //设置选择地名后地图的缩放级别
                  pitch: 45, // 倾斜度
                });
              }
              return true;
            }
          });
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
#maptest {
  height: 100%;
  width: 100%;
  position: fixed;
  // z-index: 0;
  #map {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .main-content {
    height: 100%;
    width: 100%;
    position: absolute;
    // z-index: 10;
    top: 0;
  }
}
</style>
