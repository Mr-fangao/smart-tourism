<template>
  <div id="recommend">
    <div id="map" />
    <div class="container">
      <div class="left-part">
        <div class="pt pt1">
          <div class="head title">
            <span>111</span>
          </div>
        </div>
        <div class="pt pt2"></div>
        <div class="pt pt3"></div>
      </div>
      <div class="right-part">
        <div class="pt pt4"></div>
        <div class="pt pt5"></div>
        <div class="pt pt6"></div>
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
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [105, 35],
        zoom: 3.5,
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
.pt {
  flex: 1;
  //  background-size: 100% 100%;
  // background: url(../assets/img/titlebg.png) no-repeat;
}
.head {
  height: 20%;
  width: 100%;
  position: relative;
  left: 2%;
  background: url(../assets/img/titlebg.png) no-repeat;
  background-size: 70% 70%;
  > span {
    float: left;
    margin-left: 18%;
    font-size: 16pt;
    line-height: 30px;
    color: aliceblue;
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #38e9e0,
      0 0 70px #0cf3f3;
  }
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
  }
  .pt2 {
  }
  .pt3 {
  }
}
.right-part {
  position: absolute;
  top: 3px;
  right: 0.5%;
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
  .pt4 {
  }
  .pt5 {
  }
  .pt6 {
  }
}
</style>
