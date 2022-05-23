<template>
  <div id="maptest">
    <div id="map"></div>
    <div class="main-content">
      <SelectRegion ref="box" :right="25"></SelectRegion>
      <div class="mapchange">
        <el-button id="bt1" type="primary">地图样式1</el-button>
        <el-button id="bt2" type="primary">地图样式2</el-button>
        <el-button id="bt3" type="primary">地图样式3</el-button>
        <el-button id="bt4" type="primary">地图样式4</el-button>
      </div>
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
      selectlevel: 0, //所选层级，1代表省 2代表市
    };
  },
  mounted() {
    eventBum.$on("json", (json) => {
      this.json = json.name;
      this.selectlevel = json.where; //所选层级，默认为0 1代表省 2代表市
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
                "fill-opacity": 0.3 /* 透明度 */,
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
                  zoom: 7, //设置选择地名后地图的缩放级别
                  pitch: 15, // 倾斜度
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
    .mapchange {
      width: 20%;
      height: 10%;
      bottom: 6%;
      right: 5%;
      z-index: 10;
      position: absolute;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-evenly;
    }
  }
}
</style>
