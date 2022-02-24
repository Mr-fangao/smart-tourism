<template>
  <div class="page">
    <div class="left">
      <el-tooltip
        class="item"
        effect="light"
        content="Left Top 提示文字"
        placement="left-start"
      >
        <el-button @click="show(1)" :class="index === 1 ? 'active' : ''"
          >分析1</el-button
        >
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        content="Left Center 提示文字"
        placement="left"
      >
        <el-button @click="show(2)" :class="index === 2 ? 'active' : ''"
          >分析2</el-button
        >
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="light"
        content="Left Bottom 提示文字"
        placement="left-end"
      >
        <el-button @click="show(3)" :class="index === 3 ? 'active' : ''"
          >分析3</el-button
        >
      </el-tooltip>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import kdxfx from "../components/Skanalysis/kdxfx.vue";
import odfx from "../components/Skanalysis/odfx.vue";
import density from "../components/Skanalysis/density.vue";
export default {
  components: { kdxfx, odfx, density },
  name: "query",
  data() {
    return {
      index: 1,
      comp: "odfx",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "kdxfx";
      else if (value === 2) this.comp = "odfx";
      else if (value === 3) this.comp = "density";
    },
  },
};
</script>

<style lang="less">
.page {
  width: 100%;
  height: 100%;
  .content {
    height: 80%;
    width: 100%;
  }
  .left {
    position: absolute; /*这里一定要设置*/
    z-index: 999999; /*这里是该元素与显示屏的距离，据说越大越好，因为没有它也是可以的*/
    float: left inherit;
    width: 80px;
  }
  .item {
    margin: 4px;
  }
  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>
