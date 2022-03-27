<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">景点详情</span>
        <div class="close-btn" @click="hideModal">
          <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
        </div>
      </div>
      <div class="modal-main">
        <div class="toppart">
          <div class="leftcontent">
            <div class="name labelcontent">
              <div class="titleimg"></div>
              <span>景点名称 : {{ detaildata.name }}</span>
            </div>
            <div class="address labelcontent">
              <div class="titleimg"></div>
              <span>地址 : {{ detaildata.address }}</span>
            </div>
            <div class="hotandscore labelcontent">
              <div class="label">
                <div class="titleimg"></div>
                <span>平均分数 : {{ detaildata.score | rounding }}</span>
              </div>
              <div class="label">
                <div class="titleimg"></div>
                <span>旅游热度 : {{ detaildata.hot }}</span>
              </div>
            </div>
            <div class="level labelcontent">
              <div class="titleimg"></div>
              <span>景点评级 : {{ detaildata.level }}</span>
            </div>
          </div>
          <div class="rightcontent">
            <div class="headcontent">
              <div class="titleimg"></div>
              <div class="title">景点评分月变化图</div>
            </div>
            <div class="chartcontent" id="linechart"></div>
          </div>
        </div>
        <div class="bottompart"></div>
      </div>
      <!-- <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="submit">确认</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  name: "poppage",
  data() {
    return {
      detaildata: {},
      commentdata: {},
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    porpID: {
      type: String,
      default: "",
    },
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  mounted() {},
  methods: {
    getData() {
      var that = this;
      request
        .post("/api/data/scenicID", {
          id: this.porpID,
        })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            this.initChart();
          }, 100);
          this.detaildata = res.data.scenicEntity;
          if (this.detaildata.level == "null") {
            this.detaildata.level = "暂无";
          }
        });
    },
    hideModal() {
      this.$emit("hideModal");
    },
    submit() {
      this.$emit("submit");
    },
    initChart() {
      console.log("1111111");
      var chartDom = document.getElementById("linechart");
      let myChart = this.$echarts.init(chartDom);
      var option;
      option = {
        /*         title: {
          text: "折线图",
          x: "left",
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            color: "#989DA1",
            fontSize: 14,
          },
        }, */
        xAxis: {
          type: "category",
          name: "月份",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#989DA1",
            },
          },
        },
        grid: {
          top: "14%", //距上边距
          left: "10%", //距离左边距
          right: "12%", //距离右边距
          bottom: "10%", //距离下边距
        },
        yAxis: {
          splitLine: { show: false },
          type: "value",
          name: "分数",
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#989DA1",
            },
          },
        },
        series: [
          {
            data: [
              820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320,
            ],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label : {
                  show: true,
                  color:'#FFFF'
                },
                lineStyle:{
                  // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
                  color: '#47DCD9'
                }
              }
            }
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    porpID(idx) {
      if (idx != null) {
        this.getData();
        this.initChart();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 302%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  background: url("../assets/img/buttonbg.png");
  background-size: 100% 100%;
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  width: 50%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  background: transparent;
  color: rgb(223, 223, 223);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    position: absolute inherit;
    text-align: center;
    font-size: 13pt;
  }
  .close-btn {
    position: absolute;
    margin-right: -90% !important;
  }
}
.modal-main {
  height: 91%;
  padding: 15px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
  .toppart {
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .leftcontent {
      // background-color: rgba(65, 131, 189, 0.219);
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .hotandscore {
        display: flex;
        .label {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: row;
          .titleimg {
            background: url("../assets/img/panelIcon.png") no-repeat;
            background-size: 100% 100%;
            width: 20%;
            height: 50%;
          }
        }
      }
      .labelcontent {
        color: aliceblue;
        height: 15%;
        display: flex;
        align-items: center;
        font-weight: 200;
        > span {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .titleimg {
          width: 10%;
          height: 50%;
          background: url("../assets/img/panelIcon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .rightcontent {
      height: 100%;
      width: 50%;
      .headcontent {
        height: 15%;
        width: 100%;
        display: flex;
        align-items: center;
        .titleimg {
          width: 10%;
          height: 50%;
          background: url("../assets/img/panelIcon.png") no-repeat;
          background-size: 100% 100%;
        }
        .title {
          width: 80%;
          height: 100%;
          text-align: left;
          color: aliceblue;
          display: flex;
          align-items: center;
        }
      }
      .chartcontent {
        height: 85%;
        width: 100%;
      }
    }
  }
  .bottompart {
    height: 50%;
  }
}
</style>