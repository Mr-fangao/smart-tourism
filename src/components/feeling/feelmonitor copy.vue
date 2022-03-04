<template>
  <div class="com">
    <div id="map" />
    <div class="content">
      <div class="left">
        <div class="title">
          <span>区域情感分析</span>
        </div>
        <div class="crawling">
          <el-select v-model="value" placeholder="数据来源">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-date-picker v-model="date" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-button>一键爬取</el-button>
        <div class="space"></div>
        <div class="query">
          <el-input placeholder="请输入关键词" v-model="input" clearable>
          </el-input>
          <el-button>查询</el-button>
          <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
        </div>
        <el-button>重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feelmonitor",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "微博",
        },
        {
          value: "选项2",
          label: "小红书",
        },
        {
          value: "选项3",
          label: "马蜂窝",
        },
      ],
      value: "",
      date: "",
      input: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.com {
  position: fixed;
  height: 100%;
  width: 100%;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.content {
  height: 100%;
  width: 20%;
  position: absolute;
  z-index: 100;
  top: 0%;
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    width: 100%;
    margin-left: 0.5%;
    background: url("../../assets/img/side.png") no-repeat;
    background-position: 100% 10%;
    background-size: 100% 91%;
    .title {
      margin-top: 5%;
      height: 7%;
      width: 100%;
      position: relative;
      left: 4%;
      background: url(../../assets/img/titlebg.png) no-repeat;
      background-size: 70% 70%;
      font-size: 16pt;
      > span {
        float: left;
        margin-left: 18%;
        font-size: 15pt;
        line-height: 30px;
        color: aliceblue;
        text-shadow: 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff,
          0 0 30px #38e9e0, 0 0 40px #0cf3f3;
      }
    }
  }
}
.aside {
  height: 100%;
  z-index: 999999;
  position: absolute;
  width: 3%;
  top: 0;
  right: 0;
  background-color: rgba(2, 25, 31, 0.8);
  .el-menu {
    top: 25%;
    width: 100%;
    height: 8%;
    right: 0%;
    background: transparent;
    border: none;
  }
  .el-menu-item.is-active {
    color: #15abc5;
    border-right: 5px solid #0cf3f3;
    background: transparent;
  }
  .el-menu-item {
    color: #fff;
  }
  .el-menu-item:hover {
    background: transparent;
  }
  .span {
    color: aliceblue;
  }
  ul {
    height: 100%;
    list-style-type: none; /*消除黑点*/
    text-align: center;
    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        color: aqua;
        font-size: 12px;
        font-family: Microsoft YaHei;
        // font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
