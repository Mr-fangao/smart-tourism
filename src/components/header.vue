<template>
  <nav>
    <div class="name">
      <img src="../assets/img/logo.png" />
      <h1>行游天下·景点智能分析与推荐系统</h1>
    </div>
    <ul>
      <li>
        <router-link to="/recommend" exact>智能推荐</router-link>
        <router-link to="/monitor" exact>景点监测</router-link>
        <router-link to="/query" exact>景点查询</router-link>
        <router-link to="/skAnalysis" exact>综合分析</router-link>
        <router-link to="/feelings" exact>情感分析</router-link>
        <router-link to="/thememap" exact>专题地图</router-link>
      </li>
    </ul>
    <span class="times">{{ time }}</span>
  </nav>
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
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  background: url(../assets/img/header.png);
  background-size: 100% 100%;
  padding: 0px;
  .name {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 32px;
      padding-left: 20px;
    }
    h1 {
      font-size: 30px;
      color: #000000;
      font-family: Microsoft YaHei;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .times {
    margin-right: 10px;
    float: right;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
  ul {
    height: 100%;
    list-style-type: none; /*消除黑点*/
    text-align: center;
    margin: 0px 0px 0px 60px;
    li {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 20px;
      a {
        font-size: 20px;
        color: #000000; /*设置字体颜色*/
        font-family: Microsoft YaHei;
        font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        margin: 0px 12px 0px 0px;
        padding: 10px;
        background: url(../assets/img/background.png);
        background-size: 100% 100%;
      }
    }
  }
}
/*选中则发生一些变化*/
.router-link-active {
  color: #36a503;
}
</style>
