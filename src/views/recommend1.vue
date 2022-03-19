<template>
  <div id="recommend">
    <!-- <transition name="fade">
      <loading v-if="isLoading" :state="state"></loading>
    </transition> -->
    <div class="mapcontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
    <!-- <div class="citychoose" @click="getCity()">
      <div class="iconcontent"><i class="fa fa-map-marker fa-lg"></i></div>
      <div class="cityname">{{ cityname }}</div>
    </div> -->
    <div class="recommend-left pt">
      <div class="sourceselect">
        <div id="recommend-title">
          <span>旅游数据总览</span>
        </div>
        <div class="datasource">
          <div class="leftpt">数据源选择:</div>
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
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 景点数 </span>
            <span class="partnumber"> 233 </span>
          </div>
          <div class="Mpart toppart-part">
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 评论数 </span>
            <span class="partnumber"> 1234 </span>
          </div>
          <div class="Rpart toppart-part">
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 游客数 </span>
            <span class="partnumber"> 2333 </span>
          </div>
        </div>
        <div class="datatime">数据更新时间:2022年3月19日</div>
      </div>
      <div class="ranktable">
        <div id="recommend-title" class="title">
          <span>旅游数据总览</span>
        </div>
        <div class="ranktable-content">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="景点综合排行" name="recommendTab">
              <el-table
                :data="tableRankData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="40"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="120"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="80"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="景点推荐" name="hotTab">
              <el-table
                :data="tableRankData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="40"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="120"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="80"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="景点1推荐" name="myTab">
              <el-table
                :data="tableRankData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="40"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="120"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="80"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="recommend-right pt"></div>
    <div class="recommend-bottom">
      <div class="chartcontent">
        <div id="recommend-title" class="title">
          <span>中国热门城市</span>
        </div>
        <div class="content" id="chart1"></div>
      </div>
      <div class="chartcontent">
        <div id="recommend-title" class="title">
          <span>{{ this.chartname }}特征词云</span>
        </div>
        <div class="content" ref="chartword"></div>
      </div>
      <div class="chartcontent">
        <div id="recommend-title" class="title">
          <span>{{ this.chartname }}游客来源</span>
        </div>
        <div class="content" id="chart2"></div>
      </div>
    </div>
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
      isShow: true,

      //数据源选择
      checkList: ["复选A"],
      //数据
      tableRankData: "",
      //tab切换
      activeName: "recommendTab",
      comp: "pointgather",
      //echarts数据
      chartname: "北京市",
      wordclouddata: [
        { value: 327, name: "亚龙湾" },
        { value: 278, name: "海南" },
        { value: 250, name: "海鲜" },
        { value: 231, name: "海口" },
        { value: 215, name: "三亚湾" },
        { value: 158, name: "沙滩" },
        { value: 137, name: "东海" },
        { value: 134, name: "海棠" },
        { value: 130, name: "西岛" },
        { value: 128, name: "椰子" },
        { value: 117, name: "大东海" },
        { value: 104, name: "天涯海角" },
        { value: 101, name: "大海" },
        { value: 98, name: "海边" },
        { value: 91, name: "热带" },
        { value: 84, name: "海滩" },
        { value: 72, name: "蜈支洲岛" },
        { value: 71, name: "骑楼" },
        { value: 67, name: "鹿回头" },
        { value: 63, name: "老街" },
        { value: 59, name: "千古" },
        { value: 53, name: "椰梦" },
        { value: 52, name: "南山" },
        { value: 51, name: "半岛" },
        { value: 50, name: "森林公园" },
        { value: 50, name: "海景" },
        { value: 44, name: "海岛" },
        { value: 44, name: "帆船" },
        { value: 43, name: "潜水" },
        { value: 40, name: "珊瑚" },
        { value: 38, name: "半山" },
        { value: 37, name: "亚特兰蒂斯" },
        { value: 36, name: "雨林" },
        { value: 35, name: "红树林" },
        { value: 37, name: "椰林" },
        { value: 34, name: "水族馆" },
        { value: 33, name: "渔村" },
        { value: 33, name: "木兰" },
        { value: 32, name: "索菲特" },
        { value: 31, name: "游艇" },
        { value: 29, name: "陵水" },
        { value: 29, name: "石梅湾" },
      ],
      chartdata1: [
        {
          name: "肺炎",
          value: 9.06,
        },
        {
          name: "疫情",
          value: 7.74,
        },
        {
          name: "微博",
          value: 7.25,
        },
        {
          name: "病例",
          value: 6.95,
        },
        {
          name: "新冠",
          value: 6.88,
        },
        {
          name: "确诊",
          value: 6.59,
        },
        {
          name: "武汉",
          value: 5.2,
        },
        {
          name: "视频",
          value: 4.86,
        },
        {
          name: "冠状病毒",
          value: 4.34,
        },
        {
          name: "口罩",
          value: 4.28,
        },
        {
          name: "新型",
          value: 3.49,
        },
        {
          name: "患者",
          value: 3.05,
        },
        {
          name: "防控",
          value: 2.92,
        },
        {
          name: "感染",
          value: 2.81,
        },
        {
          name: "医院",
          value: 2.73,
        },
        {
          name: "新增",
          value: 2.43,
        },
        {
          name: "隔离",
          value: 2.19,
        },
        {
          name: "出院",
          value: 2.17,
        },
        {
          name: "湖北",
          value: 2.1,
        },
        {
          name: "病毒",
          value: 1.79,
        },
        {
          name: "累计",
          value: 1.79,
        },
        {
          name: "加油",
          value: 1.6,
        },
        {
          name: "哈哈哈",
          value: 1.53,
        },
        {
          name: "韩国",
          value: 1.39,
        },
        {
          name: "医护人员",
          value: 1.35,
        },
        {
          name: "治愈",
          value: 1.3,
        },
        {
          name: "人员",
          value: 1.28,
        },
        {
          name: "死亡",
          value: 1.23,
        },
        {
          name: "投票",
          value: 1.2,
        },
        {
          name: "武汉市",
          value: 1.19,
        },
        {
          name: "工作",
          value: 1.18,
        },
        {
          name: "科比",
          value: 1.39,
        },
        {
          name: "复工",
          value: 1.17,
        },
        {
          name: "密切接触者",
          value: 1.16,
        },
        {
          name: "抗疫",
          value: 1.15,
        },
        {
          name: "疑似病例",
          value: 1.14,
        },
        {
          name: "中国",
          value: 1.23,
        },
        {
          name: "防疫",
          value: 1.13,
        },
        {
          name: "治疗",
          value: 1.12,
        },
        {
          name: "检测",
          value: 1.1,
        },
        {
          name: "目前",
          value: 1.09,
        },
        {
          name: "物资",
          value: 1.08,
        },
        {
          name: "医学观察",
          value: 1.07,
        },
        {
          name: "例新冠状",
          value: 1.06,
        },
        {
          name: "发热",
          value: 1.05,
        },
        {
          name: "时间",
          value: 1.04,
        },
        {
          name: "大家",
          value: 1.03,
        },
        {
          name: "一线工作者",
          value: 1.02,
        },
        {
          name: "央视",
          value: 1.01,
        },
        {
          name: "医疗",
          value: 1.0,
        },
        {
          name: "在家",
          value: 0.98,
        },
      ],
      chartdata2: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
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
    this.showmap(1);
    this.getRankTable();
    this.getCityRank();
    this.initChart1(this.chartdata1);
    this.initChart2(this.chartdata2);
    this.wordCloudInti(this.$refs.chartword, this.wordclouddata);
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  methods: {
    // clickData(val) {
    //   this.chosencity = val.city;
    //   let cityname = val.city;
    //   if (cityname == "北京") {
    //     this.mycloudData = this.beijingData;
    //     this.wordCloudInti(this.$refs.wordcloud, this.mycloudData);
    //   } else if (cityname == "三亚") {
    //     this.mycloudData = this.sanyaData;
    //     this.wordCloudInti(this.$refs.wordcloud, this.mycloudData);
    //   }
    //   console.log(cityname);
    // },
    hideModal() {
      // 取消弹窗回调
      this.show = false;
      // Bus.$on("sendCityname", (val) => {
      //   this.cityname = val;
      //   this.recommendCity = val;
      // });
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
        // that.$nextTick(() => {
        //   that.$refs.interfaceTable.setCurrentRow(that.tableCityData[0]);
        // });
      });
    },
    getRankTable() {
      request.get("/api/data/scenicRank").then((res) => {
        console.log(res);
        console.log(res.data[1].city);
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
    // getRecommend() {
    //   this.activeName = "hotTab";
    //   console.log(this.timevalue);
    //   console.log(this.input);
    //   console.log(this.checkList);
    //   console.log(this.cityname);
    // },
    // initChart1(data) {
    //   let myChart1 = this.$echarts.init(document.getElementById("chart1"));
    //   var option = {
    //     legend: {
    //       orient: "vertical",
    //       left: "left",
    //     },
    //     series: [
    //       {
    //         name: "Access From",
    //         type: "pie",
    //         radius: "50%",
    //         data: data,
    //         itemStyle: {
    //           normal: {
    //             label: {
    //               show: false,
    //             },
    //             labelLine: {
    //               show: false,
    //             },
    //           },
    //         },
    //         // data: [
    //         //   { value: 1048, name: 'Search Engine' },
    //         //   { value: 735, name: 'Direct' },
    //         //   { value: 580, name: 'Email' },
    //         //   { value: 484, name: 'Union Ads' },
    //         //   { value: 300, name: 'Video Ads' }
    //         // ],
    //       },
    //     ],
    //   };
    //   myChart1.setOption(option);
    // },
    //矩形树图
    initChart1(data) {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      myChart1.on("click", this.clickFun);
      myChart1.setOption({
        title: {
          text: "  总评率随热词分布中",
          textStyle: {
            color: "rgba(255, 255, 255, .8)",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
        },
        grid: {
          top: "0%", //距上边距
          left: "0%", //距离左边距
          right: "0%", //距离右边距
          bottom: "0%", //距离下边距
        },
        calculable: false,
        series: [
          {
            name: "矩形图",
            type: "treemap",
            radius: "100%",
            center: ["100%", "100%"],
            breadcrumb: false, //矩形图下的提示显示与否
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}:{c}%",
                  fontSize: 10,
                },
                borderWidth: 0,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: data,
          },
        ],
      });
    },
    initChart2(data) {
      let myChart1 = this.$echarts.init(document.getElementById("chart2"));
      var option = {
        legend: {
          orient: "vertical",
          left: "top",
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
          },
        ],
      };
      myChart1.setOption(option);
    },
    //矩形树图点击事件
    clickFun(param) {
      if (typeof param.seriesIndex == "undefined") {
        return;
      }
      if (param.type == "click") {
        this.chartname = param.name;
        // alert(param.name);
      }
    },
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
            sizeRange: [10, 40],
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
.mapcontent {
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
  background: url("../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  .sourceselect {
    flex: 2;
    // background-color: rgba(240, 248, 255, 0.178);
    .datasource {
      height: 20%;
      width: 100%;
      display: flex;
      align-items: center;
      .leftpt {
        flex: 3;
        font-size: 12pt;
        color: rgb(174, 193, 199);
        text-align: right;
      }
      .rightpt {
        flex: 8;
        .el-checkbox-group {
          width: 100%;
          .el-checkbox {
            color: rgb(174, 193, 199);
            margin-right: 7%;
            margin-top: 0%;
            margin-bottom: 2%;
            margin-left: 0%;
          }
          /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
            color: #85caca;
          }
          /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #85caca;
          }
        }
      }
    }
    .datatime {
      color: #85caca;
      font-size: 10pt;
      text-align: right;
      margin-top: 2%;
      padding-right: 6%;
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
          font-size: 10pt;
          color: #c0dfda;
          display: block;
        }
        .partnumber {
          font-size: 11pt;
          display: block;
          flex: 1;
        }
        .partimg {
          flex: 3;
          .myimg {
            height: 50%;
            width: 50%;
            margin-left: 28%;
            margin-top: 25%;
          }
        }
      }
      .Lpart {
        color: #46da6b;
        .partimg {
          background: url("../assets/img/recommend/left.png") no-repeat;
          background-size: 85% 100%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/景点.png") no-repeat;
            background-size: 80% 80%;
            background-position-x: 27%;
          }
        }
      }
      .Mpart {
        color: #33dfdf;
        .partimg {
          background: url("../assets/img/recommend/mid.png") no-repeat;
          background-size: 85% 100%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/评论.png") no-repeat;
            background-size: 90% 90%;
          }
        }
      }
      .Rpart {
        color: #a6ad61;
        .partimg {
          background: url("../assets/img/recommend/right.png") no-repeat;
          background-size: 85% 100%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/人数.png") no-repeat;
            background-size: 80% 80%;
            background-position-x: 17%;
          }
        }
      }
    }
  }
  .ranktable {
    flex: 3;
    // background-color: rgba(0, 255, 255, 0.233);
    .title {
      margin-top: 0 !important;
      height: 6% !important;
    }
    .ranktable-content {
      height: 92%;
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
        margin: 0%;
      }
      /deep/.el-tabs__item {
        padding: 0;
        width: 49%;
        border: none;
        //   background: url(../assets/img/tab.png)no-repeat;
        //   background-size: 100% 100%;
      }
      /deep/.el-tabs--top.el-tabs--border-card
        > .el-tabs__header
        .el-tabs__item:last-child {
        padding: 0;
      }
      /deep/.el-table .cell {
        padding-left: 0%;
        padding-right: 0%;
        text-align: center;
      }
      /deep/.el-tabs__nav-scroll {
        background: transparent;
        width: 80%;
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
        border-top: 0px solid #0cf3f3;
        // border-bottom: 2px solid #0cf3f3;
      }
      /deep/.el-tabs--border-card > .el-tabs__content {
        padding: 1%;
        height: 90%;
        width: 100%;
        margin-top: 1%;
      }
      .el-table--fit {
        background: transparent;
      }
      .el-table--fit {
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
    }
  }
}
.recommend-right {
  right: 0%;
  float: right;
  margin-right: 0.4%;
  background: url("../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
}
.recommend-bottom {
  width: 49%;
  position: absolute;
  z-index: 1;
  height: 30%;
  bottom: 8%;
  left: 25.5%;
  background: url("../assets/img/长方形.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .chartcontent {
    height: 100%;
    width: 33.3%;
    .title {
      margin-top: 2% !important;
    }
    .content {
      width: 100%;
      height: 85%;
    }
  }
}
</style>
