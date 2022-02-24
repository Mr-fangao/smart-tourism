<template>
  <div id="theme">
    <div class="select">
      <el-button @click="show(1)" :class="index === 1 ? 'active' : ''" plain
        >点聚合图</el-button
      >
      <el-button @click="show(2)" :class="index === 2 ? 'active' : ''" plain
        >分层色彩图</el-button
      >
      <el-button @click="show(3)" :class="index === 3 ? 'active' : ''" plain
        >热力图</el-button
      >
      <el-button @click="show(4)" :class="index === 4 ? 'active' : ''" plain
        >时序图</el-button
      >
      <el-button @click="show(5)" :class="index === 5 ? 'active' : ''" plain
        >多要素统计图</el-button
      >
    </div>
    <div class="content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import gradedcolormap from "../components/thememap/gradedcolormap.vue";
import pointgather from "../components/thememap/pointgather.vue";
import heatmap from "../components/thememap/heatmap.vue";
import timemap from "../components/thememap/timemap.vue";
import multimap from "../components/thememap/multimap.vue";
export default {
  components: { gradedcolormap, pointgather, heatmap, timemap, multimap },
  name: "theme",
  data() {
    return {
      index: 1,
      comp: "pointgather",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "pointgather";
      else if (value === 2) this.comp = "gradedcolormap";
      else if (value === 3) this.comp = "heatmap";
      else if (value === 4) this.comp = "timemap";
      else if (value === 5) this.comp = "multimap";
      //   else if (value === 3) this.comp = "density";
    },
  },
};
</script>

<style lang="less">
#theme {
  position: fixed;
  width: 100%;
  height: 100%;
}
  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
  }
  .select {
    z-index: 999;
    background: url(../assets/img/buttonbg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 999999;
    right: 5px;
    bottom: 3%;
    width: 14%;
    height: 38%;
    .el-button {
      background: url(../assets/img/themebutton.png) no-repeat;
      border: 0ch;
      margin-left: 0px;
      width: 180px;
      font-size: 18px;
      color: #64e9ef;
    }
    .el-button:nth-child(1) {
      margin-top: 10%;
    }
    .el-button:nth-child(5) {
      margin-bottom: 10%;
    }
    .el-button.is-plain:focus,
    .el-button.is-plain:hover {
      color: aliceblue;
      background: url(../assets/img/themebuttonfocus.png) no-repeat;
    }
  }

</style>
