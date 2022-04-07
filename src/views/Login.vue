<template>
  <div class="login">
    <div class="video-container">
      <div class="filter">
        <div class="header">
          <h1>旅游景点推荐与智能分析系统</h1>
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
      <video autoplay muted loop class="fillWidth">
        <source src="../assets/video/video.mp4" type="video/mp4" />
      </video>
      <!-- ../assets/video/video.mp4
       <video class="fullscreenvideo" src="static/mp4/fm.mp4"  autoplay ></video> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFrom: {
        username: "admin",
        password: "123",
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
      // request.post("/api/user/queryuser", this.loginFrom).then((res) => {
      //   console.log(res.code);
      //   if (res.code == "0") {
      this.$router.push({ name: "recommend" });
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: res.description,
      //   });
      // }
      // });
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
    .fillWidth {
      width: 100%;
      margin-top: -6%;
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
          font-size: 35pt;
          color: #ffffff;
          font-family: PingFang SC;
          // font-weight: bold;
          margin-left: 10px;

          text-align: center;
          /* 背景颜色线性渐变 */
          /* 老式写法 */
          /* linear为线性渐变，也可以用下面的那种写法。left top，right top指的是渐变方向，左上到右上 */
          /* color-stop函数，第一个表示渐变的位置，0为起点，0.5为中点，1为结束点；第二个表示该点的颜色。所以本次渐变为两边灰色，中间渐白色 */
          /* 新式写法 */
          /* background: -webkit-linear-gradient(left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d)); */

          /* 设置为text，意思是把文本内容之外的背景给裁剪掉 */
          background: -webkit-gradient(
            linear,
            left top,
            right top,
            color-stop(0, #39fcff),
            color-stop(0.4, #39fcff),
            color-stop(0.5, white),
            color-stop(0.6, #39fcff),
            color-stop(1, #39fcff)
          );
          -webkit-background-clip: text;
          /* 设置对象中的文字填充颜色 这里设置为透明 */
          -webkit-text-fill-color: transparent;
          /* 每隔2秒调用下面的CSS3动画 infinite属性为循环执行animate */
          -webkit-animation: animate 1.5s infinite;
        }
      }
      .login_style {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 28%;
        height: 45%;
        background: url("../assets/img/buttonbg.png") no-repeat;
        background-size: 100% 100%;
        h2 {
          font-size: 18pt;
          color: #ffffff;
          font-family: Microsoft YaHei;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 20px;
          // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
        img {
          height: 24px;
          margin-bottom: -3%;
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
@-webkit-keyframes animate {
  /* 背景从-100px的水平位置，移动到+100px的水平位置。如果要移动Y轴的，设置第二个数值 */
  from {
    background-position: -500px;
  }
  to {
    background-position: 500px;
  }
}
@keyframes animate {
  from {
    background-position: -200px;
  }
  to {
    background-position: 200px;
  }
}
.el-button--primary {
  color: #fff;
  font-weight: bold;
  background-color: #79e4e6;
  border-color: #79e4e6;
}
</style>
