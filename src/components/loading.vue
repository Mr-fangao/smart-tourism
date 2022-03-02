<template>
  <div class="loading">
    <div class="load-4">
      <p>Loading</p>
      <div class="ring-1"></div>
    </div>
  </div>
</template>
<script>
import "../assets/css/loading.css";
export default {
  name: "Loading", // 定义的组件名称 使用时写法：loading
};
</script>
<style  lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(156, 187, 189, 0.486);
  width: 100%;
  height: 100%;
  z-index: 10;
  .load-4{
z-index: 100;
  }
}
</style>
