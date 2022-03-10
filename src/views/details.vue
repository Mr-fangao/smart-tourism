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
    <div class="details-mid part">
      <div class="middle">
        <div class="middle-top">
          <div class="middle-top-left">
            <div class="rowfirst row"></div>
            <div class="rowsecond row"></div>
            <div class="rowthird row"></div>
          </div>
          <div class="middle-top-right"></div>
        </div>
        <div class="middle-bottom">
          <div class="title">
            <span>实时评论</span>
          </div>
          <div class="middle-bottom-content"></div>
        </div>
      </div>
    </div>
    <div class="details-righ part">
      <div class="content">
        <div class="title">
          <span>词云分析</span>
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
          <span>口碑月变化图</span>
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
          left: 78.8%;
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
  .middle {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .middle-top {
      width: 100%;
      flex: 2;
      display: flex;
      .middle-top-left {
        padding-bottom: 5%;
        flex: 4;
        display: flex;
        flex-direction: column;
        .rowfirst {
          flex: 1;
        }
        .rowsecond {
          flex: 2;
        }
        .rowthird {
          flex: 2;
        }
      }
      .middle-top-right {
        padding-bottom: 5%;
        flex: 3;
      }
    }
    .middle-bottom {
      width: 100%;
      margin-top: -5%;
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      background: url("../assets/img/长方形.png") no-repeat;
      .title {
        flex: 1;
        margin-top: 1%;
        height: 20%;
        width: 45%;
        background: url("../assets/img/titlebg.png") no-repeat;
        background-size: 50% 80%;
        background-position-x: 6%;
        > span {
          color: rgb(178, 228, 228);
          position: absolute;
          left: 29.5%;
          line-height: 28px;
          font-size: 11pt;
        }
      }
      .middle-bottom-content {
        flex: 6;
      }
    }
  }
}
</style>
