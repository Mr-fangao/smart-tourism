<template>
  <div class="backcolor">
    <nav>
      <ul>
        <li id="u1">
          <router-link to="/recommend" exact>智能推荐</router-link>
          <router-link to="/query" exact>景点查询</router-link>
          <router-link to="/thememap" exact>专题地图</router-link>
          <router-link to="/sensation" exact>形象感知</router-link>
        </li>
      </ul>
      <h1>中国景点智能分析与推荐系统</h1>
      <ul>
        <li id="u2">
          <router-link to="/skAnalysis" exact>时空分析</router-link>
          <router-link to="/odAnalysis.vue" exact>客流分析</router-link>
          <router-link to="/feelings" exact>情感分析</router-link>
        </li>
      </ul>
      <div class="user">1</div>
      <!-- <span class="times">{{ time }}</span> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: "pageheader",
  data() {
    return {
      time: "2020年08月31日 10:29",
    };
  },
  mounted() {
    this.currentTime();
  },
  methods: {
    currentTime() {
      setInterval(this.getTime, 500);
    },
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.time =
        yy + "年 " + mm + "月" + dd + "日 " + hh + ":" + mf + ":" + ss;
    },
  },
};
</script>

<style scoped lang="less">
.backcolor {
  background-color: #02191f;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: normal;
  justify-content: flex-start;
  height: 50px;
  background: url(../assets/img/BG.png);
  background-size: 78% 140%;
  background-position-x: 50%;
  padding: 0px;
  h1 {
    font-size: 25px;
    color: #39fcff;
    font-family: Microsoft YaHei;
    // font-weight: bold;
  }
  .times {
    margin-right: 10px;
    float: right;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
  ul {
    flex: 1;
    height: 100%;
    width: 100%;
    list-style-type: none; /*消除黑点*/
    text-align: center;
    li {
      height: 100%;
      width: 93%;
      display: flex;
      flex-direction: row;
      // justify-content: space-evenly;
      align-items: center;
      a {
        font-size: 16px;
        width: 25%;
        color: #528c8c; /*设置字体颜色*/
        font-family: Microsoft YaHei;
        font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 0px;
        margin: 0px 0px -10px 0px;
        line-height: 30px;
        background: url(../assets/img/button.png) no-repeat;
        background-size: 100% 90%;
        background-position: 100% 100%;
      }
    }
  }
  #u1 {
    margin-left: 0%;
  }
  #u2 {
    justify-content: center;
    a {
      background: url(../assets/img/rightbutton.png) no-repeat;
      background-size: 100% 90%;
      background-position: 100% 100%;
    }
    a:nth-child(1) {
      margin-left: -60px;
    }
    .router-link-active {
      background: url(../assets/img/rightbuttonative.png) no-repeat;
      margin: 0px 0px -12px 0px;
      line-height: 30px;
      background-size: 113% 157%;
      background-position: 114% 0%;
    }
  }
}
.user {
  position: absolute;
  margin-right: 0%;
  float: right;
  right: 0;
  width: 9%;
  height: 6%;
  background: #39fcff;
}
/*选中则发生一些变化*/
.router-link-active {
  color: #e0fbff;
  background: url(../assets/img/buttonative.png) no-repeat;
  margin: 0px 0px -12px 0px;
  line-height: 30px;
  background-size: 105% 160%;
  background-position: -85% 0%;
}
</style>
