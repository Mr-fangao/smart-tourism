<template>
  <div class="details">
    <div class="details-left part">
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
    </div>
    <div class="details-mid part"></div>
    <div class="details-righ part"></div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Bus from "../assets/js/bus.js";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      Bus.$on("myevent", (val) => {
        console.log(val);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.details {
  position: fixed;
  z-index: 1;
  height: 100%;
  width: 100%;
  background: url("../assets/img/banner.png");
  display: flex;
  .part {
    flex: 1;
    height: 100%;
  }
  .part:nth-child(1) {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .content {
      width: 100%;
      height: 31%;
    }
  }
  .part:nth-child(2) {
    flex: 2;
  }
  .part:nth-child(3) {
    .content {
      width: 100%;
      height: 31%;
    }
  }
}
</style>
