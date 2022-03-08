<template>
  <div id="recommend">
    <div id="map" />
    <div class="recommend-content left">
      <div class="con">
        <div class="title">
          <span>个性化选择</span>
        </div>
        <span>数据时间:</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <div class="maptool">
          <el-button>请求数据</el-button>
          <el-button>开始分析</el-button>
        </div>
      </div>
      <div class="toppart"></div>
      <div class="bottompart"></div>
    </div>
    <div class="recommend-content right">
      <div class="con">
        <div class="title">
          <span>北京--旅游主题特征词云</span>
        </div>
      </div>
      <div class="bottompart"></div>
    </div>
    <div class="recommend-bottom"></div>
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
  z-index: 1;
  background: url("../assets/img/banner.png") no-repeat;
  background-size: 100% 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.recommend-content {
  position: absolute;
  z-index: 100;
  top: 0.5%;
  height: 92%;
  width: 20%;
  background: url("../assets/img/side.png") no-repeat;
  background-position: 100% 10%;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  .con {
    position: absolute;
    top: 0%;
    height: 33.3%;
    width: 100%;
    > span {
      width: 33%;
      height: 10%;
      margin-left: -44%;
      margin-top: 2%;
      border-left: 5px solid #0cf3f3;
      font-size: 12pt;
      line-height: 22px;
      color: aliceblue;
      position: absolute;
    }
    .maptool {
      position: absolute;
      top: 25%;
      left: 13%;
    }
  }
  .toppart {
    position: absolute;
    top: 33.3%;
    width: 100%;
    height: 33.3%;
    > span {
      width: 33%;
      height: 10%;
      margin-left: -44%;
      margin-top: 2%;
      border-left: 5px solid #0cf3f3;
      font-size: 12pt;
      line-height: 22px;
      color: aliceblue;
      position: absolute;
    }
    .maptool {
      position: absolute;
      top: 25%;
      left: 13%;
    }
  }
  .bottompart {
    position: absolute;
    bottom: 0%;
    width: 100%;
    height: 33.3%;
  }
}
.recommend-bottom {
  position: absolute;
  z-index: 100;
  bottom: 7.5%;
  height: 30%;
  width: 59%;
  left: 20.5%;
  background: #38e9e0;
  background: url("../assets/img/长方形.png") no-repeat;
  background-position: 100% 10%;
  background-size: 100% 100%;
}
.left {
  margin-left: 0.2%;
  left: 0;
}
.right {
  margin-right: 0.2%;
  right: 0;
}
/deep/.el-input__inner {
  left: 20%;
  position: absolute;
  display: inline-block;
  -webkit-appearance: none;
  background: transparent;
  border-radius: 4px;
  border: 0px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: rgba(220, 225, 227, 0.96);
  // display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 33px;
  width: 100%;
  padding: 0 0 0 35px;
}
.title {
  // flex: 0.5;
  margin-top: 1%;
  height: 12%;
  width: 80%;
  position: relative;
  left: 0%;
  background: url(../assets/img/titlebg.png) no-repeat;
  background-size: 60% 92%;
  background-position: 12% 70%;
  // background-size: 57% 93%;
  // background-position: 9% 100%;
  font-size: 10pt;
  > span {
    float: left;
    margin-left: 18%;
    font-size: 12pt;
    line-height: 30px;
    color: aliceblue;
    text-shadow: 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 30px #38e9e0,
      0 0 40px #0cf3f3;
  }
}
/deep/.el-range-editor--small .el-range__icon {
  color: transparent !important;
}
/deep/.el-date-editor .el-range-input {
  width: 30%;
  height: 60%;
  background: rgba(82, 173, 209, 0.3);
}
/deep/.el-button {
  background: url("../assets/img/框.png");
  background-size: 100% 100%;
  // background: #24bff390;
  border: 0px solid #d80d4a;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
}
/deep/.el-button:focus,
.el-button:hover {
  color: #75f8ed;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
