<template>
  <div class="content">
    <div class="left">
      <div class="title">景点热搜Top10</div>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity1, index) in activities1"
            :key="index"
            :icon="activity1.icon"
            :type="activity1.type"
            :color="activity1.color"
            :size="activity1.size"
            :timestamp="activity1.timestamp"
          >
            {{ activity1.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="main">
      <div class="header"></div>
    </div>
    <div class="right">
      <div class="title">城市热搜Top10</div>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity2, index) in activities2"
            :key="index"
            :icon="activity2.icon"
            :type="activity2.type"
            :color="activity2.color"
            :size="activity2.size"
            :timestamp="activity2.timestamp"
          >
            {{ activity2.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="aside">
      <ul>
        <li>
          <router-link to="/survey" exact
            ><img src="../assets/img/feelings/jc.png"
          /></router-link>
          <p>监测</p>
          <router-link to="/feelings" exact
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
  name: "survey",

  data() {
    return {
      activities1: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-01 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-location",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          size: "large",
          icon: "el-icon-location",
          color: "#36a503",
        },
        {
          content: "支持使用图标",
          timestamp: "2018-04-01 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-location",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          size: "large",
          icon: "el-icon-location",
          color: "#36a503",
        },
      ],activities2: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-01 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
        },
      ],
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
