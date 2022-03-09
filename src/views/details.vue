<template>
  <div class="details">
    <div class="details-left part">
      <div class="content">
        <div class="title">
          <span>精选图片</span>
        </div>
        <div class="con"></div>
      </div>
      <div class="content">
        <div class="title">
          <span>游客数据</span>
        </div>
        <div class="con"></div>
      </div>
      <div class="content">
        <div class="title">
          <span>游客月变化图</span>
        </div>
        <div class="con"></div>
      </div>
    </div>
    <div class="details-mid part"></div>
    <div class="details-righ part">
      <div class="content">
        <div class="title">
          <span>精选图片</span>
        </div>
        <div class="con"></div>
      </div>
      <div class="content">
        <div class="title">
          <span>游客来源分布</span>
        </div>
        <div class="con"></div>
      </div>
      <div class="content">
        <div class="title">
          <span>游客月变化图</span>
        </div>
        <div class="con"></div>
      </div>
    </div>
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
    height: 93%;
    padding: 0.7%;
  }
  .part:nth-child(1) {
    background: url(../assets/img/side.png) no-repeat;
    opacity: 1;
    background-size: 95% 98%;
    background-position: 36% 40%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .content {
      width: 100%;
      height: 33.3%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      .title {
        flex: 1;
        width: 100%;
        background: url("../assets/img/titlebg.png") no-repeat;
        background-size: 50% 80%;
        background-position-x: 6%;
        > span {
          color: rgb(178, 228, 228);
          position: absolute;
          left: 4%;
          line-height: 28px;
          font-size: 11pt;
        }
      }
      .con {
        flex: 6;
        width: 100%;
      }
    }
  }
  .part:nth-child(2) {
    flex: 2;
  }
  .part:nth-child(3) {
    background: url(../assets/img/side.png) no-repeat;
    opacity: 1;
    background-size: 95% 98%;
    background-position: 36% 40%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .content {
      width: 100%;
      height: 33.3%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      .title {
        flex: 1;
        width: 100%;
        background: url("../assets/img/titlebg.png") no-repeat;
        background-size: 50% 80%;
        background-position-x: 6%;
        > span {
          color: rgb(178, 228, 228);
          position: absolute;
          left: 4%;
          line-height: 28px;
          font-size: 11pt;
        }
      }
      .con {
        flex: 6;
        width: 100%;
      }
    }
  }
}
</style>
