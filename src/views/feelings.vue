<template>
  <div class="content">
    <div class="left">
      <div class="title">
        <i class="el-icon-s-claim"></i>
        区域情感分析
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

    <div class="map"></div>
    <div class="aside">
     <ul>
      <li>
        <router-link to="/survey" exact><img src="../assets/img/feelings/jc.png"/></router-link>
        <p>监测</p>
        <router-link to="/feelings" exact><img src="../assets/img/feelings/qg.png"/></router-link>
        <p>情感</p>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "feelings",

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
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .left {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.3);
    .title {
      font-size: 16pt;
      padding:20px 0px 10px 0px;
    }
    .crawling {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding:10px;
      .el-select {
        padding-right:10px;
      }

    }
    .query {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      .el-input {
        padding-right: 10px;
      }
    }
  }
  .map {
    height: 100%;
    width: 77%;
  }
  .aside{
    height: 100%;
    width: 3%;
    background-color: rgba(127, 194, 172, 0.3);
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
      img{
      height: 32px;
      }
      p {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        padding-bottom: 20px;
      }
    }
  }
  }
}
</style>
