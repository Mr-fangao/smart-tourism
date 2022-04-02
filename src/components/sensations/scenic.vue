<template>
  <div id="com-city">
    <selectRegion />
    <div id="map" />
    <div class="city-left">
      <div class="city-left-select">
        <div class="title">
          <div class="imgBK"></div>
          <span>城市特征词云分析</span>
        </div>
        <div class="content" id="chart1" ref="cloudEl"></div>
      </div>
      <div class="city-left-bottom">
        <div class="col-content">
          <div class="row1title">
            <div class="imgBK"></div>
            <span>游客口碑一览</span>
          </div>
          <div class="commentroll"></div>
        </div>
        <div class="col-content">
          <div class="row1title">
            <div class="imgBK"></div>
            <span>形象分类均值分布图</span>
          </div>
          <div class="row1chartcontent" id="chart2" ref="chart2"></div>
        </div>
      </div>
    </div>
    <div class="city-content">
      <el-row>
        <el-col :span="16"
          ><div class="col-content">
            <div class="row2title">
              <div class="imgBK"></div>
              <span>游客评论文本IPA分析图</span>
            </div>
            <div class="row1chartcontent" id="chart3"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-content">
            <div class="row3title">
              <div class="imgBK"></div>
              <span>城市风光一览</span>
            </div>
            <div class="row1chartcontent" id="chart4">
              <el-carousel
                :interval="2000"
                arrow="always"
                indicator-position="outside"
              >
                <el-carousel-item
                  v-for="(item, index) in cityimages"
                  :key="index"
                >
                  <img
                    :src="item.url"
                    alt="无图片"
                    style="
                      background-size: 100% 100%;
                      witdh: 150px;
                      height: 200px;
                    "
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="city-travels">
      <div class="travels-content">
        <div class="travels-title">
          <div class="imgBK"></div>
          <span>历史游记</span>
          <button class="nextp" @click="getTravels()">下一条</button>
        </div>
        <div class="travels-name">
          <div class="title">
            {{ travelsdata.title }}
          </div>
          <div class="descriptions">
            <!-- <span>用户名称:{{ travelsdata.title }}</span> -->
            <span>游玩天数:{{ travelsdata.daycount }}</span>
            <span>出游形式:{{ travelsdata.figure }}</span>
            <span>累计费用:{{ travelsdata.cost }}</span>
          </div>
        </div>
        <div class="travels-text">{{ travelsdata.content }}</div>
      </div>
      <div class="travels-bottom">
        <div class="col-content">
          <div class="row3title">
            <div class="imgBK"></div>
            <span>景点网络口碑</span>
          </div>
          <div class="row3chartcontent" id="chart5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eventBum from "../../views/traffickingnetwork/public/js/EvebtBus";
import SelectRegion from "../../views/traffickingnetwork/components/selectRegion.vue";

import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
import request from "../../utils/request";
const mapboxgl = require("mapbox-gl");
import areaSelect from "../areaSelect.vue";
export default {
  name: "city",
  components: {
    wordcloud,
    SelectRegion,
    areaSelect,
  },
  data() {
    return {
      selectcity: {
        name: "中国",
        level: 0,
      },
      cityimages: [
        { url: require("../../assets/img/BJ/beijing01.jpg") },
        { url: require("../../assets/img/BJ/beijing02.jpg") },
        { url: require("../../assets/img/BJ/beijing03.jpg") },
        { url: require("../../assets/img/BJ/beijing04.jpg") },
        { url: require("../../assets/img/BJ/beijing05.jpg") },
      ],
      cloudData: [
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
      option2: {
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            return (
              params[0].seriesName +
              ": " +
              params[0].data +
              "<br>" +
              params[1].seriesName +
              ": " +
              params[1].data +
              "%"
            );
          },
        },
        legend: {
          data: ["城市形象", "全国平均水平"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 16,
          },
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                // color: " #999999",
                color: "#fff",
              },
            },
            data: [
              "交通",
              "住宿",
              "地理位置",
              "旅行体验",
              "景区环境",
              "景区设施",
              "服务",
              "饮食",
            ],
          },
        ],
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            name: "数量",
            interval: 50,
            axisLabel: {
              formatter: "{value} ",
            },
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                // color: " #999999",
                color: "#fff",
              },
            },
          },
        ],
        grid: {
          left: "10%",
          right: "5%",
          top: "15%",
          bottom: "15%",
        },
        series: [
          {
            name: "城市形象",
            type: "bar",
            barWidth: 20,
            /*设置柱状图颜色*/
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    "#fe4f4f",
                    "#fead33",
                    "#feca2b",
                    "#fef728",
                    "#c5ee4a",
                    "#87ee4a",
                    "#46eda9",
                    "#47e4ed",
                    "#4bbbee",
                    "#7646d8",
                    "#924ae2",
                    "#C6E579",
                    "#F4E001",
                    "#F0805A",
                    "#26C0C0",
                  ];
                  return colorList[params.dataIndex];
                },
                /*信息显示方式*/
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                },
              },
            },
            data: [0.28, 0.278, 0.478, 0.637, 0.669, 0.369, 0.547, 0.372],
          },
          {
            name: "全国平均水平",
            yAxisIndex: 0, //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                // color:'#c4cddc'
              },
            },
            data: [0.193, 0.178, 0.512, 0.683, 0.721, 0.358, 0.432, 0.498],
          },
        ],
      },
      dataBJ: [
        [4.95, 3.08, "自然景观"],
        [2.56, 2.85, "人文景观"],
        [6.51, 2.43, "植物状况"],
        [11.25, 2.39, "生态环境"],
      ],
      dataGZ: [
        [15.1, 1.82, "公园设施"],
        [1.5, 2.24, "标识系统"],
        [2.9, 2.74, "服务水平"],
        [21.5, 1.8, "管理治安"],
      ],
      data03: [
        [13.11, 2.52, "情感体验"],
        [6.12, 2.64, "拥挤感知"],
        [2.73, 2.5, "亲情体验"],
        [7.32, 2.87, "游憩活动"],
      ],
      data04: [
        [7, 1.82, "内部交通"],
        [3.2, 1.65, "外部交通"],
        [3.1, 1.98, "游览成本"],
        [1.21, 1.59, "餐饮消费"],
      ],
      itemStyle: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "rgba(0,0,0,0.3)",
      },
      city: "北京",
      travelsdata: {
        figure: "",
        daycount: "",
        content: "",
        title: "",
        cost: "",
      },
      option5: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          x: 55,
          y: 15,
          x2: 10,
          y2: 40,
          // containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              // color: " #999999",
              color: "#fff",
            },
          },
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              // color: " #999999",
              color: "#fff",
            },
          },
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        },
        series: [
          {
            barWidth: 10,
            name: "2011",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
        ],
      },
    };
  },
  mounted() {
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
    });
    this.initmap();
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    this.initChart2();
    this.initChart3();
    this.initChart5();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
    this.getTravels();
  },
  methods: {
    initChart2() {
      let myChart2 = this.$echarts.init(document.getElementById("chart2"));
      // 指定图表的配置项和数据
      let option = this.option2;
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option);
    },
    initChart3() {
      let myChart3 = this.$echarts.init(document.getElementById("chart3"));
      // 指定图表的配置项和数据
      var option3 = {
        color: ["#91cc75", "#fec42c", "#ee6666", "#fc8452"],
        legend: {
          top: 10,
          right: 45,
          itemHeight: 8,
          itemWidth: 8,
          orient: "vertical",
          data: ["1", "2", "3", "4"],
          textStyle: {
            color: "#F5FDFD80",
            fontSize: 12,
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: "{@value}", // 点旁边显示label，这里使用name: '横坐标'这样写也可以，鼠标移入出现提示。
        },
        grid: {
          left: "5%",
          right: "20%",
          top: "10%",
          bottom: "25%",
        },
        xAxis: {
          type: "value",
          name: "关注度",
          nameGap: 0,
          nameTextStyle: {
            fontSize: 12,
          },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              // color: " #F5FDFD80",
              color: "#fff",
            },
          },
          max: 22,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "评价",
          nameLocation: "end",
          nameGap: 10,
          scale: true,
          nameTextStyle: {
            fontSize: 12,
          },
          max: 3.1,
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              // color: " #F5FDFD80",
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "1",
            type: "scatter",
            itemStyle: this.itemStyle,
            data: this.dataBJ,
          },
          {
            name: "2",
            type: "scatter",
            itemStyle: this.itemStyle,
            data: this.dataGZ,
          },
          {
            name: "3",
            type: "scatter",
            itemStyle: this.itemStyle,
            data: this.data03,
          },
          {
            name: "4",
            type: "scatter",
            itemStyle: this.itemStyle,
            data: this.data04,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart3.setOption(option3);
    },
    initChart5() {
      let myChart5 = this.$echarts.init(document.getElementById("chart5"));
      // 指定图表的配置项和数据
      let option = this.option5;
      // 使用刚指定的配置项和数据显示图表。
      myChart5.setOption(option);
    },
    handleResize() {
      this.myChart2 && this.myChart2.resize();
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
            sizeRange: [10, 35],
            rotationRange: [-20, 20],
            shape: "circle",
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
    getTravels() {
      request
        .post("/api/data/cityTravel", {
          count: "1000",
          city: this.city,
        })
        .then((res) => {
          console.log(res);
          this.travelsdata.title = res.data.title;
          this.travelsdata.content = res.data.content;
          this.travelsdata.daycount = res.data.daycount;
          this.travelsdata.figure = res.data.figure;
          this.travelsdata.cost = res.data.price;
        });
    },
    initmap() {
      var that = this;
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [105, 35],
        zoom: 3.5,
      });
    },
  },
};
</script>

<style scoped lang="less">
#com-city {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.city-left {
  position: absolute;
  left: 0%;
  height: 100%;
  width: 22.5%;
  margin-left: 0.1%;
  background: url("../../assets/img/side.png") no-repeat;
  background-position: 100% 8%;
  background-size: 100% 92%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  .city-left-select {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      padding-top: 4%;
      height: 16%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .imgBK {
        margin-left: 2%;
        height: 100%;
        width: 8%;
        background: url("../../assets/img/panelIcon.png") no-repeat;
        background-size: 100% 100%;
      }
      > span {
        color: rgb(115, 215, 228);
        font-size: 12pt;
      }
    }
    .content {
      height: 85%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .content1 {
        margin-top: 10%;
        width: 100%;
        height: 20%;
      }
      .content2 {
        width: 100%;
        height: 50%;
      }
    }
  }
  .city-left-bottom {
    flex: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    .col-content {
      height: 44%;
      width: 100%;
      float: left;
      .commentroll {
        height: 85%;
        width: 100%;
      }
      .row1title {
        height: 15%;
        width: 100%;
        margin-left: 2%;
        color: aliceblue;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .imgBK {
          height: 90%;
          width: 7%;
          background: url("../../assets/img/panelIcon.png") no-repeat;
          background-size: 100% 100%;
        }
        > span {
          color: rgb(115, 215, 228);
          font-size: 12pt;
        }
      }
      .row1chartcontent {
        height: 90%;
        width: 100%;
      }
    }
  }
}
.city-content {
  width: 51%;
  position: absolute;
  z-index: 1;
  height: 37%;
  bottom: 7.4%;
  left: 23%;
  background: url("../../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  .el-row {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
    // top: 1%;
    .el-col {
      // padding: 5px;
      height: 100%;
      .col-content {
        height: 100%;
        width: 100%;
        float: left;
        .row2title {
          height: 12%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .imgBK {
            height: 87%;
            width: 5%;
            margin-left: 1%;
            background: url("../../assets/img/panelIcon.png") no-repeat;
            background-size: 100% 100%;
          }
          > span {
            color: rgb(115, 215, 228);
            font-size: 12pt;
          }
        }
        .row3title {
          height: 12%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .imgBK {
            height: 87%;
            width: 9.5%;
            background: url("../../assets/img/panelIcon.png") no-repeat;
            background-size: 100% 100%;
          }
          > span {
            color: rgb(115, 215, 228);
            font-size: 12pt;
          }
        }

        .row1chartcontent {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
.city-travels {
  position: absolute;
  right: 3%;
  width: 22.5%;
  height: 100%;
  background: url("../../assets/img/side.png") no-repeat;
  background-position: 100% 8%;
  background-size: 100% 92%;
  display: flex;
  flex-direction: column;
  .travels-content {
    display: flex;
    flex-direction: column;
    height: 61%;
    width: 100%;
    .travels-title {
      height: 8%;
      width: 100%;
      margin-top: 4%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .imgBK {
        height: 85%;
        width: 7%;
        margin-left: 2%;
        background: url("../../assets/img/panelIcon.png") no-repeat;
        background-size: 100% 100%;
      }
      > span {
        color: rgb(115, 215, 228);
        font-size: 12pt;
      }
      .nextp {
        color: #8fece8;
        font-size: 10pt;
        width: 20%;
        height: 70%;
        margin-left: 45%;
        background: url("../../assets/img/框.png") no-repeat;
        background-size: 100% 100%;
        border: none;
        cursor: pointer;
      }
    }
    .travels-name {
      height: 13%;
      width: 100%;
      color: #fff;
      font-size: 12pt;
      .title {
        height: 40%;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 10%;
      }
      .descriptions {
        height: 60%;
        width: 100%;
        padding-left: 9%;
        > span {
          width: 50%;
          float: left;
          color: #89c4eb9a;
          font-size: 10pt;
          text-align: left;
        }
      }
    }
    .travels-text {
      color: #cfcfcf;
      font-size: 12pt;
      height: 87%;
      overflow-y: auto;
      padding: 10px;
      width: 100%;
      text-indent: 2em;
    }
    ::-webkit-scrollbar {
      width: 5px; /*高宽分别对应横竖滚动条的尺寸 */
      height: 5px;
      background-color: rgba(135, 175, 221, 0.055);
    }

    /* 滚动槽的轨道 */
    ::-webkit-scrollbar-track {
      border-radius: 30px;
    }

    /* 滚动条的小滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: lightskyblue;
    }
  }
  .travels-bottom {
    display: flex;
    height: 30%;
    flex-direction: column;
    width: 100%;
    .col-content {
      height: 95%;
      width: 100%;
      float: left;
      .row3title {
        height: 15%;
        width: 100%;
        margin-left: 2%;
        color: aliceblue;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .imgBK {
          height: 90%;
          width: 7%;
          background: url("../../assets/img/panelIcon.png") no-repeat;
          background-size: 100% 100%;
        }
        > span {
          color: rgb(115, 215, 228);
          font-size: 12pt;
        }
      }
      .row3chartcontent {
        height: 100%;
        width: 100%;
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/deep/.el-carousel__container {
  margin-top: 4%;
  margin-bottom: 2%;
  height: 200px !important;
}
</style>
