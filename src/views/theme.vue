<template>
  <div class="page">
    <div class="select">
      <el-button @click="                                              (1)" :class="index === 1 ? 'active' : ''" plain>点聚合图</el-button>
      <el-button @click="show(2)" :class="index === 2 ? 'active' : ''" plain>cmk</el-button>
      <el-button plain>朴素按11111111111钮</el-button>
      <el-button plain>朴素按钮</el-button>
      <el-button plain>朴素按钮</el-button>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import cmk from "../components/thememap/cmk.vue";
import pointgather from "../components/thememap/pointgather.vue";
export default {
  components: { cmk, pointgather },
  name: "theme",
  data() {
    return {
      index: 1,
      comp: "cmk",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "cmk";
      else if (value === 2) this.comp = "pointgather";
      //   else if (value === 3) this.comp = "density";
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
  .select {
    position: absolute;
    z-index: 999999;
    right: 40px;
    bottom: 10px;
    width: 200px;
    .el-button{
        margin-left:0px;
        width: 180px;
        font-size: 18px;
    }
  }
}
</style>
