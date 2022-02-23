<template>
  <div id="recommend">
    <div id="map" />
    <div class="container">
      <div class="left-part">
        <div class="pt1"></div>
        <div class="pt2"></div>
        <div class="pt3"></div>
      </div>
      <div class="right-part">
        <div class="pt4"></div>
        <div class="pt5"></div>
        <div class="pt6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import areaSelect from "../components/areaSelect.vue";
import echarts from "echarts";
import wordcloud from "../assets/js/echarts-wordcloud-master/index";
import dialogBar from "../components/dialog.vue";
import poppage from "../components/poppage.vue";
// import dialogPage from "./dialogPage.vue";
export default {
  name: "recommend",
  components: {
    modalVisible: false,
    areaSelect,
    wordcloud,
    poppage,
    // dialogPage,
    "dialog-bar": dialogBar,
  },
  data() {
    return {};
  },
  mounted() {
    this.initmap();
    // document.body.addEventListener(
    //   "touchmove",
    //   function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   },
    //   { passive: false }
    // );
    // function bodyScroll(event) {
    //   event.preventDefault();
    // }
    // document.body.addEventListener("touchmove", bodyScroll, false);
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
#recommend {
  position: fixed;
  width: 100%;
  height: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.left-part {
  position: absolute;
  top: 3px;
  left: 0.5%;
  bottom: 0px;
  height: 92%;
  width: 22%;
  float: left;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: url(../assets/img/side.png) no-repeat;
  opacity: 1;
  background-size: 100% 100%;
  .pt1 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
  .pt2 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
  .pt3 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
}
.right-part {
  position: absolute;
  right: 0%;
  height: 100%;
  width: 22%;
  float: right;
  display: flex;
  flex-direction: column;
  padding: 10px;
  // background: url(../assets/img/pt/rightsidepart.png) no-repeat;
  opacity: 1;
  background-size: 145% 100%;
  background-position: 100% 10%;
  .pt4 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
  .pt5 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
  .pt6 {
    flex: 1;
    // background: url(../assets/img/pt/ptbackground.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
