<template>
  <div class="com">
    <div class="left">
      <div class="title">景点热搜Top10</div>
    </div>
    <div class="main">
      <div class="header"></div>
    </div>
    <div class="right">
      <div class="title">城市热搜Top10</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "kdxfx",
};
</script>

<style scoped lang="less">
.com {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .left {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
  }
  .main {
    height: 100%;
    width: 57%;
  }
  .right {
    height: 100%;
    width: 20%;
    background-color: rgba(127, 194, 172, 0.1);
    .title {
      font-size: 16pt;
      padding: 20px 0px 10px 0px;
    }
  }
}
</style>
