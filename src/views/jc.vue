<template>
  <div class="content">
    <div class="left">
      <div class="title">景点热搜Top10</div>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="top1" placement="top">
            <el-card>
              <h4>庐山风景区</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="top2" placement="top">
            <el-card>
              <h4>庐山风景区</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="top3" placement="top">
            <el-card>
              <h4>庐山风景区</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="main"></div>
<div class="right">
      <div class="title">城市热搜Top10</div>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="top1" placement="top">
            <el-card>
              <h4>杭州</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="top2" placement="top">
            <el-card>
              <h4>苏州</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="top3" placement="top">
            <el-card>
              <h4>江西</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    
    <div class="aside">
      <ul>
        <li>
          <router-link to="/jc" exact
            ><img src="../assets/img/feelings/jc.png"
          /></router-link>
          <p>监测</p>
          <router-link to="/qg" exact
            ><img src="../assets/img/feelings/qg.png"
          /></router-link>
          <p>情感</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "jc",

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
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
    .el-timeline-item__wrapper {
      padding: 0px;
    }
  }
  .main {
    height: 100%;
    width: 57%;
  }
  .right {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
    .el-timeline-item__wrapper {
      padding: 0px;
    }
  }
  .aside {
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
        img {
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
.el-timeline-item__wrapper {
    padding: 0px;
  }
}
</style>
