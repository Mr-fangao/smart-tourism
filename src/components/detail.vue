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
                <span>平均分数 : {{ detaildata.score }}</span>
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
        <el-divider></el-divider>
        <div class="bottompart">
          <div class="headcontent">
            <div class="titleimg"></div>
            <div class="title">景点评论</div>
          </div>
          <div class="maincontent">
            <div class="tablehrader">
              <ul class="uititle">
                <li class="title">
                  <span class="content">评论</span>
                  <span class="score">评分</span>
                  <span class="time">评论时间</span>
                  <span class="website">数据源</span>
                </li>
              </ul>
            </div>
            <div class="srrollcontent">
              <vue-seamless-scroll
                :data="listData"
                :class-option="defaultOption"
              >
                <ul class="ul-scoll">
                  <li
                    class="li-scoll"
                    v-for="(item, index) in listData"
                    :key="index"
                  >
                    <div :title="item.content" class="pinglun">
                      {{ item.content }}
                    </div>
                    <div class="fenshu">{{ item.score }}</div>
                    <div class="riqi">{{ item.releaseTime }}</div>
                    <div class="laiyuan">{{ item.website }}</div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="submit">确认</button>
      </div> -->
    </div>
  </div>
</template>
<script>
// import vueSeamlessScroll from "vue-seamless-scroll";
import request from "../utils/request";
export default {
  name: "poppage",
  data() {
    return {
      detaildata: {},
      listData: [],
      com: [],
      score: [],
      components: {
      },
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
  mounted() {
    this.startData("2343");
  },
  methods: {
    getData() {
      var that = this;
      request
        .post("/api/data/scenicID", {
          id: this.porpID,
        })
        .then((res) => {
          this.listData = res.data.commentEntity;
          if (res.data.commentEntity[0].releaseTime.length > 11) {
            for (var i = 0; i < this.listData.length; i++) {
              this.listData.date[i] = this.listData.date[i].slice(0, 9);
            }
          }
          this.$forceUpdate();
          this.detaildata = res.data.scenicEntity;
          this.detaildata.score= this.detaildata.score.toFixed(2)
          this.getChartData(res.data.scenicEntity.name);
          if (this.detaildata.level == "null") {
            this.detaildata.level = "暂无";
          }
        });
    },
    getChartData(name) {
      var that = this;
      request
        .post("/api/data/comMonth", {
          model: name,
        })
        .then((res) => {
          this.com = res.data.comcount;
          this.score = res.data.scoreavg;
          for (var i = 0; i < this.score.length; i++) {
            this.score[i] = this.score[i].toFixed(2);
          }
          setTimeout(() => {
            this.initChart(this.com, this.score);
          }, 50);
        });
    },
    startData(val) {
      var that = this;
      request
        .post("/api/data/scenicID", {
          id: val,
        })
        .then((res) => {
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
    initChart(com, score) {
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
        color: ["#4FD219", "#47DCD9"],
        legend: {
          itemHeight: 10, //圆点大小
          itemWidth: 20, // 线的长度
          show: "true",
          data: ["分数", "游客数"],
          right: 10,
        },
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
        yAxis: [
          {
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
          {
            splitLine: { show: false },
            type: "value",
            name: "游客数",
            min: "dataMin",
            axisLine: {
              lineStyle: {
                // 设置y轴颜色
                color: "#4FD219",
              },
            },
          },
        ],
        series: [
          {
            yAxisIndex: 0,
            data: com,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#C5CDD4",
                // 拐点上显示数值
                label: {
                  show: true,
                  color: "#FFFF",
                },
                lineStyle: {
                  // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
                  color: "#4FD219",
                },
              },
            },
          },
          {
            yAxisIndex: 1,
            data: score,
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#C5CDD4",
                // 拐点上显示数值
                label: {
                  show: true,
                  color: "#FFFF",
                },
                lineStyle: {
                  // 使用rgba设置折线透明度为0，可以视觉上隐藏折线
                  color: "#47DCD9",
                },
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },

  watch: {
    porpID(idx) {
      if (idx != null) {
        this.getData();
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
  color: rgb(181, 219, 224);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    background: url("../assets/img/headerBG.png") no-repeat;
    background-size: 100% 100%;
    width: 20%;
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
    .headcontent {
      height: 10%;
      width: 100%;
      display: flex;
      align-items: center;
      .titleimg {
        width: 5%;
        height: 90%;
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
    .maincontent {
      height: 90%;
      width: 96%;
      margin-top: 1%;
      margin-left: 2%;
      margin-right: 2%;
      .tablehrader {
        height: 13%;
        width: 100%;
        .uititle {
          height: 100%;
          background-color: rgba(86, 212, 235, 0.575);
          color: aliceblue;
          font-size: 12pt;
          .title {
            height: 100%;
            display: flex;
            .content {
              height: 100%;
              width: 70%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .time {
              height: 100%;
              width: 15%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .score {
              height: 100%;
              width: 5%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .website {
              height: 100%;
              width: 10%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .srrollcontent {
        height: 87%;
        width: 100%;
        color: aliceblue;
        font-size: 11pt;
        //循环界限，超出隐藏
        overflow: hidden;
        .ul-scoll {
          .li-scoll {
            list-style: none;
            display: flex;
            margin-bottom: 1.5%;
            cursor: pointer;
            line-height: 20px;
            .pinglun {
              width: 70%;
              height: 100%;
              //单元格横向长度不足时 隐藏文字内容，并以鼠标悬停的方式显示
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: left;
              text-indent: 1em;
            }
            .fenshu {
              width: 5%;
            }
            .riqi {
              width: 15%;
            }
            .laiyuan {
              width: 10%;
            }
          }
        }
      }
    }
  }
}
.el-divider--horizontal {
  margin: 6px 0;
}
</style>