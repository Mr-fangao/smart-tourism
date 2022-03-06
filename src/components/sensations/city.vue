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
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import wordcloud from "../../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";
export default {
  name: "city",
  components: {
    wordcloud,
  },
  data() {
    return {
      cloudData: [
        { value: 1000, name: "文字" },
        { value: 400, name: "图片" },
        { value: 333, name: "参考" },
        { value: 855, name: "音视频" },
        { value: 343, name: "新媒体" },
        { value: 343, name: "测试1" },
        { value: 43, name: "测试2" },
        { value: 543, name: "测试3" },
        { value: 333, name: "测试4" },
        { value: 323, name: "测试5" },
        { value: 33, name: "测试6" },
        { value: 13, name: "测试7" },
        { value: 543, name: "测试8" },
        { value: 66, name: "测试9" },
        { value: 666, name: "测试10" },
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
          data: ["投保门店数", "门店参与率"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
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
          {
            splitLine: { show: false },
            type: "value",
            name: "门店参与率",
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "投保门店数",
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
            data: [50, 75, 100, 150, 200, 250, 150, 30, 95, 160, 50, 45],
          },
          {
            name: "门店参与率",
            yAxisIndex: 1, //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
            type: "line",
            itemStyle: {
              /*设置折线颜色*/
              normal: {
                // color:'#c4cddc'
              },
            },
            data: [10, 75, 80, 20, 20, 25, 15, 10, 95, 16, 50, 45],
          },
        ],
      },
      chartdata2line: [250, 260, 124, 718, 235, 347, 460],
      chartdata2bar: [150, 230, 224, 218, 135, 147, 260],
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
            sizeRange: [10, 30],
            rotationRange: [-20, 20],
            shape: "circle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            gridSize: 3,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6,
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
  .el-row {
    margin-bottom: 0;
    margin-bottom: 0;
    height: 91%;
    top: 1%;
    .el-col {
      height: 33.3%;
      width: 100%;
      padding: 5px;
      // background: url("../../assets/img/buttonbg.png") no-repeat;
      // background-size: 100% 100%;
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
            margin-left: 1%;
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
</style>
