<template>
  <div class="com">
    <div id="map" />
    <div class="content">
      <div class="left">
        <div class="title">
          <span>区域情感分析</span>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feelmonitor",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "微博",
        },
        {
          value: "选项2",
          label: "小红书",
        },
        {
          value: "选项3",
          label: "马蜂窝",
        },
      ],
      value: "",
      date: "",
      input: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
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
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.com {
  position: fixed;
  height: 100%;
  width: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.content {
  height: 100%;
  width: 20%;
  position: absolute;
  z-index: 100;
  top: 0%;
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    width: 100%;
    margin-left: 0.5%;
    background: url("../../assets/img/side.png") no-repeat;
    background-position: 100% 10%;
    background-size: 100% 91%;
    .title {
      margin-top: 5%;
      height: 7%;
      width: 100%;
      position: relative;
      left: 4%;
      background: url(../../assets/img/titlebg.png) no-repeat;
      background-size: 70% 70%;
      font-size: 16pt;
      > span {
        float: left;
        margin-left: 18%;
        font-size: 15pt;
        line-height: 30px;
        color: aliceblue;
        text-shadow: 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff,
          0 0 30px #38e9e0, 0 0 40px #0cf3f3;
      }
    }
    .crawling {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      .el-select {
        padding-right: 10px;
      }
    }
    .query {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      .el-input {
        padding-right: 10px;
      }
    }
  }
}
</style>
