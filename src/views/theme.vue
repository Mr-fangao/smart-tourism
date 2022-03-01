<template>
  <div id="theme">
    <div class="aside">
      <el-menu>
        <el-menu-item
          index="1"
          @click="show(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <i class="fa fa-eercast fa-lg"></i>
          <span class="tab" slot="title">聚合</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="show(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <i class="fa fa-exchange fa-lg"></i>
          <span class="tab" slot="title">分级</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="show(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <i class="fa fa-thermometer-0 fa-lg"></i>
          <span class="tab" slot="title">热力</span>
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="show(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <i class="el-icon-menu"></i>
          <span class="tab" slot="title">多要素</span>
        </el-menu-item>
        <el-menu-item
          index="5"
          @click="show(5)"
          :class="index === 5 ? 'active' : ''"
          plain
        >
          <i class="el-icon-menu"></i>
          <span class="tab" slot="title">时序</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- <div class="select">
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
    </div> -->
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
      else if (value === 4) this.comp = "multimap";
      else if (value === 5) this.comp = "timemap";
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
.tab {
  height: 38%;
  line-height: 40px;
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
