<template>
  <div id="recommend">
    <!-- <div id="map" /> -->
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
                  placeholder=" 输入内容或点击标签"
                ></el-input>
                <div class="labelcontent">
                  <span>输入示例:</span>
                  <div
                    class="chooselabel"
                    v-for="(item, i) in labellist"
                    :key="i"
                    @click="getLabel(item.name)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div v-if="!activeNameflag" class="tab2"></div>
            </div>
          </el-col>
        </el-row>
        <div class="row2">
          <div class="row2-select">出游时间</div>
          <div class="date-picker">
            <el-date-picker
              v-model="timevalue"
              type="daterange"
              range-separator="-"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="myrow">
          <div class="sorcelabel">数据源</div>
          <div class="datasorce">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="去哪儿"></el-checkbox>
              <el-checkbox label="马蜂窝"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="buttoncontent">
          <el-button class="startbutton" @click="refeashData()"
            >更新数据</el-button
          >
          <el-button class="startbutton" @click="getRecommend()"
            >开始推荐</el-button
          >
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
              :data="tableRankData"
              height="420px"
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
                width="80"
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
              height="420px"
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
                width="80"
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
        </el-tabs>
      </div>
      <div class="rightbottom">
        <div class="title"><span>专题地图选择</span></div>
        <div class="rightbottom-content">
          <div
            class="mapchange"
            index="1"
            @click="showmap(1)"
            :class="activeClass == index ? 'active' : ' '"
          >
            <img src="../assets/img/theme/聚合.png" alt="" />
            <span>点聚合图</span>
          </div>
          <div
            class="mapchange"
            index="2"
            @click="showmap(2)"
            :class="activeClass == index ? 'active' : ''"
          >
            <img src="../assets/img/theme/分级.png" alt="" />
            <span>分级色彩</span>
          </div>
          <div
            class="mapchange"
            index="3"
            @click="showmap(3)"
            :class="activeClass == index ? 'active' : ''"
          >
            <img src="../assets/img/theme/热力图.png" alt="" />
            <span>热力图</span>
          </div>
          <div
            class="mapchange"
            index="4"
            @click="showmap(4)"
            :class="index === 4 ? 'active' : ''"
          >
            <img src="../assets/img/theme/时间.png" alt="" />
            <span>时序图</span>
          </div>
          <div class="mapchange"></div>
          <div class="mapchange"></div>
        </div>
      </div>
    </div>
    <div class="recommend-bottom">
      <div class="content-bottom">
        <div class="title"><span>热门城市榜及特征分析</span></div>
        <div class="content">
          <el-table
            ref="interfaceTable"
            :data="tableCityData"
            @row-click="clickData"
            height="211px"
            style="padding: 2.5%; margin-left: 3%"
            stripe
            highlight-current-row
            class="“customer-table”"
          >
            <el-table-column
              prop="hotrank"
              label="排名"
              width="40"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              width="60"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sccount"
              label="景点数目"
              width="60"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="comcount"
              label="热度"
              width="50"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="scscore"
              label="分数"
              width="50"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content-bottom">
        <span class="mytitle">{{ chosencity }}-评论图片</span>
        <div class="content carouselcontent">
          <el-carousel
            indicator-position="outside"
            height="180px"
            trigger="click"
          >
            <el-carousel-item v-for="(item, index) in cityimages" :key="index">
              <img
                :src="item.url"
                alt="无图片"
                style="background-size: 100% 100%; witdh: 150px; height: 200px"
              />
            </el-carousel-item>
            <!-- <el-carousel-item v-for="item in cityimages" :key="item">
              <img :src="item.url" alt="无图片" style="background-size:100% 100%;" display:block; />
            </el-carousel-item> -->
          </el-carousel>
        </div>
      </div>
      <div class="content-bottom">
        <span class="mytitle">{{ chosencity }}-特征词云</span>
        <div class="content" id="wordcloud" ref="wordcloud"></div>
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
      //推荐

      //专题图切换
      activeClass: "1",
      //下方的城市名
      chosencity: "北京市",
      //动画加载
      state: "",
      isLoading: false,
      //地图切换
      index: 1,
      comp: "pointgather",
      isShow: true,
      mycloudData: [],
      beijingData: [
        { value: 773, name: "故宫" },
        { value: 502, name: "长城" },
        { value: 270, name: "建筑" },
        { value: 212, name: "胡同" },
        { value: 192, name: "天安门" },
        { value: 182, name: "颐和园" },
        { value: 170, name: "博物馆" },
        { value: 158, name: "环球" },
        { value: 154, name: "历史" },
        { value: 138, name: "八达岭" },
        { value: 112, name: "天坛" },
        { value: 105, name: "度假" },
        { value: 104, name: "清华" },
        { value: 100, name: "银杏" },
        { value: 96, name: "北海" },
        { value: 94, name: "王府" },
        { value: 94, name: "皇帝" },
        { value: 93, name: "慕田峪" },
        { value: 92, name: "大学" },
        { value: 88, name: "乾隆" },
        { value: 87, name: "景山公园" },
        { value: 86, name: "八达岭长城" },
        { value: 84, name: "南锣鼓巷" },
        { value: 79, name: "紫禁城" },
        { value: 79, name: "地坛" },
        { value: 75, name: "慕田峪长城" },
      ],
      sanyaData: [
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
      nanjingData: [
        { value: 1800, name: "纳木措" },
        { value: 1200, name: "西藏" },
        { value: 1000, name: "海拔" },
        { value: 900, name: "景色" },
        { value: 700, name: "湖水" },
        { value: 650, name: "雪山" },
        { value: 630, name: "值得" },
        { value: 610, name: "没有" },
        { value: 600, name: "地方" },
        { value: 543, name: "风景" },
        { value: 523, name: "景区" },
        { value: 500, name: "感觉" },
        { value: 500, name: "高原" },
        { value: 490, name: "湖面" },
        { value: 490, name: "圣湖" },
        { value: 490, name: "小时" },
        { value: 430, name: "湖泊" },
        { value: 430, name: "大圣" },
        { value: 430, name: "美丽" },
        { value: 380, name: "景点" },
        { value: 380, name: "牦牛" },
        { value: 340, name: "时间" },
        { value: 280, name: "咸水湖" },
        { value: 260, name: "天湖" },
        { value: 260, name: "藏民" },
        { value: 200, name: "朋友" },
        { value: 200, name: "蓝天白云" },
        { value: 100, name: "开车" },
        { value: 50, name: "神圣" },
        { value: 40, name: "推荐" },
        { value: 25, name: "限速" },
        { value: 13, name: "距离" },
      ],
      cityimages: [
        { url: require("../assets/img/city/1.jpg") },
        { url: require("../assets/img/city/201111424880.jpg") },
        // { url: require("../assets/img/login/3.jpg") },
      ],
      BJ: [
        // { url: require("../assets/city/BJ/BJ1.webp") },
        // { url: require("../assets/img/login/3.jpg") },
      ],
      tableRankData: "",
      labellist: [
        { id: 1, name: "山岳" },
        { id: 2, name: "海滨" },
        { id: 3, name: "历史" },
        { id: 4, name: "革命老区" },
        { id: 5, name: "商业街" },
        { id: 6, name: "划船" },
        { id: 7, name: "文物" },
      ],
      tableCityData: [],
      timevalue: [],
      //景点特征
      input: "",
      changename: "景点特征",
      radio: "1",
      activeName: "recommendTab",
      activeNameflag: "true",
      checkList: ["途游"],
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
      currentRow: null,
    };
  },
  mounted() {
    // this.initmap();
    this.getRankTable(),
      this.getCityRank(),
      this.clickRow(),
      // this.wordCloudInti(this.$refs.wordcloud, this.cloudData);
      // this.wordCloudInti(this.$refs.wordcloud, this.beijingData);
      this.wordCloudInti(this.$refs.wordcloud, this.beijingData);
  },
  methods: {
    clickData(val) {
      this.chosencity = val.city;
      // this.mycloudData=this.sanyaData
      this.wordCloudInti(this.$refs.wordcloud, this.sanyaData);
      console.log(city);
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
      request.get("/api/data/cityRank").then((res) => {
        console.log(res);
        this.tableCityData = res.data;
        for (let i = 0; i <= res.data.length; i++) {
          this.tableCityData[i].scscore = parseFloat(
            this.tableCityData[i].scscore
          ).toFixed(2);
        }
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
    clickRow() {
      this.$nextTick(function () {
        this.$refs.interfaceTable.setCurrentRow(this.tableCityData[0]);
      });
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
.mapcontent {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
}
.citychoose {
  z-index: 9999;
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
  height: 33%;
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
      margin-top: 0%;
      margin-bottom: 0%;
      > span {
        line-height: 38px;
      }
    }
    .mytitle {
      float: left;
      margin-left: -45%;
      text-align: left;
      margin-bottom: 0%;
      margin-top: 4%;
      border-left: 5px solid #0cf3f3;
      color: white;
      text-indent: 0.8em;
      font-size: 11pt;
    }
    .content {
      flex: 6;
      width: 100%;
    }
    .carouselcontent {
      margin-top: 4%;
      height: 90%;
      width: 90%;
    }
  }
  .content-bottom:nth-child(2) {
    flex: 1;
    height: 100%;
  }
  .content-bottom:nth-child(1) {
    flex: 1;
    height: 100%;
    .title {
      flex: 1;
      width: 100%;
      background-size: 40% 80%;
      margin-left: -12%;
      > span {
        margin-left: 15.5%;
      }
    }
  }
  .content-bottom:nth-child(3) {
    flex: 1;
    height: 100%;
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
        height: 39%;
        background: url("../assets/img/bubg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        // justify-content: space-around;
        cursor: pointer;
        .active {
          color: #0cf3f3;
        }
        > img {
          height: 52%;
          width: 37%;
          margin-left: 30%;
          margin-top: 5%;
          background-size: 100% 100%;
        }
        > span {
          color: #c5d4e6;
          padding-top: 5%;
        }
      }
    }
  }
}
.col1 {
  display: flex;
}

/deep/.el-input__inner {
  left: 15%;
  top: 51%;
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
.row2 {
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .row2-select {
    flex: 1;
    color: #cfe2e1;
    margin-left: -11%;
  }
  .date-picker {
    flex: 1;
  }
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
  font-size: 11pt;
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
      flex-wrap: wrap;
      > span {
        font-size: 12pt;
        color: #c5d4e6;
        // margin-left: -19%;
      }
      .chooselabel {
        background: #8ae5e54a;
        margin-left: 2%;
        border: 1px solid #ffffff40;
        font-size: 11pt;
        border-radius: 5px;
        cursor: pointer;
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
      margin-top: 2%;
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
  /deep/.el-table .cell {
    padding-left: 0%;
    padding-right: 0%;
    text-align: center;
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
    border-top: 3px solid #0cf3f3;
    // border-bottom: 2px solid #0cf3f3;
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
    background-image: linear-gradient(
      -180deg,
      #bdd9e017 4%,
      #9fdae565 100%
    ) !important;
    background: transparent;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid #1faacd;
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
    background-color: #fafafa !important;
  }
  /deep/.el-table .el-table__body tr:hover > td {
    background-color: #dfdfdf !important;
  }
}
.recommend-bottom {
  border: none;
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
  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 2px;
    height: 50px;
    background: #eee;
  }
  /deep/.el-table__body-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.4);
  }
  /deep/.el-table__row > td {
    border: none;
  }
  /deep/.el-table::before {
    height: 0px;
  }
  .customer-table th {
    border: none;
  }
  .customer-table td,
  .customer-table th.is-leaf {
    border: none;
  }

  .el-table--border,
  .el-table--group {
    border: none;
  }

  .customer-table thead tr th.is-leaf {
    border-right: none;
  }
  .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }
  .customer-table::before {
    width: 0;
  }
  .customer-table .el-table__fixed-right::before,
  .el-table__fixed::before {
    width: 0;
  }

  .el-table--border th.gutter:last-of-type {
    border-left: none;
  }
}
</style>
