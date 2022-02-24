<template>
  <div class="com-OD">
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: "odfx",
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoibXItZmFuZ2FvIiwiYSI6ImNreW4yYzNidjBsdDQyb3JwbDdwYXR2cjcifQ.F5ecEIp6x8gJ1svcfz-qeQ";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [104.07, 30.67],
        zoom: 5,
        // pitch: 60, //视野倾斜，0-60
        // bearing: -17.6,//视野旋转角度
      });
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-OD {
  #map {
    height: 500px;
    // border: 1px solid red;
  }

  height: 300px;
  background: red;
}
</style>
