<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">个人面板</span>
        <div class="close-btn" @click="hideModal">
          <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
        </div>
      </div>
      <div class="modal-main">
        <div class="ptChart">
          {{ cityname }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "../assets/js/bus.js";
export default {
  name: "poppage",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    cityname: {
      type: String,
      default: "",
    },
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
       Bus.$emit('sendCityname','1234');
    },

    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;
}
.modal-container {
  background: url("../assets/img/buttonbg.png");
  background-size: 100% 100%;
  // border-radius: 3%;
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  background: transparent;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  .text {
    position: absolute inherit;
    text-align: center;
  }
  .close-btn {
    position: absolute;
    margin-right: -90% !important;
  }
}
// .modal-footer {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 57px;
//   border-top: 1px solid #ddd;
// }
// .modal-footer button {
//   width: 100px;
// }
.modal-main {
  height: 50%;
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
}
</style>