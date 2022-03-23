<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">个人面板</span>
        <div class="close-btn" @click="hideModal">
          <!-- <i class="fa fa-times" aria-hidden="true" style="color: red"></i> -->
        </div>
      </div>
      <div class="modal-main">
        <div class="title"><p>基本信息</p></div>
        <el-row :gutter="20">
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>用户名:</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>{{ user.uname }}</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>账号:</p>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <p>{{ user.email }}</p>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>年龄:</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>{{ user.uage }}</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>性别:</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>{{ user.sex }}</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>地址:</p>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <p>{{ user.uAddress }}</p>
            </div></el-col
          >
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        </el-row> -->
        <!-- <div class="ptChart">
          {{ porpID }}
        </div> -->
      </div>
      <div class="modal-foot">
        <div class="part" id="pt1">
          <div class="pttitle"><p>历史浏览记录</p></div>
          <div class="content1">
            <div class="alarm-content">
              <ul>
                <li class="title1">
                  <ul>
                    <li>
                      <span class="row">名称</span>
                      <span class="row">城市</span>
                      <span class="row">景点特征</span>
                      <span class="row">浏览次数</span>
                      <span class="row">浏览时间</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="content">
              <vue-seamless-scroll :data="list" :class-option="optionSetting">
                <ul class="item">
                  <li v-for="(item, index) in list" :key="index">
                    <span class="row">{{ item.name }}</span>
                    <span class="row">{{ item.city }}</span>
                    <span class="row">{{ item.features }}</span>
                    <span class="row">{{ item.frequency }}</span>
                    <span class="row handle">{{ item.time }}</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div class="part" id="pt2">
          <div class="pttitle">
            <p>取向偏好分析</p>
          </div>
          <div class="content1">
            <div
              id="myChart"
              :style="{ width: '400px', height: '340px' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "poppage",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      user: {
        uname: "李齐枫",
        uage: "21",
        sex: "男",
        email: "123456789@163.com",
        uAddress: "滁州市",
        //历史游览景点偏向分析
        uAnaysis: "",
        //历史收藏景点
        uliked: "",
      },
      list: [],
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
    this.loadList();
    this.drawEchaets();
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },
    submit() {
      this.$emit("submit");
    },
    loadList() {
      let list = [
        {
          name: "云冈石窟",
          city: "山西大同",
          features: "石雕艺术宝库",
          frequency: "1",
          time: "2022-03-03",
        },
        {
          name: "平遥古城",
          city: "山西晋中",
          features: "历史文化名城",
          frequency: "1",
          time: "2022-03-03",
        },
        {
          name: "黄山风景区",
          city: "安徽黄山",
          features: "奇山",
          frequency: "2",
          time: "2022-03-03",
        },
        {
          name: "鼓浪屿",
          city: "福建厦门",
          features: "万国建筑博览",
          frequency: "2",
          time: "2022-03-03",
        },
        // {
        //   name: "路南石林",
        //   city: "云南石林彝族自治县",
        //   features: "喀斯特地貌",
        //   frequency: "1",
        //   time: "2022-03-03",
        // },
        {
          name: "庐山",
          city: "江西庐山",
          features: "避暑游览胜地",
          frequency: "3",
          time: "2022-03-02",
        },
        {
          name: "井冈山",
          city: "天然氧吧",
          features: "江西吉安",
          frequency: "2",
          time: "2022-03-02",
        },
        {
          name: "蓬莱阁",
          city: "山东烟台",
          features: "古代四大名楼",
          frequency: "1",
          time: "2022-03-02",
        },
        {
          name: "秦始皇陵",
          city: "陕西西安",
          features: "帝王陵墓",
          frequency: "1",
          time: "2022-03-02",
        },
        {
          name: "华山",
          city: "陕西渭南",
          features: "五岳之首",
          frequency: "1",
          time: "2022-03-02",
        },
        {
          name: "拙政园",
          city: "江苏苏州",
          features: "古典山水园林",
          frequency: "1",
          time: "2022-03-02",
        },
      ];
      for (let a = 0; a < 10; a++) {
        for (let i = 0; i < list.length; i++) {
          let j = {
            name: list[i].name,
            city: list[i].city,
            features: list[i].features,
            frequency: list[i].frequency,
            time: list[i].time,
            // time: utilDate.dateFtt(new Date()),
          };
          this.list.push(j);
        }
      }
    },
    drawEchaets() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        color: ["rgb(30, 215, 228)", "rgb(10, 236, 112)"],
        legend: {
          data: ["2021年频次", "2020年频次"],
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
          x:'right',
          y:'top',
          orient: 'vertical',
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "山岳", max: 4 },
            { name: "历史", max: 4 },
            { name: "园林", max: 4 },
            { name: "建筑", max: 4 },
            { name: "古城", max: 4 },
            { name: "艺术", max: 4 },
          ],
          axisLine: {
            lineStyle: {
              color: " #fff",
            },
          },
        },

        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4, 2, 1, 2, 1, 2],
                name: "2021年频次",
                lineStyle: {
                  color: "rgb(30, 215, 228)",
                },
              },
              {
                value: [2, 3, 1, 1, 2, 2],
                name: "2020年频次",
                lineStyle: {
                  color: "rgb(10, 236, 100)",
                },
              },
            ],
          },
        ],
      });
    },
  },
  computed: {
    optionSetting() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: false, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.modal-container {
  background: url("../assets/img/popbk.png");
  background-size: 100% 100%;
  border-radius: 3%;
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 9%;
  margin-top: 2%;
  background: url("../assets/img/poptitle.png");
  color: rgb(250, 250, 250);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    position: absolute inherit;
    text-align: center;
    font-size: 16pt;
  }
  .close-btn {
    background: url("../assets/img/close.png");
    background-size: 100% 100%;
    height: 4%;
    width: 2%;
    position: absolute;
    margin-right: -86% !important;
  }
}
.title{
color: aliceblue;
font-size: 14pt;
    width: 50%;
    height: 20%;
    margin-bottom: 0%;
          border-left: 5px solid #0cf3f3;
    >p{
      position: absolute;
      left: 55px;
      top: 15.5%;
      // text-shadow: 0 0 10px #fff, 0 0 20px #999696, 0 0 30px #fff, 0 0 40px #eefffe, 0 0 70px #404646;
    }
}
.modal-main {
  height: 22%;
  margin-top: 1%;
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
}
.modal-foot{
  // color: rgb(10, 236, 112);
  // background: #0cf3f3;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 61%;
  width: 100%;
  .part{
    // background:rgb(235, 89, 89);
    height: 100%;
    width: 100%;
    .pttitle{
    color: aliceblue;
    font-size: 14pt;
    width: 50%;
    height: 8%;
    /* left: 1%; */
    margin-left: 8%;
    margin-bottom: 0%;
    border-left: 5px solid #0cf3f3;
    >p{
    position: relative;
    left: -26%;
    top: 15.5%;
        // text-shadow: 0 0 10px #fff, 0 0 20px #999696, 0 0 30px #fff, 0 0 40px #eefffe, 0 0 70px #404646;
    }
    }
    .content1{
      color: #fff;
          width: 91%;
    margin-left: 45px;
      .title1{
        ul{
          li{
            display: flex;
            flex-direction: row;
    margin: 5px 0px;
            // justify-content: space-between;
                span{
                  width: 25%;
    border-left: 1px solid #1c7f9b;
    border-right: 1px solid #1c7f9b;
    background-color: #8bc7ea73;
                }
          }
        }
      }
    }
  }
}
/deep/.el-col {
  border: 1px solid #24bff390;
    padding: 0px !important
  // &:last-child {
  //   margin-bottom: 0;
  // }
}
.el-col {
  border-radius: 0px;
}
.bg-purple {
  // background: #d3dce6c4;
}
.grid-content {
  border-radius: 0px;
  min-height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    color: #fff;
    font-size: 18px;
  }
}
.row-bg {
  padding: 0px 0;
  background-color: #24bff390;
}
.content {
  width: 100%;
  height: 90%;
  overflow: hidden;
  
    .item {
      list-style: none;
      padding: 0;
      // margin: 0 auto;
      li{
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        // justify-content: space-between;
        // margin-right: 10px;
        font-size: 15px;
        color: #fff;
        span{
          width: 25%;
        }
      }
    }
  }
</style>
