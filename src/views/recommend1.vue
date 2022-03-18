<template>
  <div id="recommend">
    <div id="map" />
    <transition name="fade">
      <loading v-if="isLoading" :state="state"></loading>
    </transition>
    <div class="mapcontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
    <div class="citychoose" @click="getCity()">
      <div class="iconcontent"><i class="fa fa-map-marker fa-lg"></i></div>
      <div class="cityname">{{ cityname }}</div>
    </div>
    <div class="recommend-left pt">
      <div class="sourceselect">
        <div id="recommend-title">
          <span>旅游数据总览</span>
        </div>
        <div class="datasource">
          <div class="leftpt">数据源选择</div>
          <div class="rightpt">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选A"></el-checkbox>
              <el-checkbox label="复选B"></el-checkbox>
              <el-checkbox label="复选C"></el-checkbox>
              <el-checkbox label="复选A"></el-checkbox>
              <el-checkbox label="复选B"></el-checkbox>
              <el-checkbox label="复选C"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="toppart-content">
          <div class="Lpart toppart-part">
            <div class="partimg"></div>
            <span class="partname"></span>
            <span class="partnumber"></span>
          </div>
          <div class="Mpart toppart-part">
            <div class="partimg"></div>
            <span class="partname"></span>
            <span class="partnumber"></span>
          </div>
          <div class="Rpart toppart-part">
            <div class="partimg"></div>
            <span class="partname"></span>
            <span class="partnumber"></span>
          </div>
        </div>
        <div class="datatime"></div>
      </div>
      <div class="ranktable"></div>
    </div>
    <div class="recommend-right pt"></div>
    <div class="recommend-bottom"></div>
  </div>
</template>
<script>
import Bus from "../assets/js/bus.js";
import poppage from "../components/poppageForCity.vue";

import request from "../utils/request";

import recommendCity from "../assets/js/global_variable";

import gradedcolormap from "../components/thememap/gradedcolormap.vue";
import pointgather from "../components/thememap/pointgather.vue";
import heatmap from "../components/thememap/heatmap.vue";
import timemap from "../components/thememap/timemap.vue";
import multimap from "../components/thememap/multimap.vue";

import loading from "../components/loading.vue";

import wordcloud from "../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
export default {
  name: "recommend",
  components: {
    poppage,
    gradedcolormap,
    pointgather,
    heatmap,
    timemap,
    multimap,
    loading,
    wordcloud,
  },
  data() {
    return {
      //数据源选择
      checkList: ["复选A"],
    };
    // return {
    //   //推荐

    //   //专题图切换
    //   activeClass: "1",
    //   //下方的城市名
    //   chosencity: "北京",
    //   //动画加载
    //   state: "",
    //   isLoading: false,
    //   //地图切换
    //   index: 1,
    //   comp: "pointgather",
    //   isShow: true,
    //   chart1data: [
    //     { value: 1048, name: "Search Engine" },
    //     { value: 735, name: "Direct" },
    //     { value: 580, name: "Email" },
    //     { value: 484, name: "Union Ads" },
    //     { value: 300, name: "Video Ads" },
    //   ],
    //   mycloudData: [],
    //   beijingData: [
    //     { value: 773, name: "故宫" },
    //     { value: 502, name: "长城" },
    //     { value: 270, name: "建筑" },
    //     { value: 212, name: "胡同" },
    //     { value: 192, name: "天安门" },
    //     { value: 182, name: "颐和园" },
    //     { value: 170, name: "博物馆" },
    //     { value: 158, name: "环球" },
    //     { value: 154, name: "历史" },
    //     { value: 138, name: "八达岭" },
    //     { value: 112, name: "天坛" },
    //     { value: 105, name: "度假" },
    //     { value: 104, name: "清华" },
    //     { value: 100, name: "银杏" },
    //     { value: 96, name: "北海" },
    //     { value: 94, name: "王府" },
    //     { value: 94, name: "皇帝" },
    //     { value: 93, name: "慕田峪" },
    //     { value: 92, name: "大学" },
    //     { value: 88, name: "乾隆" },
    //     { value: 87, name: "景山公园" },
    //     { value: 86, name: "八达岭长城" },
    //     { value: 84, name: "南锣鼓巷" },
    //     { value: 79, name: "紫禁城" },
    //     { value: 79, name: "地坛" },
    //     { value: 75, name: "慕田峪长城" },
    //   ],
    //   sanyaData: [
    //     { value: 327, name: "亚龙湾" },
    //     { value: 278, name: "海南" },
    //     { value: 250, name: "海鲜" },
    //     { value: 231, name: "海口" },
    //     { value: 215, name: "三亚湾" },
    //     { value: 158, name: "沙滩" },
    //     { value: 137, name: "东海" },
    //     { value: 134, name: "海棠" },
    //     { value: 130, name: "西岛" },
    //     { value: 128, name: "椰子" },
    //     { value: 117, name: "大东海" },
    //     { value: 104, name: "天涯海角" },
    //     { value: 101, name: "大海" },
    //     { value: 98, name: "海边" },
    //     { value: 91, name: "热带" },
    //     { value: 84, name: "海滩" },
    //     { value: 72, name: "蜈支洲岛" },
    //     { value: 71, name: "骑楼" },
    //     { value: 67, name: "鹿回头" },
    //     { value: 63, name: "老街" },
    //     { value: 59, name: "千古" },
    //     { value: 53, name: "椰梦" },
    //     { value: 52, name: "南山" },
    //     { value: 51, name: "半岛" },
    //     { value: 50, name: "森林公园" },
    //     { value: 50, name: "海景" },
    //     { value: 44, name: "海岛" },
    //     { value: 44, name: "帆船" },
    //     { value: 43, name: "潜水" },
    //     { value: 40, name: "珊瑚" },
    //     { value: 38, name: "半山" },
    //     { value: 37, name: "亚特兰蒂斯" },
    //     { value: 36, name: "雨林" },
    //     { value: 35, name: "红树林" },
    //     { value: 37, name: "椰林" },
    //     { value: 34, name: "水族馆" },
    //     { value: 33, name: "渔村" },
    //     { value: 33, name: "木兰" },
    //     { value: 32, name: "索菲特" },
    //     { value: 31, name: "游艇" },
    //     { value: 29, name: "陵水" },
    //     { value: 29, name: "石梅湾" },
    //   ],
    //   nanjingData: [],
    //   cityimages: [
    //     { url: require("../assets/img/city/1.jpg") },
    //     { url: require("../assets/img/city/201111424880.jpg") },
    //   ],
    //   beijingimages: [],
    //   sanyaimages: [],
    //   tableRankData: "",
    //   labellist: [
    //     { id: 1, name: "山岳" },
    //     { id: 2, name: "海滨" },
    //     { id: 3, name: "历史" },
    //     { id: 4, name: "革命老区" },
    //     { id: 5, name: "商业街" },
    //     { id: 6, name: "划船" },
    //     { id: 7, name: "文物" },
    //   ],
    //   tableCityData: [],
    //   timevalue: [],
    //   //景点特征
    //   input: "",
    //   changename: "景点特征",
    //   radio: "1",
    //   activeName: "recommendTab",
    //   activeNameflag: "true",
    //   checkList: [""],
    //   //弹窗
    //   show: false,
    //   cityname: "城市选择",
    //   currentRow: null,
    // };
  },
  created() {},
  mounted() {
    this.getRankTable();
    this.getCityRank();
    this.initChart1(this.chart1data);
    this.wordCloudInti(this.$refs.wordcloud, this.beijingData);
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  methods: {
    clickData(val) {
      this.chosencity = val.city;
      let cityname = val.city;
      if (cityname == "北京") {
        this.mycloudData = this.beijingData;
        this.wordCloudInti(this.$refs.wordcloud, this.mycloudData);
      } else if (cityname == "三亚") {
        this.mycloudData = this.sanyaData;
        this.wordCloudInti(this.$refs.wordcloud, this.mycloudData);
      }
      console.log(cityname);
    },
    hideModal() {
      // 取消弹窗回调
      this.show = false;
      Bus.$on("sendCityname", (val) => {
        this.cityname = val;
        this.recommendCity = val;
      });
    },
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.intPageSize + index + 1;
    },
    getCityRank() {
      var that = this;
      request.get("/api/data/cityRank").then((res) => {
        console.log(res);
        this.tableCityData = res.data;
        that.$nextTick(() => {
          that.$refs.interfaceTable.setCurrentRow(that.tableCityData[0]);
        });
      });
    },
    getRankTable() {
      request.get("/api/data/scenicRank").then((res) => {
        console.log(res);
        console.log(res.data.name);
        this.tableRankData = res.data;
        for (let i = 1; i <= res.data.length; i++) {
          this.tableRankData[i - 1].rank = i;
          this.tableRankData[i - 1].score = parseFloat(
            this.tableRankData[i - 1].score
          ).toFixed(2);
        }
      });
    },
    getLabel(val) {
      let label = val;
      this.input = this.input + label + "、";
    },
    getCity() {
      this.show = true;
    },
    showmap(value) {
      console.log(value);
      this.activeClass = value;
      if (value === 1) this.comp = "pointgather";
      else if (value === 2) this.comp = "gradedcolormap";
      else if (value === 3) this.comp = "heatmap";
      else if (value === 4) this.comp = "timemap";
      else if (value === 5) this.comp = "multimap";
      //   else if (value === 3) this.comp = "density";
    },
    //更新数据动画
    refeashData() {
      this.state = "加载数据中......请稍后";
      console.log(111);
      (this.isLoading = true),
        // this.getrealtime();
        setTimeout(() => {
          this.isLoading = false;
        }, 1200);
    },
    getRecommend() {
      this.activeName = "hotTab";
      console.log(this.timevalue);
      console.log(this.input);
      console.log(this.checkList);
      console.log(this.cityname);
    },
    initChart1(data) {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      var option = {
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: data,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' }
            // ],
          },
        ],
      };
      myChart1.setOption(option);
    },
    //词云
    wordCloudInti(wrapEl, data) {
      let myChart = echarts.init(wrapEl);
      var option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            name: "热词",
            type: "wordCloud",
            sizeRange: [10, 35],
            rotationRange: [-20, 20],
            shape: "rectangle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            gridSize: 7,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 4,
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
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
#recommend-title {
  height: 9%;
  background: url(../assets/img/titlebg.png) no-repeat;
  margin-top: 1%;
  background-size: 45% 100%;
  background-position-x: 7%;
  > span {
    float: left;
    margin-left: 15%;
    font-size: 11pt;
    line-height: 24px;
    color: aliceblue;
    text-shadow: 0 0 8px #fff, 0 0 12px #fff,
      0 0 15px rgba(128, 189, 189, 0.712), 0 0 20px #38e9e0bd, 0 0 25px #0cf3f3;
  }
}
.pt {
  position: absolute;
  top: 1.2%;
  z-index: 1;
  width: 25%;
  height: 91%;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
}
.recommend-left {
  float: left;
  margin-left: 0.4%;
  .sourceselect {
    flex: 2;
    background-color: rgba(240, 248, 255, 0.178);
    .datasource {
      height: 20%;
      width: 100%;
      display: flex;
      align-items: center;
      .leftpt {
        flex: 3;
        color: #fff;
      }
      .rightpt {
        flex: 8;
        .el-checkbox-group {
          width: 100%;
          .el-checkbox {
            margin-right: 0px;
            margin-top: 0%;
            margin-bottom: 2%;
            margin-left: 7%;
          }
        }
      }
    }
    .datatime {
    }
    .toppart-content {
      height: 55%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      .toppart-part {
        background: url("../assets/img/组144.png") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 25%;
        display: flex;
        flex-direction: column;
        // margin-bottom: 4%;
        .partname {
          flex: 1;
          color: #0cf3f3;
          display: block;
        }
        .partnumber {
          color: rgb(235, 2, 2);
          display: block;
          flex: 1;
        }
        .partimg {
          flex: 3;
        }
      }
      .Lpart {
      }
      .Mpart {
      }
      .Rpart {
      }
    }
  }
  .ranktable {
    flex: 3;
    background-color: rgba(0, 255, 255, 0.233);
  }
}
.recommend-right {
  right: 0%;
  float: right;
  margin-right: 0.4;
}
</style>
