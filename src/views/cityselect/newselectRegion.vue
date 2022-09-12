<template>
  <div id="selectRegion">
    <!-- 城市 -->
    <div class="city" :style="{ right: `${this.right}px` }">
      <ul>
        <li @click="stretch()"><i :class="ioc" /></li>
        <li @click="tan()">
          <span>{{ json.name }}</span>
        </li>
        <li><icon name="loc" :w="25" :h="25"></icon></li>
      </ul>
    </div>
    <!-- 弹出框 -->
    <div id="choice" class="choice">
      <!-- 头部 -->
      <div class="top" @mousedown.prevent="m1($event)">
        <span>城市选择</span>
        <span @click="close()"><i class="el-icon-close" /></span>
      </div>
      <!-- 身体 -->
      <div class="bottom">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="历史" name="fourth">
            <ul>
              <li
                v-for="(value, item) in citys"
                :key="item"
                class="publiz"
                @click="xuan(value)"
              >
                {{ value.name }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="省份" name="first">
            <ul>
              <li
                v-for="(value, item) in sheng"
                :key="item"
                class="publiz"
                @click="shengD(value)"
              >
                {{ value.name }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="城市" name="second">
            <div v-if="shiji.length === 0" class="nothing">暂无数据</div>
            <ul v-if="shiji.length !== 0">
              <li
                v-for="(value, item) in shiji"
                :key="item"
                class="publiz"
                @click="shijiD(value)"
              >
                {{ value.name }}
              </li>
            </ul>
          </el-tab-pane>
          <!-- <el-tab-pane label="县区" name="third">
            <div v-if="xians.length === 0" class="nothing">暂无数据</div>
            <ul v-if="xians.length !== 0">
              <li
                v-for="(value, item) in xians"
                :key="item"
                class="publiz"
                @click="xiansD(value)"
              >
                {{ value.name }}
              </li>
            </ul>
          </el-tab-pane> -->
        </el-tabs>
      </div>
      <!-- 尾部 -->
      <div class="center">
        <div class="left">
          <div v-if="shengZ === ''"><span>现已选择：</span>{{ json.name }}</div>
          <div v-if="shengZ !== ''">
            <span>现已选择：{{ shengZ }}</span>
            <span v-if="shijiZ !== ''"> - {{ shijiZ }}</span>
            <span v-if="xiansZ !== ''"> - {{ xiansZ }}</span>
          </div>
        </div>
        <div class="right" @click="Submit()">
          <span><i class="el-icon-circle-check" /> 确认</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eventBum from "./EvebtBus";
import city from "./city.json";
export default {
  name: "SelectRegion",
  props: {
    right: {
      type: Number,
      default: 370,
    },
  },
  data() {
    return {
      json: {
        name: "安徽",
        where: 1,
        code: "",
      },
      province: [],
      citys: [
        {
          name: "北京市",
          where: 2,
          code: "",
        },
        {
          name: "南京市",
          where: 2,
          code: "",
        },
        {
          name: "上海市",
          where: 2,
          code: "",
        },
        {
          name: "天津市",
          where: 2,
          code: "",
        },
      ], // 常用记录
      sheng: [], // 省
      shiji: [], // 市
      xians: [], // 县
      shengZ: "",
      shijiZ: "",
      xiansZ: "",
      ioc: "el-icon-arrow-left",
      s: 0,
      activeName: "fourth",
      // 移动
      canMove: false,
    };
  },
  computed: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    if (this.$route.path == "/sensation") {
      this.json.name = "北京市";
    }
    var that = this;
    for (let i = 0; i < city.length; i++) {
      var gong = {};
      gong.name = city[i].name; // 地名
      gong.where = 1; // 层级
      gong.code = city[i].code; // 编号
      that.sheng.push(gong);
    }
    // 样式
    setTimeout(function () {
      that.Style();
    }, 200);
  },
  methods: {
    // 弹出弹出层
    tan() {
      document.getElementsByClassName("city")[0].style.opacity = 0;
      setTimeout(function () {
        document.getElementsByClassName("city")[0].style.zIndex = -10;
      }, 1000);
      document.getElementById("choice").style.zIndex = 1000;
      document.getElementById("choice").style.opacity = "1";
      document.getElementById("choice").style.animation = "appear 1s";
      document.getElementById("choice").style.animationDuration = "1s";
    },
    // 关闭
    close() {
      document.getElementsByClassName("city")[0].style.opacity = 1;
      document.getElementsByClassName("city")[0].style.zIndex = 10;
      document.getElementById("choice").style.animation = "nappear 1s";
      document.getElementById("choice").style.animationDuration = "1s";
      setTimeout(function () {
        document.getElementById("choice").style.opacity = "0";
        document.getElementById("choice").style.zIndex = -1000;
      }, 1000);
    },
    // 提交
    Submit() {
      if (this.json.name === "" || this.json.name === "中国") {
        this.$message({
          message: "请选择城市！",
          type: "warning",
          showClose: true,
        });
      } else {
        eventBum.$emit("json", this.json);
        console.log(this.json);
        this.close();
      }
    },
    // 历史记录
    xuan(e) {
      var that = this;
      this.shiji = []; // 清空市
      this.xians = []; // 清空县
      this.shengZ = ""; // 省
      this.shijiZ = ""; // 市
      this.xiansZ = ""; // 县
      // 样式
      setTimeout(function () {
        that.Style();
      }, 200);
      that.json.name = e.name;
      that.json.where = e.where;
      that.json.code = e.code;
    },
    // 省
    shengD(e) {
      var that = this;
      this.shiji = []; // 清空市
      this.xians = []; // 清空县
      this.shijiZ = ""; // 市
      this.xiansZ = ""; // 县
      // 找到省
      var s = 0;
      for (let i = 0; i < city.length; i++) {
        if (city[i].name === e.name) {
          s = i;
          break;
        }
      }
      // 给市赋值
      for (let i = 0; i < city[s].sub.length; i++) {
        var gong = {};
        gong.name = city[s].sub[i].name; // 地名
        gong.where = 2; // 层级
        gong.code = city[s].sub[i].code; // 编号
        that.shiji.push(gong);
      }
      that.shiji = that.shiji.sort(function (a, b) {
        return a.name.localeCompare(b.name, "zh");
      });
      that.json.name = e.name;
      that.json.where = e.where;
      that.json.code = e.code;
      that.shengZ = e.name;
      that.activeName = "second";
      // 样式
      setTimeout(function () {
        that.Style();
      }, 200);
    },
    // 市
    shijiD(e) {
      var that = this;
      this.xians = []; // 清空县
      this.xiansZ = ""; // 县
      // 找到省
      var s = 0;
      for (let i = 0; i < city.length; i++) {
        if (city[i].name === that.shengZ) {
          s = i;
          break;
        }
      }
      // 找到市
      var d = 0;
      for (let i = 0; i < city[s].sub.length; i++) {
        if (city[s].sub[i].name === e.name) {
          d = i;
          break;
        }
      }
      // 给县赋值
      for (let i = 0; i < city[s].sub[d].sub.length; i++) {
        var gong = {};
        gong.name = city[s].sub[d].sub[i].name; // 地名
        gong.where = 3; // 层级
        gong.code = city[s].sub[d].sub[i].code; // 编号
        that.xians.push(gong);
      }
      that.xians = that.xians.sort(function (a, b) {
        return a.name.localeCompare(b.name, "zh");
      });
      that.json.name = e.name;
      that.json.where = e.where;
      that.json.code = e.code;
      that.shijiZ = e.name;
      that.activeName = "third";
      // 样式
      setTimeout(function () {
        that.Style();
      }, 200);
    },
    // 县
    xiansD(e) {
      var that = this;
      that.json.name = e.name;
      that.json.where = e.where;
      that.json.code = e.code;
      that.xiansZ = e.name;
    },
    // 伸缩
    stretch() {
      if (this.s === 0) {
        this.s = 1;
        this.ioc = "el-icon-arrow-right";
        document.getElementsByClassName("city")[0].style.width = "225px";
      } else {
        this.s = 0;
        this.ioc = "el-icon-arrow-left";
        document.getElementsByClassName("city")[0].style.width = "180px";
      }
    },
    // 移动
    m1(event) {
      var that = this;
      const choice = document.getElementById("choice");
      const x = event.pageX - choice.offsetLeft;
      const y = event.pageY - choice.offsetTop;
      this.canMove = true;
      document.onmouseup = function () {
        that.canMove = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
      document.onmousemove = function (e) {
        if (that.canMove) {
          var left = e.clientX - x;
          var top = e.clientY - y;
          if (left < 400) left = choice.offsetWidth / 2;
          if (top < 280) top = choice.offsetHeight / 2;
          var maxLeft = window.innerWidth - choice.offsetWidth / 2;
          var maxTop = window.innerHeight / 2 + choice.offsetHeight;
          if (left > maxLeft) left = maxLeft;
          if (top > maxTop) top = maxTop;
          choice.style.left = left + "px";
          choice.style.top = top + "px";
        }
      };
    },
    // 样式
    Style() {
      var publizs = document.querySelectorAll(".publiz");
      for (let i = 0; i < publizs.length; i++) {
        publizs[i].addEventListener("click", function () {
          for (var j = 0; j < publizs.length; j++) {
            publizs[j].setAttribute("index", j);
            publizs[j].classList.remove("xuan");
          }
          this.className = this.className + " " + "xuan";
        });
      }
    },
  },
};
</script>
<style>
@keyframes appear {
  /* 出现动画 */
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 800px;
    height: 5px;
    background-color: #fff;
  }
  100% {
    width: 800px;
    height: 420px;
    background-color: rgb(21 62 109);
  }
}
@keyframes nappear {
  /* 隐藏动画 */
  0% {
    width: 800px;
    height: 420px;
    background-color: rgb(21 62 109);
  }
  50% {
    width: 800px;
    height: 5px;
    background-color: #fff;
  }
  100% {
    width: 0;
    height: 0;
  }
}
</style>
<style scoped>
/* @font-face {
  src: url("../public/font/KuHei.ttf");
  font-family: "KuHei";
} */
ul,
p {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.xuan {
  background-color: #1abbbb;
}
/* 城市 */
#selectRegion .city {
  display: inline-block;
  vertical-align: top;
  position: absolute;
  width: 180px;
  height: 45px;
  line-height: 45px;
  top: 1%;
  /* right: 370px !important; */
  /* background-color: rgba(40, 43, 57, 0.8); */
  /* background-color: rgba(18, 18, 18, 0.4); */
  /* border: 1px solid rgba(175, 233, 215, 0.4); */
  border: 1px solid rgba(25, 186, 139, 0.2);
  background-color: #0f5975d6;
  color: #fff;
  font-family: KuHei;
  font-size: 14px;
  text-align: center;
  transition: all 1s;
  z-index: 10;
  border-radius: 3px;
}
#selectRegion .city li:nth-child(1) {
  position: absolute;
  left: 0;
  top: -2px;
  width: 25px;
  font-size: 15px;
  border-right: 1px solid rgba(175, 233, 215, 0.4);
  cursor: pointer;
}
#selectRegion .city li:nth-child(2) {
  position: absolute;
  left: 25px;
  top: -2px;
  width: calc(100% - 60px);
  font-size: 15px;
  cursor: pointer;
}
#selectRegion .city li:nth-child(3) {
  position: absolute;
  right: 0;
  top: -2px;
  width: 35px;
  font-size: 18px;
  border-left: 1px solid rgba(175, 233, 215, 0.4);
}
/* 弹出层 */
#selectRegion #choice {
  opacity: 0;
  position: absolute;
  z-index: 1000000;
  /* border: 1px solid rgba(25, 186, 139, 0.2);
  background-color: rgba(40, 43, 57, 1); */
  border: 1px solid rgba(44, 165, 202, 0.589);
  background-color: #0d1f2ee3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 420px;
  border-radius: 3px;
  overflow: hidden;
}
/* 头部 */
#selectRegion #choice .top {
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-bottom: 1px solid rgb(148, 150, 153);
  color: #fff;
  font-family: KuHei;
  text-align: center;
  font-size: 17px;
  position: relative;
  cursor: move;
}
#selectRegion #choice .top span:nth-child(1) {
  letter-spacing: 5px;
}
#selectRegion #choice .top span:nth-child(2) {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
#selectRegion #choice .top >>> i {
  transform: 2s;
  font-size: 20px;
  transition: all 1.5s;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer !important;
}
#selectRegion #choice .top >>> i:hover {
  color: rgba(255, 255, 255, 1);
  transform: rotate(360deg);
}
/* 身体 */
#selectRegion #choice .bottom {
  width: 100%;
  height: 300px;
}
#selectRegion #choice .bottom >>> .el-tabs--border-card {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border: none;
  /* border-bottom: 1px solid rgb(148, 150, 153); */
  /* background-color: rgba(40, 43, 57, 1); */
  border: 1px solid rgba(44, 165, 202, 0.589);
  background-color: #0d1f2ee3;
}
/* 卡片头部 */
#selectRegion #choice .bottom >>> .el-tabs__nav {
  width: 100%;
  color: #fff;
  font-family: KuHei;
  letter-spacing: 4px;
  font-size: 18px;
}
#selectRegion #choice .bottom >>> .el-tabs--border-card > .el-tabs__header {
  border: none;
  background-color: #ff797900;
}
#selectRegion #choice .bottom >>> .el-tabs__item {
  margin: 0;
  padding: 0;
  border: none;
  border-bottom: 2px solid #fff;
  color: #fff;
}
#selectRegion
  #choice
  .bottom
  >>> .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  /* color: #ff7979; */
  /* background-color: rgba(40, 43, 57, 1); */
  background-color: #12546050;
  color: #0cf3f3;
  border: none;
  border-bottom: 2px solid #0cf3f3;
  font-weight: bold;
}
#selectRegion
  #choice
  .bottom
  >>> .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item
  + .el-tabs__item,
#selectRegion
  #choice
  .bottom
  >>> .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:first-child {
  width: calc(100% / 3 + 1.1px);
  height: 50px;
  line-height: 50px;
  text-align: center;
}
/* 卡片底部 */
#selectRegion #choice .bottom >>> .el-tabs--border-card > .el-tabs__content {
  padding: 0;
  width: 100%;
  height: 246px;
  color: #fff;
  font-family: KuHei;
  text-align: center;
}
#selectRegion
  #choice
  .bottom
  >>> .el-tabs__item:focus.is-active.is-focus:not(:active) {
  box-shadow: none !important;
}
#selectRegion #choice .bottom .nothing {
  width: 100%;
  height: 246px;
  line-height: 246px;
}
#selectRegion #choice .bottom ul {
  height: 246px;
  line-height: 246px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#selectRegion #choice .bottom li {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  height: 35px;
  line-height: 35px;
  margin: 5px 5px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  transition: all 1s;
  padding: 0 10px;
  overflow: hidden;
  letter-spacing: 2px;
  border-radius: 3px;
}
#selectRegion #choice .bottom li:hover {
  /* background-color: #ff7979; */
  background-color: #1abbbb;
}
/* 底部 */
#selectRegion #choice .center {
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-family: KuHei;
  padding: 0 5px;
  position: relative;
}
#selectRegion #choice .center .left {
  position: absolute;
  top: -3px;
  left: 0;
  width: 600px;
  text-align: center;
}
#selectRegion #choice .center .right {
  position: absolute;
  top: -3px;
  right: 0;
  width: 200px;
  text-align: center;
}
#selectRegion #choice .center .right span {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all 1s;
  cursor: pointer;
}
#selectRegion #choice .center .right span:hover {
  color: #fff;
}
#selectRegion #choice .center .right >>> i {
  font-size: 20px;
  margin-right: 10px;
  margin-top: 1px;
}
 [class^=el-icon-]{
       line-height: 3;
 }
</style>
