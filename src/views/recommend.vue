<template>
  <div class="content">
    <div class="grid-container">
      <div class="item1">1</div>
      <div class="item2">2</div>
      <div class="item3">3</div>
      <div class="item4">4</div>
      <div class="item5">5</div>
      <div class="item6">6</div>
      <div class="item7">7</div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {};
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [110, 40],
        zoom: 5,
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
    height: calc(100% - 45px);
  width: 100%;
  .grid-container {
    #map {
      position: relative;
    }
    position: absolute;
    display: grid;
    height: calc(100% - 45px);
    width: 100%;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "pt1 pt4 pt5 "
      "pt2 pt4 pt6 "
      "pt3 pt4 pt7 ";
    background-color: transparent;

    div {
      text-align: center;
      font-size: 30px;
      //outline: 1px dashed rgb(136, 27, 27);
    }
    .item1 {
      grid-area: pt1;
    }
    .item2 {
      grid-area: pt2;
    }
    .item3 {
      grid-area: pt3;
    }
    .item4 {
      grid-area: pt4;
    }
    .item5 {
      grid-area: pt5;
    }
    .item6 {
      grid-area: pt6;
    }
    .item7 {
      grid-area: pt7;
    }
  }
}
</style>
