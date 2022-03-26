<template>
  <div id="skAnalysis">
    <div class="skAnalysis-aside">
      <el-menu>
        <el-menu-item
          index="1"
          @click="show(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <i class="fa fa-eercast fa-lg"></i>
          <span class="tab" slot="title">椭圆</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="show(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <i class="fa fa-exchange fa-lg"></i>
          <span class="tab" slot="title">客流</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="show(3)"
          :class="index === 3 ? 'active' : ''"
          plain
        >
          <i class="fa fa-thermometer-0 fa-lg"></i>
          <span class="tab" slot="title">冷热</span>
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="show(4)"
          :class="index === 4 ? 'active' : ''"
          plain
        >
          <i class="el-icon-menu"></i>
          <span class="tab" slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="skAnalysis-content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>

import deviationellipse from "../components/Skanalysis/ellipse.vue";
import feelmonitor from "../components/feeling/feelmonitor.vue";
import cold from "../components/Skanalysis/cold.vue";
import odfx from "../components/Skanalysis/odfx.vue";
import hotcold from "../components/Skanalysis/density.vue";
export default {
  components: { feelmonitor, deviationellipse, cold, odfx,hotcold },
  name: "skAnalysis",
  data() {
    return {
      index: 1,
      comp: "deviationellipse",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "deviationellipse";
      else if (value === 2) this.comp = "odfx";
      else if (value === 3) this.comp = "cold";
      else if (value === 4) this.comp = "hotcold";
      // else if (value === 3) this.comp = "heatmap";
    },
  },
};
</script>

<style lang="less">
#skAnalysis {
  position: fixed;
  width: 100%;
  height: 100%;
}
.skAnalysis-content {
  position: absolute;
  top: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
}
.skAnalysis-aside {
  height: 100%;
  z-index: 999999;
  position: absolute;
  width: 3%;
  top: 0;
  right: 0;
  background-color: rgba(2, 25, 31, 0.8);
  .el-menu {
    top: 30%;
    width: 100%;
    height: 10%;
    right: 0%;
    background: transparent;
    border: none;
    .tab {
      height: 38%;
      line-height: 40px;
    }
  }
  .el-menu-item.is-active {
    color: #15abc5;
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
