<template>
  <div class="login">
    <div class="main">
    <div class="header">
      <img src="../assets/img/logo.png" />
      <h1>行游天下·景点智能分析与推荐系统</h1>
    </div>
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
            <el-button id="btn" class="button" type="primary" round
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

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: url(../assets/login/login_background.jpg);
  background-size: 100% 100%;
  
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 120px 0px;
    .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
    padding-bottom: 15px;
    img {
        height: 40px;
        padding-left: 10px;
      }
    h1 {
      font-size: 40px;
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
      width: 32%;
      height: 70%;
      background-color: rgba(79, 106, 135, 0.5);
      h2 {
        font-size: 20px;
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
