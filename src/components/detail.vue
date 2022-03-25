<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">景点详情</span>
        <div class="close-btn" @click="hideModal">
          <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
        </div>
      </div>
      <div class="modal-main">
        <div class="toppart">
          <div class="leftcontent">
            <div class="name labelcontent">
              <div class="titleimg"></div>
              <span>景点名称 : {{ detaildata.name }}</span>
            </div>
            <div class="address labelcontent"></div>
            <div class="name labelcontent"></div>
            <div class="hotandscore labelcontent"></div>
            <div class="level labelcontent"></div>
          </div>
          <div class="rightcontent"></div>
        </div>
        <div class="bottompart"></div>
      </div>
      <!-- <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="submit">确认</button>
      </div> -->
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  name: "poppage",
  data() {
    return {
      detaildata: {},
      commentdata: {},
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    porpID: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log("XXX", this.porpID);
  },
  methods: {
    getData() {
      request
        .post("/api/data/scenicID", {
          id: this.porpID,
        })
        .then((res) => {
          console.log(res);
          this.detaildata = res.data.scenicEntity;
        });
    },
    hideModal() {
      this.$emit("hideModal");
    },

    submit() {
      this.$emit("submit");
    },
  },
  watch: {
    porpID(idx) {
      if (idx != null) {
        this.getData();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 302%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  background: url("../assets/img/buttonbg.png");
  background-size: 100% 100%;
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  width: 50%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  background: transparent;
  color: rgb(223, 223, 223);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    position: absolute inherit;
    text-align: center;
    font-size: 13pt;
  }
  .close-btn {
    position: absolute;
    margin-right: -90% !important;
  }
}
.modal-main {
  height: 91%;
  padding: 15px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
  .toppart {
    height: 50%;
    display: flex;
    flex-direction: row;
    .leftcontent {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .labelcontent {
        color: aliceblue;
        height: 20%;
        display: flex;
        align-items: center;
        font-weight:800;
        .titleimg {
          width: 10%;
          height: 50%;
          background: url("../assets/img/panelIcon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .rightcontent {
      height: 100%;
      width: 50%;
    }
  }
  .bottompart {
    height: 50%;
  }
}
</style>