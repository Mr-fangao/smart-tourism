<template>
  <div class="backcolor">
    <div class="times" @click="quit()">
      <i class="fa fa-sign-out fa-rotate-180 fa-lg" @click="quit()"></i>
      <span id="date">{{ date }}</span>
    </div>
    <nav>
      <ul>
        <li id="u1">
          <router-link to="/recommend" exact>智能推荐</router-link>
          <router-link to="/query" exact>景点查询</router-link>
          <router-link to="/ArcMap" exact>时空分析</router-link>
          <!-- <router-link to="/thememap" exact>专题地图</router-link> -->
          <!-- <router-link to="/sensation" exact>形象感知</router-link> -->
        </li>
      </ul>
      <h1>旅游景点推荐与智能分析系统</h1>
      <ul>
        <li id="u2">
          <router-link to="/odAnalysis" exact>客流分析</router-link>
          <router-link to="/sensation" exact>形象感知</router-link>
          <router-link to="/feelings" exact>情感分析</router-link>
        </li>
      </ul>
    </nav>
    <div class="user">
      <div class="userpng"></div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          个人中心<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="background: #62b6cf; border: #a5e5f6"
        >
          <el-dropdown-item @click.native="showPop('1111111111')"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item @click.native="routerjump()"
            >返回首页</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <poppage
      :show="show"
      :porpID="porpID"
      @hideModal="hideModal"
      @submit="submit"
    >
    </poppage>
  </div>
</template>

<script>
import poppage from "../components/poppageForUser.vue";
export default {
  name: "pageheader",
  components: {
    poppage,
  },
  data() {
    return {
      time: "",
      date: "",
      index: 1,
      show: false,
      porpID: "",
    };
  },
  mounted() {
    this.getTime();
  },
  methods: {
    currentTime() {
      setInterval(this.getTime, 500);
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.date = `${year}/${month}/${day}`;
      // this.time = ` ${hour}:${minute}:${second} ${weekArr[week]}`;
    },
    hideModal() {
      // 取消弹窗回调
      this.show = false;
    },
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    showPop(val) {
      this.porpID = val;
      this.show = true;
    },
    routerjump(index) {
      if (index != null) this.$router.push({ name: "Login" });
    },
    quit() {
      this.$router.push({ name: "Login" });
    },
  },
  beforeDestroy() {
  },
};
</script>

<style scoped lang="less">
.backcolor {
  background: url(../assets/img/BG.png);
  background-size: 78% 140%;
  background-position-x: 50%;
  display: flex;
  align-items: center;
  #date {
    color: #ffffff;
    font-size: 14px;
    padding-left: 12%;
    color: #d4d9dd;
  }
  background-color: #02191f;
  .times {
    width: 7%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14pt;
    margin-left: 1%;
    margin-top: 4%;
    color: #b8c1c8a1;
    margin-top: 7px;
  }
  .times:hover {
    color: #2fa9ce;
  }
  nav {
    height: 50px;
    width: 84%;
    padding: 0px;
    display: flex;
    align-items: center;
    h1 {
      width: 32%;
      font-size: 25px;
      color: #39fcff;
      font-family: Microsoft YaHei;
    }
    ul {
      height: 100%;
      width: 34%;
      list-style-type: none; /*消除黑点*/
      text-align: center;
      li {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        // justify-content: space-evenly;
        align-items: center;
        a {
          font-size: 16px;
          width: 34%;
          color: #528c8c; /*设置字体颜色*/
          font-family: Microsoft YaHei;
          font-weight: bold;
          text-decoration: none; /*消除下划线*/
          border-radius: 0px;
          margin: 0px 0px -10px 0px;
          line-height: 30px;
          background: url(../assets/img/button.png) no-repeat;
          background-size: 100% 90%;
          background-position: 100% 100%;
        }
      }
    }
  }
  /*选中则发生一些变化*/
  .router-link-active {
    color: #e0fbff;
    background: url(../assets/img/buttonative.png) no-repeat;
    margin: 0px 0px -12px 0px;
    line-height: 30px;
    background-size: 105% 160%;
    background-position: -85% 0%;
  }
  .user {
    height: 50px;
    width: 8%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    .userpng {
      height: 100%;
      width: 30%;
      background: url(../assets/img/userBG.png) no-repeat;
      background-size: 60% 43%;
      background-position: 68% 62%;
    }
  }
}

#u1 {
  // margin-left: 4%;
}
#u2 {
  a {
    background: url(../assets/img/rightbutton.png) no-repeat;
    background-size: 100% 90%;
    background-position: 100% 100%;
  }
  .router-link-active {
    background: url(../assets/img/rightbuttonative.png) no-repeat;
    margin: 0px 0px -12px 0px;
    line-height: 30px;
    background-size: 113% 157%;
    background-position: 114% 0%;
  }
}
/deep/.el-dropdown {
  display: inline-block;
  position: relative;
  color: #a5e5f6;
  font-size: 14px;
  line-height: 57px;
  height: 100%;
}
/deep/.el-dropdown-menu {
  background: #62b6cf;
  border: #a5e5f6;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #2fa9ce;
  color: #ffffffd5;
}
</style>
