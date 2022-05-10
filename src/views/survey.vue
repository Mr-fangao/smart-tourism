<template>
  <div id="maptest">
    <div id="map"></div>
    <div class="main-content">
      <!-- <selectRegion :right="400" /> -->
   <selectRegion :defaultplace="'南京'" :right="3.5" />
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
      json: "",
    };
  },
  mounted() {
    this.initmap();
    eventBum.$on("json", (json) => {
      // console.log(json);
      this.json = json.name;
      this.initmap();
    });
  },
  methods: {
    initmap() {
      var _this = this;
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
        map.addSource("fillSourceID", {
          type: "geojson",
          data: china,
        });
        map.addLayer({
          id: "fillID",
          type: "fill" /* fill类型一般用来表示一个面，一般较大 */,
          source: "fillSourceID",
          //过滤器、只展示name = _this.json的省份
          filter: ["==", "name", _this.json], //关键点：name对应geojson中的属性字段
          paint: {
            "fill-color": "#0163B3", //更改地图颜色
            "fill-outline-color": "#81D24E",
            "fill-opacity": 0.7 /* 透明度 */,
          },
        });
      });
      var list = china.features;
      //判断选择的省份
      list.some((itme, index) => {
        if (itme.properties.name == _this.json) {
          //未选择省份时不执行
          if (_this.json != "") {
            map.flyTo({
              center: itme.properties.centroid,
              zoom: 6, //设置缩放级别
            });
          }
          return true;
        }
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
