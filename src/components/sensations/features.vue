<template>
  <div id="com-features">
    <SelectRegion ref="box" :right="5"></SelectRegion>
    <div id="map"></div>
    <div class="features-left">
      <div class="features-analysis leftpart">
        <div class="features-title">
          <span>形象感知分析</span>
        </div>
        <div class="content">
          <div class="smalltitle">
            <div class="textcontent">数据源选择</div>
          </div>
          <div class="datasource">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="去哪儿"></el-checkbox>
              <el-checkbox label="马蜂窝"></el-checkbox>
              <el-checkbox label="携程网"></el-checkbox>
              <el-checkbox label="途牛网"></el-checkbox>
              <el-checkbox label="艺龙网"></el-checkbox>
              <el-checkbox label="美团网"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="smalltitle">
            <div class="textcontent">数据时间范围</div>
          </div>
          <div class="timepickcontent">
            <el-date-picker
              v-model="timevalue"
              type="monthrange"
              range-separator="-"
              start-placeholder="2015.01"
              end-placeholder="2022.06"
            >
            </el-date-picker>
          </div>
          <div class="smalltitle">
            <div class="textcontent">特征输入</div>
          </div>
          <div class="featuresinput">
            <div class="searchinput">
              <!-- <input
                type="text"
                class="ipt"
                v-model="searchContent"
                @keydown.enter="search()"
                placeholder="搜索盗墓笔记重启试试"
              /> -->
              <el-input
                v-model="searchContent"
                placeholder="输入感兴趣的景点特征"
              ></el-input>
            </div>
            <div class="buttoncontent">
              <el-button
                class="searchbutton"
                size="mini"
                @click="search(searchContent)"
                >分析</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="features-RelationalGraph leftpart">
        <div class="features-title">
          <span>特征关系图谱</span>
        </div>
        <div class="content" id="keywords">
          <Keywords
            v-show="type === 1"
            @searchData="search"
            @windowResize="windowResize"
          ></Keywords>
          <Charts ref="charts" v-show="type === 2" :chartList="searchList" />
        </div>
      </div>
    </div>
    <div class="features-bottom">
      <div class="bottompart">
        <div class="features-title">
          <span>景点特征词频表</span>
        </div>
        <div class="content">
          <div class="tablecontent">
            <el-table
              border
              :data="tableData"
              stripe
              height="0"
              style="width: 100%"
            >
              <template v-if="tableData.length == 0">
                <el-table-column
                  label="特征词"
                  align="center"
                  prop="name"
                ></el-table-column>
                <el-table-column
                  label="频率"
                  align="center"
                  prop="value"
                ></el-table-column>
              </template>
              <template
                v-else
                v-for="(val, index) in tableData.length > 4
                  ? 4
                  : tableData.length"
              >
                <el-table-column
                  label="特征词"
                  align="center"
                  prop="name"
                  min-width="12.5%"
                >
                  <template
                    slot-scope="scope"
                    v-if="scope.$index * 4 + index < tableData.length"
                    >{{ tableData[scope.$index * 4 + index].name }}</template
                  >
                </el-table-column>
                <el-table-column
                  label="频率"
                  align="center"
                  prop="value"
                  min-width="12.5%"
                >
                  <template
                    slot-scope="scope"
                    v-if="scope.$index * 4 + index < tableData.length"
                  >
                    <div
                      v-if="tableData[scope.$index * 4 + index].value >= 1000"
                      style="color: red"
                    >
                      {{ tableData[scope.$index * 4 + index].value }}
                    </div>
                    <div
                      v-if="tableData[scope.$index * 4 + index].value >= 500&&tableData[scope.$index * 4 + index].value<1000"
                      style="color: yellow"
                    >
                      {{ tableData[scope.$index * 4 + index].value }}
                    </div>
                    <div v-if="tableData[scope.$index * 4 + index].value >= 0&&tableData[scope.$index * 4 + index].value<500">
                      {{ tableData[scope.$index * 4 + index].value }}
                    </div>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </div>
      </div>
      <div class="bottompart">
        <div class="features-title">
          <span>地区特征匹配度排行</span>
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
import Keywords from "../word-graph/Keywords";
import Charts from "../word-graph/Charts";
import { search } from "../word-graph/mock";
import echarts from "echarts";
import request from "../../utils/request";
// import mixins from "../../mixins/mixins.js";
import axios from "axios";
import china from "../../../src/assets/json/中华人民共和国.json";
import nanjing from "../../assets/json/nanjing.json";
export default {
  name: "city",
  // mixins: [mixins],
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
    Keywords,
    Charts,
  },

  data() {
    return {
      isCollapse: 0, //地区分布图表切换
      json: "",
      selectedcity: "北京",
      selectlevel: 0, //所选层级，1代表省 2代表市
      echartsLevelsData: [
        { DatanName: [], DatanValue: [] },
        { DatanName: [], DatanValue: [] },
        { DataName: [], DataValue: [] },
      ],
      map: null,
      formatterjson: {},
      unformatterjson: {},
      watching: { watch: 0 },
      checkList: ["途牛网", "携程网", "马蜂窝", "去哪儿"],
      timevalue: "",
      tableHeight: 0, // 表格高度
      tableData: [],
      tableList: [],
      // provDatanName: [],
      // provDatanValue: [],
      // cityDatanName: [],
      // cityDatanValue: [],
      // scenicDataName: [],
      // scenicDataValue: [],
      word3Dheight: 200, //3D词云大小
      word3Dwidth: 350,
      buttonname: "分析", //按钮名称
      searchContent: [""],
      featuresinput:[""],
      type: 1,
      searchList: [],
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
  beforeCreate() {},
  created() {
    this.getWordcloud();
    if (this.tableData.length > 0) {
      let num = Math.ceil(this.tableData.length / 3);
      for (let j = 0; j < num; j++) {
        this.tableList.push({});
      }
    }
  },
  mounted() {
    this.initmap();

    this.type = 1;
    eventBum.$on("json", (json) => {
      this.searchContent=[''];
      this.json = json.name;
      this.selectlevel = json.where; //所选层级，默认为0 1代表省 2代表市
      this.selectedcity = json.name.replace("省", "");
      this.selectedcity = this.selectedcity.replace("市", "");
      this.postFeatures();
      if (json.where == 2) {
        this.getWordcloud();
      }
    });
  },

  methods: {
    //搜索方法,text为空则为点击类别操作,不为空则为输入框搜索
    async search(text) {
      this.postFeatures();
      text || (text = this.searchContent);
      console.log("sss", text, this.searchContent);
      if (!text) {
        this.type = 1;
        return;
      }
      try {
        let result = await search(text);
        this.type = 2;
        this.searchList = [].concat(result);
      } catch (error) {
        // alert("未查询到数据,请更改查询条件");
      }
    },
    getWordcloud() {
      request
        .post("/api/data/wordCloud", {
          model: this.selectedcity,
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
          console.log(this.tableData);
        });
    },
    postFeatures() {
      let _self = this;
      if(typeof _self.searchContent=='arrar'){
      _self.featuresinput[0]=_self.searchContent[0];
      }
      else if(typeof _self.searchContent=='string'){
        _self.featuresinput[0]=_self.searchContent;
      }
      var pointjson = {
        type: "FeatureCollection",
        features: [],
      };
      var pointlist = [];
      var level;
      // var features=[_self.searchContent];
      var features = ["爬山"];
      if (_self.selectlevel == 1) level = 2;
      if (_self.selectlevel == 2) level = 1;
      request
        .post("/api/data/labelInfo", {
          labels: _self.featuresinput,
          type: level,
          region: _self.selectedcity,
        })
        .then((res) => {
          _self.unformatterjson = res.data;
          let i = 0;
          for (i; i < _self.unformatterjson.length; i++) {
            pointlist.push({
              type: "Feature",
              properties: _self.unformatterjson[i],
              geometry: {
                type: "Point",
                coordinates: [
                  _self.unformatterjson[i].longitude,
                  _self.unformatterjson[i].latitude,
                ],
              },
            });
          }
          pointjson.features = pointlist;
          _self.formatterjson = pointjson;
          console.log(_self.formatterjson);

          setTimeout(function () {
            _self.refeashMap();
          }, 200);
        });
    },
    /**
     * 窗体大小变化回调
     */
    windowResize() {
      const charts = this.$refs.charts;
      charts && charts.myChart && charts.myChart.resize();
    },
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
    refeashMap() {
      let _this = this;
      console.log(_this.formatterjson);
      var scenic_json = _this.formatterjson;
      if (_this.map.getLayer("sceniclayer"))
        _this.map.removeLayer("sceniclayer");
      if (_this.map.getLayer("sceniclayertext"))
        _this.map.removeLayer("sceniclayertext");
      if (_this.map.getSource("scenicpoint"))
        _this.map.removeSource("scenicpoint");
      _this.map.addSource("scenicpoint", {
        type: "geojson",
        data: scenic_json,
      });
      _this.map.addLayer({
        id: "sceniclayer",
        type: "circle",
        source: "scenicpoint",
        paint: {
          "circle-radius": 5,
          "circle-stroke-width": 2,
          "circle-opacity": 0.75,
          "circle-stroke-color": "white",
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "score"],
            3.5,
            "#ACBE21",
            3.8,
            "#BEB221",
            4.1,
            "#BE8221",
            4.4,
            "#FF8C00",
            4.7,
            "#BE6321",
            5.0,
            "#BE4521",
          ],
        },
      });
      _this.map.addLayer({
        id: "sceniclayertext",
        type: "symbol" /* symbol类型layer，一般用来绘制点*/,
        source: "scenicpoint",
        layout: {
          "text-field": ["get", "name"],
          "text-offset": [1.5, 1.5],
        },
        paint: {
          "text-color": "#FFFFFF",
        },
      });
    },
    initmap() {
      var _this = this;
      var layerIDs = [];
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      _this.map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [110, 40],
        zoom: 4,
      });

      //获取子组件中的所有dom元素
      var box = _this.$refs.box.$el;
      var queding = box.querySelector("#choice .right");
      _this.map.on("load", function () {
        var chinaid = "";
        var china_json = "";
        var scenic_json = "";
        var i = 0;
        queding.addEventListener("click", async function () {
          i = i + 1;
          china_json = "";
          chinaid = "";
          scenic_json = "";
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
            // const scenicpoint = nanjing;

            //设置数据源的 ID
            chinaid = _this.json + "_" + "shi" + i;
            china_json = get_data;
          }
          //添加数据源

          _this.map.addSource('"' + chinaid + '"', {
            type: "geojson",
            data: china_json,
          });
          china_json.features.forEach(function (feature) {
            var sfName = feature.properties["name"];
            var layerID = "poi" + sfName;
            // console.log(sfName, layerID, feature.properties);
            console.log(_this.map.getLayer(layerID));
            if (!_this.map.getLayer(layerID)) {
              _this.map.addLayer({
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
            _this.map.setLayoutProperty(
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
                  _this.map.flyTo({
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
                  _this.map.flyTo({
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
        // Object.defineProperty(_this.watching ,"watch", {
        //   get: function () {
        //     console.log("get：" + watch);
        //     return watch;
        //   },
        //   set: function () {
        //     console.log("set scussess!");
        //
        // });
      });
    },
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off("json");
    map = null;
  },
  watch: {
    isCollapse(newVal, oldVal) {
      this.changeChartTab(newVal);
    },
  },
};
</script>
<style scoped lang="less">
// @import "../../assets/css/table.css";
#com-features {
  overflow: hidden;
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
// #keywords{
//   padding-top: 5%;
// }
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
  background: url("../../assets/img/side.png") center no-repeat;
  background-size: 97% 97%;
  display: flex;
  flex-direction: column;
  padding: 1%;
  .leftpart {
    width: 100%;
    .content {
      height: calc(100% - 30px);
      width: 100%;
    }
  }
  .features-analysis {
    flex: 3;
    .smalltitle {
      height: 20px;
      width: 100%;
      margin: 2% 0% 2% 0%;
      display: flex;
      .textcontent {
        border-left: 4px solid #1af3f3;
        padding-left: 2%;
        height: 100%;
        width: 90%;
        text-align: left;
        color: #35d8e4;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
      }
    }
    .datasource {
      height: 25%;
      width: 100%;
      display: flex;
      align-items: center;
      background: url("../../assets/img/buttonbg.png") center no-repeat;
      background-size: 100% 100%;
      background-color: #22dede17;
      .el-checkbox-group {
        width: 100%;
        .el-checkbox {
          color: rgb(174, 193, 199);
          color: #aec1c7;
          margin-left: 4%;
          margin-right: 4%;
          margin-top: 1%;
          margin-bottom: 1%;
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #85caca;
        }
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #85caca;
        }
        /deep/.el-checkbox__label {
          padding-left: 7px;
        }
      }
    }
    .timepickcontent {
      height: 15%;
      width: 100%;
      background: url("../../assets/img/buttonbg.png") center no-repeat;
      background-size: 100% 100%;
      background-color: #22dede17;
      display: flex;
      align-items: center;
      justify-content: center;
      /deep/.el-date-editor--daterange.el-input,
      .el-date-editor--daterange.el-input__inner,
      .el-date-editor--timerange.el-input,
      .el-date-editor--timerange.el-input__inner {
        border: none;
        width: 90% !important;
      }
      .el-input__inner {
        border: none;
      }
      .el-input__inner {
        background-color: transparent;
      }
      .el-range-editor.el-input__inner {
        padding: 5px 0px;
      }
      .el-date-editor .el-range-separator {
        width: 0%;
      }
      /deep/.el-date-editor .el-range__icon {
        color: #c0c4cc00;
      }
      /deep/.el-date-editor .el-range-input {
        font-size: 14px;
        color: #eff1f4;
        background-color: #81cfd226;
      }
      /deep/.el-date-editor .el-range-input,
      .el-date-editor .el-range-separator {
        font-size: 14px;
        color: #dddfe0;
      }
    }
    .featuresinput {
      height: 15%;
      width: 100%;
      // background: url("../../assets/img/buttonbg.png") center no-repeat;
      // background-size: 100% 100%;
      // background-color: #22dede17;
      display: flex;
      align-items: center;
      .searchinput {
        width: 70%;
        height: 30px;
        .ipt {
          border: 1px solid #9093c7;
          border-radius: 20px;
          width: 300px;
          height: 30px;
          line-height: 44px;
          box-sizing: border-box;
          color: #555;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
        }
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
            font-size: 13px;
          }
          -webkit-appearance: none;
          background: transparent;
          border-radius: 4px;
          border: 2px solid #1ad2f17d;
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
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .searchbutton {
          //  margin-left: 16%;
          background-color: #57a1ac40;
          border-color: #58d6e2b5;
          color: #fff;
        }
        /deep/ .el-button--mini {
          &:focus {
            color: #e7e7e7;
            background-color: rgba(38, 189, 216, 0.63);
          }
        }
        /deep/ .el-button--mini,
        .el-button--mini.is-round {
          padding: 7px 20px;
          // position: absolute;
          // left: 60%;
          // top: 8.5%;
        }
      }
    }
  }
  .features-RelationalGraph {
    flex: 4;
  }
}
.features-bottom {
  position: absolute;
  right: 3%;
  height: 40%;
  width: 75.5%;
  padding: 0.8% 1% 1% 1.5%;
  bottom: 7%;
  // right: 3.7%;
  background: url("../../assets/img/长方形.png") center no-repeat;
  background-size: 97% 97%;
  display: flex;
  flex-direction: row;
  .bottompart {
    height: 100%;
    .content {
      height: calc(100% - 30px);
      width: 100%;
    }
  }
  .bottompart:nth-child(1) {
    // table-layout: fixed;
    // word-wrap: break-word;
    overflow: hidden;
    flex: 1;
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
    top: 5%;
    right: 7%;
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
.content {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .tablecontent {
    flex: auto;
    overflow: hidden; //重要点3 在flex元素上再设置个overflex：hidden，表示在该元素内部进行计算
  }
  /deep/ .el-table {
    height: 100% !important; //重要点2
  }
  /deep/.el-tabs--border-card {
    height: 96%;
    margin: 1%;
    background: transparent;
    border: none;
  }
  /deep/.el-tabs--border-card > .el-tabs__content {
    padding: 0;
    height: 92%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header {
    background: transparent;
    border: none;
    margin: 0%;
  }
  /deep/.el-tabs__item {
    padding: 0;
    width: 25%;
    border: none;
  }
  /deep/.el-tabs__nav {
    width: 100%;
  }
  /deep/.el-table .cell {
    padding-left: 0%;
    padding-right: 0%;
    text-align: center;
  }
  /deep/.el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:last-child {
    padding: 0;
  }
  /deep/.el-tabs__nav-scroll {
    background: transparent;
    width: 100%;
    background: url("../../assets/img/buttonbg.png") no-repeat;
    background-size: 100% 100%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border-left: none;
    border-right: none;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: #2baccd6e;
    color: #dcdfe6;
    border-left: none;
    border-right: none;
    border-top: 0px solid #0cf3f3;
    // border-bottom: 2px solid #0cf3f3;
  }
  /deep/.el-tabs--border-card > .el-tabs__content {
    padding: 1%;
    height: 90%;
    width: 100%;
    margin-top: 1%;
  }
  /deep/.el-table--fit {
    background: transparent;
  }
  /deep/.el-table--fit {
    background: transparent;
  }
  /deep/.el-table .el-table__header-wrapper tr th {
    background-image: linear-gradient(
      -180deg,
      #bdd9e017 4%,
      #9fdae565 100%
    ) !important;
    background: transparent;
    color: rgb(255, 255, 255);
    border-bottom: 0px solid #1faacd;
  }
  //奇数行背景
  /deep/.el-table tr {
    background: rgba(2, 73, 94, 0.432);
    border-bottom: 1px solid #0cf3f3;
  }
  /deep/.el-table .el-table__row {
    background: #023f5441;
    color: rgb(255, 255, 255);
  }
  /deep/.el-table .el-table__row--striped {
    background: #023f54ce;
    color: rgb(255, 255, 255);
  }
  /deep/.el-table td.el-table__cell {
    border: none;
    padding-left: 0%;
    padding-right: 0%;
  }
  /deep/.el-table .cell {
    padding-left: 0%;
    padding-right: 0%;
    text-align: center;
  }
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
    background-color: #84e6e485 !important;
  }
  /deep/.el-table .el-table__body tr:hover > td {
    background-color: #8eabcc !important;
  }
  /deep/.el-table--scrollable-y .el-table__body-wrapper {
    border: none;
  }
  /* 消除表格标题的下划线 */
  /deep/ .el-table td.el-table__cell {
    border-bottom: 0px transparent !important;
  }
  /* 消除表格内部的下划线 */
  /deep/ .el-table th.el-table__cell.is-leaf {
    border-bottom: 0px transparent !important;
  }
  /deep/ .el-table {
    border-bottom: 0px transparent !important;
  }
  /deep/.el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    /*width: 0;宽度为0隐藏*/
    width: 0px;
  }
  /deep/.el-table--border,
  .el-table--group {
    border: none;
  }
  /deep/.el-table--border .el-table__cell {
    border: none;
  }
  .el-table--border::after {
    width: 0;
  }
  .el-table::before {
    height: 0;
  }
}
</style>
