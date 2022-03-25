<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
          <span class="text">个人面板</span>
              <div class="close-btn" @click="hideModal"><i class="fa fa-times" aria-hidden="true" style="color:red;"></i></div>
      </div>
      <div class="modal-main">
        <div class="ptChart">
          {{ porpID }}
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button @click="hideModal">取消</button>
        <button @click="submit">确认</button>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "poppage",
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
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },

    submit() {
      this.$emit("submit");
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  background: #fff;
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
  background: #ffffff;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
   cursor: pointer;
  .text{
      position:absolute inherit;
      text-align: center;
  }
  .close-btn{
      position: absolute;
      margin-right: -90% !important
  }
}
.modal-main {
  height: 50%;
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
}
</style>