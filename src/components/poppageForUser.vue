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
                      <span class="row">姓名</span>
                      <span class="row">性别</span>
                      <span class="row">姿态</span>
                      <span class="row">处理情况</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="content">
              <vue-seamless-scroll
                :data="listData"
                :class-option="classOption"
                class="warp"
              >
                <ul class="item">
                  <li v-for="(item, index) in listData" :key="index">
                    <span class="row">{{ item.name }}</span>
                    <span class="row">{{ item.sex }}</span>
                    <span class="row">{{ item.gesture }}</span>
                    <span class="row handle">{{ item.handle }}</span>
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
              :style="{ width: '300px', height: '300px' }"
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
      listData: [
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
        {
          name: "李花",
          sex: "女",
          gesture: "摔倒",
          handle: "已处理",
        },
      ],
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
    this.drawEchaets();
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },

    submit() {
      this.$emit("submit");
    },
    drawEchaets() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      });
    },
  },
  computed: {
    classOption() {
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
height: 22%;
    margin-bottom: 0%;
          border-left: 5px solid #0cf3f3;
    >p{
      position: absolute;
      left: 55px;
          top: 15.5%;
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
  // color: rgb(226, 33, 33);
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
    height: 9%;
    /* left: 1%; */
    margin-left: 8%;
    margin-bottom: 0%;
    border-left: 5px solid #0cf3f3;
    >p{
    position: relative;
    left: -26%;
    top: 15.5%;
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
    color: rgb(59, 223, 235);
    font-size: 18px;
  }
}
.row-bg {
  padding: 0px 0;
  background-color: #24bff390;
}
.warp {
    height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li,
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }
    }
  }
</style>
