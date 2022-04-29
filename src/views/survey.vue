<template>
  <div id="maptest">
    <div id="map"></div>
    <div class="main-content">
       <selectRegion :right="400" />
    </div>
  </div>
</template>

<script>
import eventBum from "../components/cityselect/EvebtBus";
import SelectRegion from "../components/cityselect/newselectRegion.vue";
export default {
  name: "survey",
  components: {
    eventBum,
    SelectRegion,
  },
  data() {
    return {};
  },
  mounted() {
    this.initmap();
     eventBum.$on("json", (json) => {
       console.log(json);
     });
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [110, 40],
        zoom: 4,
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
  z-index: 0;
}
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
  z-index: 10;
  top: 0;
}
</style>
