<template>
  <div class="com-loc">
    <div id="map"></div>
  </div>
</template>
<script>
import eventBum from "../views/traffickingnetwork/public/js/EvebtBus";
export default {
  name: "loc",
  data() {
    return {
      selectcity: {
        name: "中国",
        level: 0,
      },
    };
  },
  components: {
    eventBum,
  },
  mounted() {
    this.initmap();
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      console.log(this.selectcity);
    });
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
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
.com-loc {
  height: 100%;
  #map {
    position: relative;
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
