<template>
  <div class="mapbox-test">
    <div id="map"></div>
  </div>
</template>

<script>
// import mapboxgl from "mapbox-gl";
const mapboxgl = require("mapbox-gl");
export default {
  name: "ODAnalysis",
  mounted() {
    this.initDemoMap();
  },
  data() {
    return {};
  },
  methods: {
    initDemoMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [-103.59179687498357, 40.66995747013945],
        zoom: 2,
      });
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style lang="less" scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
