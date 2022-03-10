<template>
  <div id="recommend">
    <div id="map" />
    <div class="recommend-content left">
      <div class="con">
        <div class="title">
          <span>个性化选择</span>
        </div>
        <!-- <el-row :gutter="20"> </el-row> -->
        <el-row :gutter="20">
          <el-col :span="10"
            ><div class="grid-content select">推荐范围</div></el-col
          >
          <el-col :span="10"
            ><div class="grid-content col1">
              <el-radio @click.native="getRange(1)" v-model="radio" label="1"
                >全国</el-radio
              >
              <el-radio @click.native="getRange(2)" v-model="radio" label="2"
                >自定义城市</el-radio
              >
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"
            ><div class="grid-content select">{{ changename }}</div></el-col
          >
          <el-col :span="10">
            <div class="grid-content bg-specially">
              <div v-if="activeNameflag" class="tab1">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                <span>示例:历史、巍峨、海滨等</span>
              </div>
              <div v-if="!activeNameflag" class="tab2"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"
            ><div class="grid-content select">出游时间</div></el-col
          >
          <el-col :span="10">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="-"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"
            ><div class="grid-content select">数据源</div></el-col
          >
          <el-col :span="10">
            <div class="datasorce">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <!-- <span>数据时间:</span>
     -->
        <div class="buttoncontent">
          <el-button class="startbutton">更新数据</el-button>
          <el-button class="startbutton">开始推荐</el-button>
        </div>
      </div>
      <div class="toppart"></div>
      <div class="bottompart"></div>
    </div>
    <div class="recommend-content right">
      <div class="righttop">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="第一个tab" name="recommendTab">
            111111111</el-tab-pane
          >
          <el-tab-pane label="第二个tab" name="hotTab"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="rightbottom"></div>
    </div>
    <div class="recommend-bottom">
      <div class="content-bottom">
        <div class="title"><span>城市热门榜及特征分析</span></div>
        <div class="content"></div>
      </div>
      <div class="content-bottom">
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "recommend",
  data() {
    return {
      value1: "",
      changename: "景点特征",
      radio: "1",
      activeName: "recommendTab",
      activeNameflag: "true",
      input1: "",
      checkList: ["选中且禁用", "复选框 A"],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
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
        center: [105, 35],
        zoom: 3.5,
      });
    },
    checked(index) {
      const _this = this;
      _this.isActive = index;
    },
    getRange(val) {
      console.log(val);
      if (val == 1) {
        this.changename = "景点特征";
      } else if (val == 2) {
        this.changename = "城市选择";
      }
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
    height: 40.3%;
    width: 100%;
    .select {
      // border-left: 5px solid #0cf3f3;
      color: #cfe2e1;
      margin-left: 30%;
      line-height: 40px;
    }
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
      top: 85%;
      left: 30%;
    }
    .buttoncontent {
      height: 20%;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
    }
    .el-row {
      color: #dcdfe6;
      font-size: 12pt;
      text-align: left;
      margin-left: 0% !important;
      margin-right: 0% !important;
      margin-bottom: 0px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    /deep/.el-col {
      border-radius: 4px;
      padding-left: 0% !important;
      padding-right: 0% !important;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 0px 0;
      background-color: #f9fafc;
    }
  }
  .toppart {
    position: absolute;
    top: 40.3%;
    width: 100%;
    height: 25%;
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .content-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      flex: 1;
      width: 100%;
      background-size: 52% 80%;
    }
    .content {
      flex: 6;
      width: 100%;
    }
  }
  .content-bottom:nth-child(2) {
    flex: 1;
    height: 100%;
  }
  .content-bottom:nth-child(1) {
    flex: 2;
    height: 100%;
    .title {
      flex: 1;
      width: 100%;
      background-size: 25% 80%;
      margin-left: -12%;
      > span {
        margin-left: 15.5%;
      }
    }
  }
}
.left {
  margin-left: 0.2%;
  left: 0;
}
.right {
  margin-right: 0.2%;
  right: 0;
  display: flex;
  .righttop {
    flex: 2;
    width: 100%;
    /*  tab样式 */
    .tab_nav {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2%;
      height: 8%;
      margin-top: 2%;
    }

    .tab_nav .navTitle {
      height: 90px;
      line-height: 90px;
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-family: Alibaba PuHuiTi;
      color: #333;
      background-color: #db7093;
      margin-right: 10px;
    }

    /* 让最后一个标题没有margin */
    .navTitle:last-child {
      margin-right: 0;
    }

    .active {
      position: relative;
      color: #ffffff;
    }

    .active::after {
      content: "";
      position: absolute;
      width: 100rpx;
      height: 4rpx;
      background-color: #1f75fe;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
    }

    .nav_item {
      padding: 20px;
      background-color: rgb(211 206 206);
      color: #ffffff;
    }
  }
  .rightbottom {
    flex: 1;
    width: 100%;
  }
}
.col1 {
  display: flex;
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
  height: 44px;
  line-height: 36px;
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
.checkbox {
  width: 100%;
  height: 100%;
  margin-left: 10%;
}
.recommend-content {
  .bg-specially {
    height: 100%;
    width: 100%;
  }
  .tab1 {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    > span {
      position: absolute;
      top: 64%;
      left: 39%;
      color: #a7c7c7f0;
      font-size: 10pt;
    }

    /deep/.el-input__inner {
      left: -10%;
      position: absolute;
      display: inline-block;
      -webkit-appearance: none;
      background: #c3e3e72b;
      border-radius: 4px;
      border: 1px solid #3eb7c738;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: rgba(220, 225, 227, 0.96);
      font-size: inherit;
      height: 30px;
      line-height: 90px;
      width: 125%;
      padding: 0 0 0 10px;
    }
  }
  /deep/.el-row {
    height: 17%;
  }
  /deep/.el-row:nth-child(1) {
    height: 0%;
  }
  /deep/.el-range-editor--small .el-range__icon {
    color: transparent !important;
  }
  /deep/.el-date-editor .el-range-input {
    width: 30%;
    color: rgb(171, 180, 180);
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
    width: 40%;
  }
  /deep/.el-button:focus,
  .el-button:hover {
    color: #75f8ed;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  /deep/.el-radio {
    color: #aaacb1;
    line-height: 40px;
  }
  /deep/.el-tabs--border-card {
    height: 100%;
    margin: 2%;
    background: transparent;
    border: none;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
    height: 92%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header {
    background: transparent;
    border: none;
  }
  /deep/.el-tabs__item {
    padding: 0;
    width: 70%;
    border: none;
    //   background: url(../assets/img/tab.png)no-repeat;
    //   background-size: 100% 100%;
  }
  /deep/.el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:last-child {
    padding: 0;
  }
  /deep/.el-tabs__nav-scroll {
    background: transparent;
    width: 59%;
    background: url(../assets/img/buttonbg.png) no-repeat;
    background-size: 100% 100%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border-left: none;
    border-right: none;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: #1cbde62c;
    color: #dcdfe6;
    border-left: none;
    border-right: none;
    border-top: 2px solid #0cf3f3;
    border-bottom: 2px solid #0cf3f3;
  }
}
</style>
