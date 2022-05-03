<template>
  <div id="maptest">
    <div id="map"></div>
    <div class="main-content">
      <!-- <selectRegion :right="400" /> -->
      //<SelectRegion :right="400"></SelectRegion>
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
            "fill-color": {
              //以json数据中的adcode字段作为分割
              property: "adcode",
              //这里更改地图分级色彩
              stops: [
                [0, "#66E1FD"],
                [100000, "#66E1FD"],
                [120000, "#40CCFB"],
                [140000, "#02ABF9"],
                [160000, "#0185D6"],
                [180000, "#0163B3"],
                [200000, "#004690"],
                [220000, "#003277"],
              ],
            },
            "fill-outline-color": "#81D24E",
            "fill-opacity": 1 /* 透明度 */,
          },
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
