<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">个人面板</span>
        <div class="close-btn" @click="hideModal">
          <!-- <i class="fa fa-times" aria-hidden="true" style="color: red"></i> -->
        </div>
      </div>
      <div class="modal-main">
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <span class="text">
                用户名称:</span></div></el-col
          >
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <!-- <div class="ptChart">
          {{ porpID }}
        </div> -->
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
  data() {
    return {
      user: {
        username: "",
        userage: "",
        uHistroy:"",

      },
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
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.modal-container {
  background: url("../assets/img/popbk.png");
  background-size: 100% 100%;
  border-radius: 3%;
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 9%;
  margin-top: 2%;
  background: url("../assets/img/poptitle.png");
  color: rgb(250, 250, 250);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .text {
    position: absolute inherit;
    text-align: center;
    font-size: 16pt;
  }
  .close-btn {
    background: url("../assets/img/close.png");
    background-size: 100% 100%;
    height: 4%;
    width: 2%;
    position: absolute;
    margin-right: -86% !important;
  }
}
.modal-main {
  height: 87%;
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
}
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-1-1 {
  background: #d3dce6;
  float: left;
}
.grid-content {
  border-radius: 0px;
  min-height: 36px;
  display: flex;
  justify-content: center;

}
.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}
.text{
  width: 100%;
  height: 100%;
}
</style>
