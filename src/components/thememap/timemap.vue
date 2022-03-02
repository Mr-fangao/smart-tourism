<template>
  <div class="com-timemap">
    <div id="map"></div>
  </div>
</template>
<script>

export default {
  name: "timemap",
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 5,
      });
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-multimap {
  height: 100%;
  #map {
    position:relative;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
.map-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}
</style>
