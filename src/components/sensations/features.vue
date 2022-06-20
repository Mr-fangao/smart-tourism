<template>
  <div id="com-features">
    <SelectRegion ref="box" :right="25"></SelectRegion>
    <div id="map" />
    <div class="features-left">
      <div class="features-analysis leftpart">
        <div class="features-title">
          <span>111s</span>
        </div>
        <div ></div>
      </div>
      <div class="features-RelationalGraph leftpart"></div>
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

import echarts from "echarts";
import request from "../../utils/request";
import mixins from "../../mixins/mixins.js";//混入模型
import china from "../../../src/assets/json/中华人民共和国.json";
export default {
  name: "city",
  mixins: [mixins],
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
      json: "  ",
      selectlevel: 0, //所选层级，1代表省 2代表市
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
    eventBum.$on("json", (json) => {
      this.json = json.name;
      this.selectlevel = json.where; //所选层级，默认为0 1代表省 2代表市
    });
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
      var _this = this;
      var layerIDs = [];
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [110, 40],
        zoom: 4,
      });

      //获取子组件中的所有dom元素
      var box = _this.$refs.box.$el;
      var queding = box.querySelector("#choice .right");
      map.on("load", function () {
        var chinaid = "";
        var china_json = "";
        var i = 0;
        queding.addEventListener("click", async function () {
          i = i + 1;
          china_json = "";
          chinaid = "";
          //选择的是省份
          if (_this.selectlevel == 1) {
            china_json = china;
            // _this.$refs.box.shengZ 是表示选择的省份
            chinaid = _this.$refs.box.shengZ + "_" + "sheng" + i;
          }
          //选择的是地级市
          if (_this.selectlevel == 2) {
            var url = "../../../static/shi/" + _this.$refs.box.shengZ + ".json";
            //通过axios请求选择省份的数据
            const get_data = await axios.get(url).then(
              (response) => {
                return response.data;
              },
              (response) => {
                console.log("error");
              }
            );
            //设置数据源的 ID
            chinaid = _this.json + "_" + "shi" + i;
            china_json = get_data;
          }
          //添加数据源
          map.addSource('"' + chinaid + '"', {
            type: "geojson",
            data: china_json,
          });
          china_json.features.forEach(function (feature) {
            var sfName = feature.properties["name"];
            var layerID = "poi" + sfName;
            if (!map.getLayer(layerID)) {
              map.addLayer({
                id: layerID,
                type: "fill",
                source: '"' + chinaid + '"',
                paint: {
                  "fill-color": "#0163B3", //更改地图颜色
                  "fill-outline-color": "#81D24E",
                  "fill-opacity": 0.3 /* 透明度 */,
                },
                filter: ["==", "name", sfName],
              });
              layerIDs.push(layerID);
            }
          });
          var diming = _this.json;
          layerIDs.forEach(function (layerID) {
            map.setLayoutProperty(
              layerID,
              "visibility",
              layerID.indexOf(diming) > -1 ? "visible" : "none"
            );
          });
          var list = "";
          list = china_json.features;
          list.some((itme, index) => {
            if (itme.properties.name == _this.json) {
              //如果选择的是市，缩放高度就设置为 7
              if (_this.selectlevel == 1) {
                //未选择省份时不执行
                if (_this.json != "") {
                  map.flyTo({
                    center: itme.properties.centroid,
                    zoom: 7, //设置选择地名后地图的缩放级别
                    pitch: 15, // 倾斜度
                  });
                }
              }
              //如果选择的是市，缩放级别就设置为 8
              if (_this.selectlevel == 2) {
                //未选择省份时不执行
                if (_this.json != "") {
                  map.flyTo({
                    center: itme.properties.centroid,
                    zoom: 8, //设置选择地名后地图的缩放级别
                    pitch: 15, // 倾斜度
                  });
                }
              }
              return true;
            }
          });
        });
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
  height: calc(100% - 50px);
  width: 22.5%;
  background: url("../../assets/img/side.png")center no-repeat;
  background-size: 97% 97%;
  display: flex;
  flex-direction: column;
  padding: 1%;
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
      // .search {
      //   height: 22%;
      //   width: 100%;
      //   display: flex;
      //   align-items: center;
      //   .searchinput {
      //     width: 70%;
      //     height: 30px;
      //     .el-input {
      //       height: 100%;
      //     }
      //     // /deep/.el-input__suffix {
      //     //   .el-icon-circle-close:before {
      //     //     margin-top: -100%;
      //     //   }
      //     // }
      //     /deep/.el-input__inner {
      //       &::placeholder {
      //         color: rgba(194, 194, 194, 0.815);
      //         font-size: 14px;
      //       }
      //       -webkit-appearance: none;
      //       background: transparent;
      //       border-radius: 4px;
      //       border: 2px solid #1abbf1a6;
      //       -webkit-box-sizing: border-box;
      //       box-sizing: border-box;
      //       color: rgba(220, 225, 227, 0.96);
      //       font-size: inherit;

      //       height: 100%;
      //       line-height: 36px;
      //       width: 90%;
      //     }
      //   }
      //   .buttoncontent {
      //     width: 30%;
      //     height: 60%;
      //   }
      // }
</style>
