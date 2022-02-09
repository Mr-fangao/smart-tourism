<template>
  <div class="com-kdxfx">
    2
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "kdxfx",
  mounted(){
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
        zoom: 4,
      });
    },
  }, 
};
</script>

<style scoped lang="less">
.com-kdxfx {
  #map {
     position: absolute;
     width: 100%; 
     height: 100%;
  }
  //background: rgb(29, 31, 163);

}
</style>
