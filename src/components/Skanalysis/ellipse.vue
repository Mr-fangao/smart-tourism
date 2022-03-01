<template>
  <div id="com-deviationellipse">
    <div id="map" />
    <div class="content">
      <div class="left">
        <div class="title">
          <span>标准差椭圆分析</span>
        </div>
        <div class="con"></div>

        <div class="toppart">
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
        <div class="bottompart"></div>
      </div>
    </div>
    <!-- <div id="map" /> -->
    <!-- <div class="mapTool1">
      <div class="IDW">标准差椭圆分析</div>
      <div class="DayPicContainer">
        <div class="DayPicTitle">数据日期</div>
        <el-date-picker
          class="DayPic"
          v-model="DateValue"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="IDWtoolContainer">
        <div class="GetMapValue1">请求数据</div>
        <div class="AnaMapValue2">开始分析</div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "deviationellipse",
  data() {
    return {
      DateValue: new Date(),
      value1,
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
  },
};
</script>

<style scoped lang="less">
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
#com-deviationellipse {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(189, 201, 21);
}
.content {
  height: 100%;
  width: 20%;
  position: absolute;
  z-index: 100;
  top: 0%;
  left: 0.2%;
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    width: 100%;
    margin-left: 0.5%;
    background: url("../../assets/img/side.png") no-repeat;
    background-position: 100% 10%;
    background-size: 100% 91%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    .title {
      // flex: 0.5;
      margin-top: 5%;
      height: 7%;
      width: 100%;
      position: relative;
      left: 4%;
      background: url(../../assets/img/titlebg.png) no-repeat;
      background-size: 70% 59%;
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
    .con {
      background: url("../../assets/img/analysis/idw.png") no-repeat;
      background-size: 80% 80%;
      position: absolute;
      height: 23%;
      width: 67%;
      margin-left: 19%;
      margin-top: 20%;
    }
    .toppart {
      position: absolute;
      top: 27%;
      width: 100%;
      height: 30%;
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
      bottom: 9%;
      width: 100%;
      height: 50%;
    }
  }
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
/deep/.el-range-editor--small .el-range__icon {
  color: transparent !important;
}
/deep/.el-date-editor .el-range-input {
  width: 30%;
  height: 60%;
  background: rgba(82, 173, 209, 0.3);
}
/deep/.el-button {
  background: url("../../assets/img/框.png");
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

// .mapTool1 {
//   position: absolute;
//   z-index: 1100;
//   height: 92%;
//   width: 20%;
//   left: 0;
//   margin: 0.5% 0% 0% 0.5%;
//   background: url("../../assets/img/side.png") no-repeat;
//   /deep/.el-input__inner {
//     -webkit-appearance: none;
//     background: transparent;
//     border-radius: 4px;
//     border: 0px solid #dcdfe6;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     color: rgba(220, 225, 227, 0.96);
//     display: inline-block;
//     font-size: inherit;
//     height: 40px;
//     line-height: 40px;
//     width: 100%;
//     padding: 0 0 0 35px;
//   }
//   .IDWtoolContainer {
//     float: left;
//     position: absolute;
//     top: 250px;
//     width: 100%;
//     height: 30px;
//     padding: 0 0 0 20px;
//   }
//   .AnaMapValue2 {
//     color: rgba(255, 255, 255, 0.6);
//     background: linear-gradient(to bottom, #5a85ab54 0, #3c3b7854 100%);
//     position: absolute;
//     top: 0px;
//     width: 85px;
//     text-align: center;
//     height: 33px;
//     line-height: 33px;
//     left: 40px;
//     cursor: pointer;
//     border-radius: 8px;
//     font-size: 16px;
//     text-align: center;
//     font-family: KuHei;
//     float: left;
//   }
//   .GetMapValue1 {
//     color: rgba(255, 255, 255, 0.6);
//     background: linear-gradient(to bottom, #5a85ab54 0, #3c3b7854 100%);
//     position: absolute;
//     top: 0px;
//     width: 85px;
//     text-align: center;
//     height: 33px;
//     line-height: 33px;
//     left: 20px;
//     cursor: pointer;
//     border-radius: 8px;
//     font-size: 16px;
//     text-align: center;
//     font-family: KuHei;
//     float: left;
//   }
//   .GetMapValue1:hover {
//     color: white;
//   }
//   .AnaMapValue2:hover {
//     color: white;
//   }
//   .IDW {
//     color: #ffffffc9;
//     position: absolute;
//     top: 95px;
//     height: 37px;
//     line-height: 36px;
//     left: 80px;
//     cursor: pointer;
//     border-radius: 8px;
//     font-size: 25px;
//     text-align: center;
//     font-family: KuHei;
//     float: left;
//   }
//   .DayPicContainer {
//     float: left;
//     position: absolute;
//     top: 172px;
//     width: 100%;
//     height: 42px;
//     padding: 0 0 0 20px;
//     .DayPicTitle {
//       color: #ffffffad;
//       position: relative;
//       float: left;
//       font-size: 21px;
//       left: 18px;
//       line-height: 39px;
//       .DayPic {
//         float: left;
//         width: 150px;
//         position: relative;
//         left: 40px;
//       }
//     }
//   }
// }
</style>
