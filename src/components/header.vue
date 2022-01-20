<template>
  <nav>
    <ul>
      <li>
        <router-link to="/1" exact>主页</router-link>
        <router-link to="/2" exact>时空分析</router-link>
        <router-link to="/thememap" exact>专题地图</router-link>
        <router-link to="/feelings" exact>情感分析</router-link>
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
ul {
  list-style-type: none; /*消除黑点*/
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #fff; /*设置字体颜色*/
  text-decoration: none; /*消除下划线*/
  padding: 12px;
  border-radius: 5px;
}
nav {
  .times {
    margin-right: 20px;
    float: right;
  }
  height: 50px;
  background: grey;
  padding: 0px 0;
}
/*选中则发生一些变化*/
.router-link-active {
  background: rgba(255, 255, 255, 0.8);
  color: #444;
}
</style>
