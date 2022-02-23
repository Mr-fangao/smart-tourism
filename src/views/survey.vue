<template>
  <div class="content">
    <div class="left">
      <div class="title">景点热搜Top10</div>
    </div>
    <div class="main">
      <div class="header"></div>
    </div>
    <div class="right">
      <div class="title">城市热搜Top10</div>
    </div>
    <div class="aside">
      <ul>
        <li>
          <router-link to="/survey" exact
            ><img src="../assets/img/feelings/jc.png"
          /></router-link>
          <p>监测</p>
          <router-link to="/feelings" exact
            ><img src="../assets/img/feelings/qg.png"
          /></router-link>
          <p>情感</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "survey",

  data() {
    return {
    };
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
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .left {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
  }
  .main {
    height: 100%;
    width: 57%;
  }
  .right {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
  }
}
</style>
