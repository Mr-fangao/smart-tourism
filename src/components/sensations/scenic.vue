<template>
  <div id="com-scenic">
    <div class="city-scenic">
      <div class="title"><span>城市形象感知分析</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "city",
};
</script>

<style scoped lang="less">
#com-city {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
}
.city-scenic {
  height: 100%;
  width: 20%;
  margin-left: 0.5%;
  background: url("../../assets/img/side.png") no-repeat;
  background-position: 100% 10%;
  background-size: 100% 91%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  .title {
    // flex: 0.5;
    margin-top: 5%;
    height: 4%;
    width: 100%;
    position: relative;
    left: 4%;
    background: url(../../assets/img/titlebg.png) no-repeat;
    background-size: 67% 95%;
    background-position: 6% 100%;
    font-size: 16pt;
    > span {
      float: left;
      margin-left: 18%;
      font-size: 12pt;
      line-height: 30px;
      color: aliceblue;
      text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #38e9e0,
        0 0 25px #0cf3f3;
    }
  }
}
</style>
