<template>
  <div id="com-features">
    <!-- <selectRegion :defaultplace="'南京'" :right="3.5" /> -->
    <div id="map" />
    <div class="features-left">
      <div class="row1 left-part">
        <div class="features-title">
          <span>旅游产品特征分析</span>
        </div>
        <div class="content">
          <div class="search">
            <div class="searchinput">
              <el-input
                v-model="selectinput"
                placeholder="输入内容或点击词云标签"
              ></el-input>
            </div>
            <div class="buttoncontent">
              <pbutton
                :name="buttonname"
                @click.native="postFeature()"
              ></pbutton>
            </div>
          </div>
          <div class="chosenlabel">
            <word3D
              :height="word3Dheight"
              :width="word3Dwidth"
              :data="wordcloudchina"
            >
            </word3D>
          </div>
        </div>
      </div>
      <div class="row2 left-part">
        <div class="features-title">
          <span>景点--特征关系图谱</span>
        </div>
        <div class="content"></div>
      </div>
    </div>
    <div class="features-bottom">
      <div class="bottompart">
        <div class="features-title">
          <div class="chartselect">
            <el-radio-group
              v-model="isCollapse"
              @change="changeChartTab(isCollapse)"
            >
              <el-radio-button :label="0">省份</el-radio-button>
              <el-radio-button :label="1">城市</el-radio-button>
              <el-radio-button :label="2">景点</el-radio-button>
            </el-radio-group>
          </div>
          <span>地区特征匹配度排行</span>
        </div>
        <div class="content"></div>
      </div>
      <div class="bottompart">
        <div class="features-title">
          <span>地图类型选择</span>
        </div>
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import pbutton from "../button.vue";
import eventBum from "../cityselect/EvebtBus";
import SelectRegion from "../cityselect/newselectRegion.vue";
import word3D from "../wordcloud3D.vue";
import nanjing from "../../assets/json/nanjingpoint.json";
import njprovince from "../../assets/json/njprovince.json";
import echarts from "echarts";
import request from "../../utils/request";

export default {
  name: "city",
  //  props: {
  //   faetureslist: {
  //     type: String,
  //   },
  // },
  components: {
    SelectRegion,
    pbutton,
    word3D,
    eventBum,
  },

  data() {
    return {
      isCollapse: 0, //地区分布图表切换
      echartsLevelsData: [
        { DatanName: [], DatanValue: [] },
        { DatanName: [], DatanValue: [] },
        { DataName: [], DataValue: [] },
      ],

      // provDatanName: [],
      // provDatanValue: [],
      // cityDatanName: [],
      // cityDatanValue: [],
      // scenicDataName: [],
      // scenicDataValue: [],
      word3Dheight: 200, //3D词云大小
      word3Dwidth: 350,
      buttonname: "分析", //按钮名称
      selectinput: "",
      faetureslist: [],
      placeholder: "",
      selectcity: {
        name: "中国",
        level: 0,
      },
      wordcloudchina: [
        { value: 5589, name: "山岳" },
        { value: 6734, name: "海滨" },
        { value: 7879, name: "历史" },
        { value: 9024, name: "文化" },
        { value: 2456, name: "园林" },
        { value: 5467, name: "自驾游" },
        { value: 4567, name: "商业街" },
        { value: 6546, name: "划船" },
        { value: 4567, name: "沙漠" },
        { value: 4564, name: "森林公园" },
        { value: 6775, name: "湿地" },
        { value: 4567, name: "瀑布" },
        { value: 7654, name: "温泉" },
        { value: 6789, name: "峡谷" },
        { value: 3456, name: "草原" },
        { value: 6543, name: "艺术" },
        { value: 5678, name: "红色" },
        { value: 4567, name: "古迹" },
        { value: 6543, name: "动物" },
        { value: 2299, name: "建筑" },
        { value: 4488, name: "陵墓" },
        { value: 5578, name: "风光" },
        { value: 2367, name: "地貌" },
        { value: 3478, name: "异域" },
        { value: 9865, name: "寺庙" },
        { value: 7654, name: "避暑" },
        { value: 7654, name: "游乐园" },
        { value: 3456, name: "水上乐园" },
        { value: 6789, name: "宗教" },
        { value: 1234, name: "道观" },
        { value: 9090, name: "广场" },
        { value: 2344, name: "亲子" },
        { value: 5432, name: "爬山" },
        { value: 8888, name: "网红" },
        { value: 5566, name: "特色商业" },
      ],
    };
  },

  computed: {},

  mounted() {
    this.initmap();
    eventBum.$on("features", (features) => {
      console.log(features);
      features = features.toString();
      if (this.selectinput == "") {
        this.selectinput += features;
      } else if (this.selectinput != null) {
        this.selectinput += "、" + features;
      }
    });
  },

  methods: {
    getFeaturesList() {
      if (typeof this.selectinput == "string") {
        var faetureslist = this.selectinput.toString();
        faetureslist = faetureslist.split("、");
        console.log(faetureslist, typeof faetureslist);
      }
      this.faetureslist = faetureslist;
    },
    postFeatureByLevel(level) {
      if (this.faetureslist.length == 0) {
        this.getFeaturesList();
      }
      if (echarts[level].DatanName == null) {
        this.echarts[level].DatanName = res.data.x;
        this.echarts[level].DatanValue = res.data.y;
      } else {
        this.initEcharts(this.echarts[level]);
      }

      // echartsLevelsData[level]
      console.log("postFeature is already !");
    },
    initEcharts() {},
    getLevelsData() {},
    changeChartTab(level) {
      if (this.faetureslist.length == 0) {
        this.getFeaturesList();
      }
      this.postFeatureByLevel(level);
    },
    handleResize() {
      this.myChart2 && this.myChart2.resize();
    },
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
      });
    },
  },
  watch: {
    isCollapse(newVal, oldVal) {
      this.changeChartTab(newVal);
    },
  },
};
</script>

<style scoped lang="less">
#com-features {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.features-left {
  position: absolute;
  height: 92%;
  width: 22.5%;
  margin: 0.4%;
  background: url("../../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .left-part {
    width: 100%;
    .content {
      height: 92%;
      width: 100%;
    }
  }
  .row1 {
    height: 40%;
    .content {
      .search {
        height: 22%;
        width: 100%;
        display: flex;
        align-items: center;
        .searchinput {
          width: 70%;
          height: 30px;
          .el-input {
            height: 100%;
          }
          // /deep/.el-input__suffix {
          //   .el-icon-circle-close:before {
          //     margin-top: -100%;
          //   }
          // }
          /deep/.el-input__inner {
            &::placeholder {
              color: rgba(194, 194, 194, 0.815);
              font-size: 14px;
            }
            -webkit-appearance: none;
            background: transparent;
            border-radius: 4px;
            border: 2px solid #1abbf1a6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: rgba(220, 225, 227, 0.96);
            font-size: inherit;

            height: 100%;
            line-height: 36px;
            width: 90%;
          }
        }
        .buttoncontent {
          width: 30%;
          height: 60%;
        }
      }
      .chosenlabel {
        height: 78%;
        width: 100%;
      }
    }
  }
  .row2 {
    height: 60%;
  }
}
.features-bottom {
  position: absolute;
  height: 39%;
  width: 72.8%;
  bottom: 7.1%;
  right: 3.7%;
  background: url("../../assets/img/长方形.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  .bottompart {
    height: 100%;
    .content {
      height: 87%;
      width: 100%;
    }
  }
  .bottompart:nth-child(1) {
    flex: 2;
  }
  .bottompart:nth-child(2) {
    flex: 1;
  }
}
.features-title {
  margin-top: 1%;
  height: 30px;
  width: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url("../../assets/img/titlebg.png") no-repeat;
  // background-position: 4% 130%;
  background-size: 100% 100%;
  > span {
    color: #a7e3eb;
    font-size: 14px;
    margin-left: 23%;
  }
  .chartselect {
    width: 140px;
    height: 28px;
    top: 4%;
    left: 40%;
    background-color: transparent;
    position: absolute;
    display: flex;
    /deep/.el-radio-button__inner {
      padding: 6px 5px;
      font-size: 14px;
      border: none;
      background-color: transparent;
    }
    /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
      border: none;
      background: url("../../assets/img/tabchosenBG.png") no-repeat center
        center;
      background-color: transparent;
      background-size: 100% 80%;
    }
    /deep/.el-radio-button__inner {
      color: white;
      border: none;
      background: url("../../assets/img/tabBG.png") no-repeat center center;
      background-color: transparent;
      background-size: 100% 80%;
    }
    //去除左侧蓝线
    /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
      -webkit-box-shadow: 0px 0 0 0 #409eff;
      box-shadow: 0px 0 0 0 #409eff;
    }
    /deep/.el-radio-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>