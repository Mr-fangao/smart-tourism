<template>
  <div class="com-pointgather">
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "pointgather",
  mounted() {
    this.initmap();
  },
 methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        'pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg'; 
        var map = new this.$mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-103.59179687498357, 40.66995747013945],
            zoom: 2
        })
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-pointgather {
  #map {
    height: 100%;
    // border: 1px solid red;
  }
  height: 100%;
  background: red;
}
</style>
