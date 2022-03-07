<template>
  <div id="com-city">
    <div class="city-left">
      <div class="title"><span>城市形象感知分析</span></div>
    </div>
    <div class="city-content">
      <el-row>
        <el-col :span="24">
          <div class="col-content">
            <div class="row1title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>城市特征词云分析</span>
            </div>
            <div class="row1chartcontent" id="chart1" ref="cloudEl"></div>
          </div>
          <div class="col-content">
            <div class="row1title">
              <div class="imgBK"></div>
              <span>形象分类均值分布图</span>
            </div>
            <div class="row1chartcontent" id="chart2" ref="chart2"></div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-content">
            <div class="row2title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>城市风光一览</span>
            </div>
            <div class="row1chartcontent" id="chart4">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <h3 class="medium">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="col-content">
            <div class="row2title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>游客评论文本IPA分析图</span>
            </div>
            <div class="row1chartcontent" id="chart5"></div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="col-content">
            <div class="row3title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>网络评论关注度</span>
            </div>
            <div class="row3chartcontent" id="chart5"></div>
          </div>
          <div class="col-content">
            <div class="row3title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>网络文本词性分布</span>
            </div>
            <div class="row3chartcontent" id="chart6"></div>
          </div>
          <div class="col-content">
            <div class="row3title">
              <!-- <img src="../../assets/img/panelIcon.png" alt="" /> -->
              <div class="imgBK"></div>
              <span>关键词分布雷达图</span>
            </div>
            <div class="row3chartcontent" id="chart7"></div></div
        ></el-col>
      </el-row>
      <div class="travels">
        <div class="travels-title">
          <div class="imgBK"></div>
          <span>历史游记</span>
          <button class="nextp" @click="getTravels()">下一条</button>
        </div>
        <div class="travels-content">
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
      </div>
    </div>
  </div>
</template>
<script>
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
import request from "../../utils/request";
export default {
  name: "city",
  components: {
    wordcloud,
  },
  data() {
    return {
      cloudData: [
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
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              //这是x轴文字颜色
              lineStyle: {
                color: " #999999",
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
                color: " #999999",
              },
            },
          },
        ],
        series: [
          {
            name: "城市形象",
            type: "bar",
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
        [9.21, 2.66, "自然景观"],
        [9.32, 1.66, "人文景观"],
        [8.81, 3.8, "植物状况"],
        [8.68, 4.8, "生态环境"],
      ],
      dataGZ: [
        [4.36, 3.13, "公园设施"],
        [0.37, 2.63, "标识系统"],
        [1.8, 2.91, "服务水平"],
        [1.18, 2.76, "管理治安"],
      ],
      itemStyle: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "rgba(0,0,0,0.3)",
      },
      option4: {
        color: ["#dd4444", "#fec42c", "#dd4444", "#fec42c"],
        legend: {
          top: 10,
          data: ["1", "2"],
          textStyle: {
            fontSize: 16,
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: "{@value}", // 点旁边显示label，这里使用name: '横坐标'这样写也可以，鼠标移入出现提示。
        },
        grid: {
          left: "10%",
          right: 150,
          top: "18%",
          bottom: "10%",
        },
        xAxis: {
          type: "value",
          name: "日期",
          nameGap: 16,
          nameTextStyle: {
            fontSize: 16,
          },
          max: 31,
          splitLine: {
            show: false,
          },
        },

        yAxis: {
          type: "value",
          name: "AQI指数",
          nameLocation: "end",
          nameGap: 20,
          axisLine: {
            lineStyle: {
              color: "#0087ED",
              width: 1, //这里是为了突出显示加上的
            },
          },
          nameTextStyle: {
            fontSize: 16,
          },
          splitLine: {
            show: false,
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
        ],
      },
      city: "拉萨",
      travelsdata: {
        figure: "",
        daycount: "",
        content: "",
        title: "",
        cost: "",
      },
      test:
        "大，导致一条弄堂里，和张方敏年纪相仿的男女有六七个之多，他们念过同一所小学，如今分道扬镳，散落到高中、职校和技校。人的未来大致由学校决定，张家爸妈心里是不大看得起弄堂其他小孩的。张方敏读的是区重点，明年肯定能考上一所好大学。张方敏没有此类等级观念，她最好的玩伴是住在九号的程勉。程勉比她大三岁，因为念书晚又复读过，只比她高一级，刚从职校毕业。她过了拐角来到九号门口的时候，程勉的姨婆正在楼下厨房炒菜。九号的一楼大半属于另一户人家，房主将其租给饭店，店门开在后马路上。程家的厨房和饭店后厨只隔一道薄墙，在夏季热如火炉，张方敏很佩服程勉姨婆不怕热地站在这里。刺激的香气钻进张方敏的鼻孔，她看见锅里翻炒的 […]" +
        "年纪相仿的男女有六七个之多，他们念过同一所小学，如今分道扬镳，散落到高中、职校和技校。人的未来大致由学校决定，张家爸妈心里是不大看得起弄堂其他小孩的。张方敏读的是区重点，明年肯定能考上一所好大学。张方敏没有此类等级观念，她最好的玩伴是住在九号的程勉。程勉比她大三岁，因为念书晚又复读过，只比她高一级，刚从职校毕业。她过了拐角来到九号门口的时候，程勉的姨婆正在楼下厨房炒菜。九号的一楼大半属于另一户人家，房主将其租给饭店，店门开在后马路上。程家的厨房和饭店后厨只隔一道薄墙，在夏季热如火炉，张方敏很佩服程勉姨婆不怕热地站在这里。刺激的香气钻进张方敏的鼻孔，她看见锅里翻炒",
    };
  },
  mounted() {
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    this.initChart2();
    this.initChart4();
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
    initChart4() {
      let myChart4 = this.$echarts.init(document.getElementById("chart5"));
      // 指定图表的配置项和数据
      var option4 = {
        color: ["#dd4444", "#fec42c"],
        legend: {
          top: 10,
          data: ["1", "2"],
          textStyle: {
            fontSize: 16,
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: "{@value}", // 点旁边显示label，这里使用name: '横坐标'这样写也可以，鼠标移入出现提示。
        },
        grid: {
          left: "10%",
          right: 150,
          top: "18%",
          bottom: "10%",
        },
        xAxis: {
          type: "value",
          name: "日期",
          nameGap: 16,
          nameTextStyle: {
            fontSize: 16,
          },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #F5FDFD80",
            },
          },
          max: 22,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "AQI指数",
          nameLocation: "end",
          nameGap: 20,
          scale: true,
          nameTextStyle: {
            fontSize: 16,
          },
          max: 3.8,
          splitLine: {
            show: false,
          },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: " #F5FDFD80",
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
            data: this.dataGZ,
          },
          {
            name: "4",
            type: "scatter",
            itemStyle: this.itemStyle,
            data: this.dataGZ,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart4.setOption(option4);
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
          count: "100",
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
.city-left {
  height: 100%;
  width: 20%;
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
    height: 4%;
    width: 100%;
    position: relative;
    left: 0%;
    background: url(../../assets/img/titlebg.png) no-repeat;
    background-size: 57% 93%;
    background-position: 9% 100%;
    font-size: 16pt;
    > span {
      float: left;
      margin-left: 18%;
      font-size: 12pt;
      line-height: 30px;
      color: aliceblue;
      text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #38e9e0,
        0 0 25px #0cf3f3;
    }
  }
}
.city-content {
  height: 100%;
  width: 76.5%;
  position: relative;
  right: 0%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  .el-row {
    margin-bottom: 0;
    height: 91%;
    width: 70%;
    top: 1%;
    .el-col {
      height: 33.3%;
      width: 100%;
      padding: 5px;
    }
    .imgBK {
      background: url("../../assets/img/panelIcon.png") no-repeat;
      background-size: 100% 100%;
    }
    .el-col:nth-child(1) {
      .col-content {
        height: 100%;
        width: 50%;
        float: left;
        .row1title {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .imgBK {
            height: 90%;
            width: 7%;
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
    .el-col:nth-child(2) {
      .col-content {
        height: 100%;
        width: 50%;
        float: left;
        .row2title {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .imgBK {
            height: 90%;
            width: 7%;
            margin-left: 2%;
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
    .el-col:nth-child(3) {
      .col-content {
        height: 100%;
        width: 33.3%;
        float: left;
        .row3title {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .imgBK {
            height: 90%;
            width: 11%;
            margin-left: 2%;
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
      // .col-content:nth-child(1){
      //   width: 33.3%;
      // }
      // .col-content:nth-child(2){
      //   width: 66.6%;
      // }
    }
  }
  .travels {
    width: 30%;
    height: 100%;
    // background-color:#38e9e0;
    .travels-title {
      height: 4%;
      width: 100%;
      margin-top: 4%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .imgBK {
        height: 90%;
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
    .travels-content {
      height: 84%;
      width: 100%;
      .travels-name {
        height: 8%;
        color: #fff;
        font-size: 12pt;
        .title {
          height: 60%;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 10%;
        }
        .descriptions {
          height: 70%;
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
        color: rgb(141, 141, 141);
        font-size: 12pt;
        height: 90%;
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
  height: 150px !important;
}
</style>
