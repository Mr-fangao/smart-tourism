<template>
  <div id="recommend">
    <div id="map" />
    <div class="citychoose" @click="getCity()">
      <div class="iconcontent"><i class="fa fa-map-marker fa-lg"></i></div>
      <div class="cityname">{{ cityname }}</div>
    </div>
    <poppage
      :show="show"
      :cityname="cityname"
      @hideModal="hideModal"
      @submit="submit"
    >
    </poppage>
    <div class="recommend-content left">
      <div class="con">
        <div class="title">
          <span>个性化选择</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content select">{{ changename }}</div></el-col
          >
          <el-col :span="16">
            <div class="grid-content bg-specially">
              <div v-if="activeNameflag" class="tab1">
                <el-input
                  v-model="input"
                  placeholder="      请输入内容"
                ></el-input>
                <div class="labelcontent">
                  <span>示例:</span>
                  <div class="chooselabel">111</div>
                  <div class="chooselabel">111</div>
                  <div class="chooselabel">111</div>
                </div>
              </div>
              <div v-if="!activeNameflag" class="tab2"></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content select">出游时间</div></el-col
          >
          <el-col :span="16">
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
        <div class="myrow">
          <div class="sorcelabel">数据源</div>
          <div class="datasorce">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选A"></el-checkbox>
              <el-checkbox label="复1"></el-checkbox>
              <el-checkbox label="复2"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
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
          <el-tab-pane label="景点综合排行" name="recommendTab">
            <el-table
              :data="tableData"
              height="420px"
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="日期"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="景点推荐" name="hotTab">
            <el-table
              :data="tableData"
              height="420px"
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="日期"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="60"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="rightbottom">
        <div class="title"><span>专题地图选择</span></div>
        <div class="rightbottom-content">
          <div class="mapchange"></div>
          <div class="mapchange"></div>
          <div class="mapchange"></div>
          <div class="mapchange"></div>
          <div class="mapchange"></div>
          <div class="mapchange"></div>
        </div>
      </div>
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
import Bus from "../assets/js/bus.js";
import poppage from "../components/poppageForCity.vue";
export default {
  name: "recommend",
  components: {
    poppage,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      value1: [],
      input: "",
      changename: "景点特征",
      radio: "1",
      activeName: "recommendTab",
      activeNameflag: "true",
      input1: "",
      checkList: ["复选框 A"],
      //弹窗
      show: false,
      cityname: "城市选择",
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
    hideModal() {
      // 取消弹窗回调
      this.show = false;
      Bus.$on("sendCityname", (val) => {
        this.cityname = val;
      });
    },
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    checked(index) {
      const _this = this;
      _this.isActive = index;
    },
    getCity() {
      this.show = true;
      // this.cityname = "22";
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
.citychoose {
  position: absolute;
  height: 6%;
  width: 9%;
  top: 1%;
  left: 20.5%;
  background: url("../assets/img/矩形1718.png") no-repeat;
  opacity: 0.7;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  .iconcontent {
    flex: 2;
    color: rgb(92, 235, 216);
    text-align: right;
  }
  .cityname {
    flex: 6;
    color: #fafafa;
    // text-align: left;
  }
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
      // margin-left: 30%;
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
    /deep/.el-row {
      width: 100%;
      color: #dcdfe6;
      font-size: 12pt;
      text-align: center;
      flex-direction: row;
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
  }
  .rightbottom {
    flex: 1;
    width: 100%;
    .title {
      margin-top: -5%;
      margin-bottom: 0%;
      height: 15%;
      > span {
        line-height: 40px;
      }
    }
    .rightbottom-content {
      height: 80%;
      width: 100%;
      margin-bottom: 0%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      .mapchange {
        width: 31%;
        height: 31%;
        background: #158cad;
      }
    }
  }
}
.col1 {
  display: flex;
}

/deep/.el-input__inner {
  left: 15%;
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
.myrow {
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .sorcelabel {
    flex: 1;
    color: #cfe2e1;
    margin-left: 5%;
  }
}
.title {
  // flex: 0.5;
  margin-top: 1%;
  height: 11%;
  width: 80%;
  position: relative;
  left: 0%;
  background: url(../assets/img/titlebg.png) no-repeat;
  background-size: 60% 85%;
  background-position: 12% 70%;
  margin-bottom: 4%;
  // background-size: 57% 93%;
  // background-position: 9% 100%;
  font-size: 10pt;
  > span {
    float: left;
    margin-left: 18%;
    font-size: 10pt;
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
.datasorce {
  height: 100%;
  width: 100%;
  flex: 4;
  position: relative;
  .el-checkbox {
    margin-right: 7px;
    color: #c5d4e6;
  }
  .el-checkbox-group {
    margin-top: 8%;
    font-size: 12pt;
  }
}
.recommend-content {
  .bg-specially {
    height: 100%;
    // width: 60%;
    .labelcontent {
      display: flex;
      height: 20%;
      width: 100%;
      padding-top: 3%;
      padding-bottom: 3%;
      > span {
        font-size: 12pt;
        color: #c5d4e6;
      }
      .chooselabel {
        background: #8ae5e54a;
        margin-left: 6%;
        border: 1px solid #ffffff40;
        font-size: 11pt;
        border-radius: 5px;
        // margin: 1% 1% 1% 1% ;
      }
    }
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
      left: 0%;
      position: relative;
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
      width: 100%;
      padding: 0px;
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
    height: 96%;
    margin: 1%;
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
    margin: 2%;
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
    width: 67%;
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
  /deep/.el-tabs--border-card > .el-tabs__content {
    padding: 1%;
    height: 90%;
    width: 100%;
    margin-top: 2%;
  }
  .el-table--fit {
    background: transparent;
  }
  /deep/.el-table .el-table__header-wrapper tr th {
    background-color: #025166 !important;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid #0cf3f3;
  }
  //奇数行背景
  /deep/.el-table tr {
    background: rgba(2, 73, 94, 0.432);
    border-bottom: 1px solid #0cf3f3;
  }
  /deep/.el-table .el-table__row {
    background: #023f54;
    color: rgb(255, 255, 255);
  }
  /deep/.el-table .el-table__row--striped {
    background: #023649;
    color: rgb(255, 255, 255);
  }
  /deep/.el-table td.el-table__cell {
    border: none;
  }
  // /deep/.el-table--enable-row-hover
  //   .el-table__body
  //   tr:hover
  //   > td.el-table__cell {
  //   background: rgb(18, 47, 92)!important
  //     }
  /deep/.el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    background: transparent;
  }
  //头高、行高
  /deep/.el-table__header tr,
  .el-table__header th {
    height: 30px;
    padding: 0;
  }
  /deep/.el-table__body tr,
  .el-table__body td {
    height: 35px;
    padding: 0;
  }
  /deep/.el-table .el-table__cell {
    padding: 0;
  }
  /deep/.el-table th.el-table__cell > .cell {
    padding: 0;
    text-align: center;
  }
  /deep/.el-table .el-table__body tr.current-row > td {
    background-color: #0d1f34 !important;
  }
  /deep/.el-table .el-table__body tr:hover > td {
    background-color: #0d1f34 !important;
  }
}
</style>
