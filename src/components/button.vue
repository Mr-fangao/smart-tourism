<template>
  <div class="primary-button">
    <el-button>{{ name }}</el-button>
  </div>
</template>
<script>
export default {
  name: "poppage",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.primary-button {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /deep/.el-button {
    background: url("../assets/img/tab.png") no-repeat center center;
    background-size: 100% 100%;
    opacity: 0.8;
    padding: 0px 0px;
    // background: #24bff390;
    border: 0px;
    color: #ffffff;
    font-size: 14px;
    border-radius: 5px;
    width: 84px;
      height: 28px;
  }
  .el-button:focus {
    background-image: url("../assets/img/tab.png") no-repeat center center;
    background-size: 100% 100%;
    opacity: 0.8;
    background-color: #1a90d4c0;
  }
}
</style>