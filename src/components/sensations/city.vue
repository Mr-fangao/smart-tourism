<template>
  <div id="com-city">
    <div class="city-left">
      <div class="title"><span>城市形象感知分析</span></div>
    </div>
    <div class="city-content">
      <el-row>
<<<<<<< Updated upstream
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
=======
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
              <span>城市景点类型分布雷达图</span>
            </div>
            <div class="row1chartcontent" id="chart4"></div>
          </div>
          <div class="col-content"></div>
          <div class="col-content"></div>
        </el-col>
>>>>>>> Stashed changes
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
      </el-row>
      <div class="travels">
        <div class="travels-title"></div>
        <div class="travels-content">
          <span></span>
          <div class="travels-text" style="font-size:20pt">{{test}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "city",
<<<<<<< Updated upstream
=======
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
      option: {
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
      test:"大，导致一条弄堂里，和张方敏年纪相仿的男女有六七个之多，他们念过同一所小学，如今分道扬镳，散落到高中、职校和技校。人的未来大致由学校决定，张家爸妈心里是不大看得起弄堂其他小孩的。张方敏读的是区重点，明年肯定能考上一所好大学。张方敏没有此类等级观念，她最好的玩伴是住在九号的程勉。程勉比她大三岁，因为念书晚又复读过，只比她高一级，刚从职校毕业。她过了拐角来到九号门口的时候，程勉的姨婆正在楼下厨房炒菜。九号的一楼大半属于另一户人家，房主将其租给饭店，店门开在后马路上。程家的厨房和饭店后厨只隔一道薄墙，在夏季热如火炉，张方敏很佩服程勉姨婆不怕热地站在这里。刺激的香气钻进张方敏的鼻孔，她看见锅里翻炒的 […]"
    +"",
    };
  },
  mounted() {
    this.wordCloudInti(this.$refs.cloudEl, this.cloudData);
    this.initChart2();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.handleResize();
      });
    });
  },
  methods: {
    initChart2() {
      this.myChart2 = this.$echarts.init(document.getElementById("chart2"));
      // 指定图表的配置项和数据
      let option = this.option;
      // 使用刚指定的配置项和数据显示图表。
      this.myChart2.setOption(option);
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
  },
>>>>>>> Stashed changes
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
    .el-col{
      height: 33.3%;
      width: 100%;
<<<<<<< Updated upstream
=======
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
    .el-col:nth-child(2) {
      .col-content {
        height: 100%;
        width: 33.3%;
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
>>>>>>> Stashed changes
    }
  }
  .travels {
    width: 30%;
    height: 100%;
    // background-color:#38e9e0;
    .travels-title{
      height: 8%;
    }
  }
}
</style>
