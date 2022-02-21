<template>
  <div class="login">
    <div class="video-container">
        <div class="filter">
          <div class="header">
            <h1>景点智能分析与推荐系统</h1>
          </div>
          <div class="login_style">
            <h2>用户登录</h2>
            <el-form
              ref="loginFrom"
              :model="loginFrom"
              class="login-from"
              auto-complete="on"
            >
              <el-form-item>
                <img src="../assets/login/user.png" />
                <el-input
                  class="username"
                  placeholder="请输入用户账号"
                  v-model="loginFrom.username"
                  type="text"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item>
                <img src="../assets/login/password.png" />
                <el-input
                  placeholder="请输入用户密码"
                  class="password"
                  v-model="loginFrom.password"
                  show-password
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox class="check">记住密码</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  id="btn"
                  class="button"
                  type="primary"
                  round
                  @click="handleLogin"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
      </div>
      <video autoplay loop class="fillWidth" >
        <source src="../assets/video/video.mp4" type="video/mp4" />
      </video>
      <!-- ../assets/video/video.mp4
       <video class="fullscreenvideo" src="static/mp4/fm.mp4"  autoplay ></video> -->
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
        vedioCanPlay: false,
      },
    };
  },
  mounted() {
    //登录绑定事件
    window.addEventListener("keydown", this.keyDown);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        document.getElementById("btn").click();
      }
    },
    handleLogin() {
      request.post("/api/user/queryuser", this.loginFrom).then((res) => {
        console.log(res.code);
        if (res.code == "0") {
          this.$router.push({ name: "recommend" });
        } else {
          this.$message({
            type: "error",
            message: res.description,
          });
        }
      });
      // request.get("/api/data/querySalary", this.loginFrom).then((res) => {
      //   console.log(res.data);
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  .video-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .fillWidth{
      width: 100%;
    }
    .filter {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 100;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 15%;
        width: 100%;
        padding-bottom: 15px;
        h1 {
          font-size: 45pt;
          color: #ffffff;
          font-family: Microsoft YaHei;
          font-weight: bold;
          margin-left: 10px;
        }
      }
      .login_style {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 28%;
        height: 45%;
        background-color: rgba(75, 105, 135, 0.3);
        h2 {
          font-size: 18pt;
          color: #ffffff;
          font-family: Microsoft YaHei;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        img {
          height: 20px;
          margin-top: 10px;
        }
        .username {
          border-bottom: 1px solid #b8b6b6;
          width: 250px;
        }
        .password {
          border-bottom: 1px solid #b8b6b6;
          width: 250px;
        }
        .check {
          color: #ffffff;
        }
        .button {
          width: 250px;
          margin-left: 15px;
          .span {
            font-family: "黑体";
            font: bold;
          }
        }
      }
    }
  }
}
</style>
