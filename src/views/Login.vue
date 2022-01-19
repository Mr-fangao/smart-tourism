<template>
  <div class="login">
    <div class="header">
      
      <h1>就业推荐与智能分析系统</h1>
    </div>
    <div class="main">
      <div class="login_style">
        <h2>用户平台登录</h2>
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
            <el-checkbox class="check">记住登录密码</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button id="btn" class="button" type="primary" round @click="handleLogin"
              >立即登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
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
      },
};
</script>

<style lang="less"scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: url(../assets/login/login_background.jpg);
  background-size: 100% 100%;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 10%;
    width: 100%;
   
    h1 {
      font-size: 24px;
      color: #ffffff;
      font-family: Microsoft YaHei;
      font-weight: bold;
      margin-left: 20px;
    }
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    margin: 150px 0px;
    .login_style {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 40%;
      height: 70%;
      .login-from {
        display: flex;
        flex-direction: column;
      }
      h2 {
        font-size: 20px;
        color: #ffffff;
        font-family: Microsoft YaHei;
        font-weight: bold;
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
        margin-left: 5px;
      }
      .button {
        width: 250px;
        margin-left: 15px;
      }
    }
  }
}
</style>
