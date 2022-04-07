<template>
  <div id="selectRegion">
    <!-- 城市 -->
    <div class="city">
      <ul class="current">
        <li>
          <span @click="shrink()"><i :class="ioc" /></span>
          <span id="wen" @click="cityChoice()">{{ json.name }}</span>
        </li>
        <!-- <li>
          <icon-svg icon-class="icon-chengshi" class="img" />
        </li> -->
      </ul>
    </div>
    <!-- 弹出框 -->
    <div class="eject">
      <div class="nei">
        <p>城市选择<i class="el-icon-close" @click="clear()" /></p>
        <!-- 省 -->
        <div class="choice">
          <ul>
            <li
              v-for="(value, index) in sheng"
              :key="index"
              class="sheng"
              @click="shengC($event, value)"
            >
              {{ value }}
            </li>
          </ul>
        </div>
        <!-- 市 -->
        <div class="choice">
          <ul>
            <li
              v-for="(value, index) in shi"
              :key="index"
              class="shi"
              @click="shiC($event, value)"
            >
              {{ value }}
            </li>
          </ul>
        </div>
        <!-- 县 -->
        <div class="choice">
          <ul>
            <li
              v-for="(value, index) in xian"
              :key="index"
              class="xian"
              @click="xianC($event, value)"
            >
              {{ value }}
            </li>
          </ul>
        </div>
        <!-- 底 -->
        <div class="choice" @click="confirm()">
          <div id="Scs">
            <span>当前选择：{{ json.name }}</span>
            <div class="state">
              <i
                class="el-icon-circle-check"
                style="
                  position: absolute;
                  top: 52%;
                  transform: translateY(-50%);
                  left: 5px;
                "
              /><span> 确认</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eventBum from "../public/js/EvebtBus";
import city from "../public/js/city.json";

export default {
  name: "SelectRegion",
  data() {
    return {
      json: {
        // name: "中国",
        name: "安徽",
        where: 0,
      },
      ioc: "el-icon-arrow-left",
      city: city,
      sheng: [],
      shi: [],
      xian: [],
      guo: {},
    };
  },
  mounted() {
    var that = this;
    var name = [];
    for (let i = 0; i < that.city.length; i++) {
      name.push(that.city[i].name);
    }
    that.sheng = name;
  },
  methods: {
    // 收缩
    shrink() {
      if (this.ioc === "el-icon-arrow-left") {
        document.getElementsByClassName("city")[0].style.width = "250px";
        document.getElementById("wen").style.animation = "fade-in 1.5s";
        document.getElementById("wen").style.animationDuration = "1.5s";
        this.ioc = "el-icon-arrow-right";
      } else {
        document.getElementsByClassName("city")[0].style.width = "180px";
        document.getElementById("wen").style.animation = "fade-in 1.5s";
        document.getElementById("wen").style.animationDuration = "1.5s";
        this.ioc = "el-icon-arrow-left";
      }
    },
    // 出现
    cityChoice() {
      const eject = document.getElementsByClassName("eject")[0];
      document.getElementById("Scs").style.opacity = "0";
      eject.style.display = "block";
      eject.style.animation = "appear 1.2s";
      eject.style.animationDuration = "1.2s";
      eject.style.webkitAnimation = "appear 1.2s";
      const nei = document.getElementsByClassName("nei")[0];
      setTimeout(function () {
        document.getElementById("Scs").style.opacity = "1";
      }, 1200);
      nei.style.opacity = 1;
    },
    // 省点击
    shengC(even, value) {
      var that = this;
      var sheng = document.querySelectorAll(".sheng");
      for (let i = 0; i < sheng.length; i++) {
        sheng[i].classList.remove("xuan");
      }
      even.target.className = even.target.className + " " + "xuan";
      that.json.name = value;
      that.json.where = 1;
      // 查询出市列表
      that.shi = [];
      that.guo = city[that.sheng.indexOf(value)];
      for (let i = 0; i < that.guo.sub.length; i++) {
        that.shi.push(that.guo.sub[i].name);
      }
      // 清空
      var shi = document.querySelectorAll(".shi");
      for (let i = 0; i < shi.length; i++) {
        shi[i].classList.remove("xuan");
      }
      that.xian = [];
    },
    // 市点击
    shiC(even, value) {
      var that = this;
      var shi = document.querySelectorAll(".shi");
      for (let i = 0; i < shi.length; i++) {
        shi[i].classList.remove("xuan");
      }
      even.target.className = even.target.className + " " + "xuan";
      that.json.name = value;
      that.json.where = 2;
      // 查询出县列表
      that.xian = [];
      if (that.guo.sub[that.shi.indexOf(value)].sub !== undefined) {
        for (
          let i = 0;
          i < that.guo.sub[that.shi.indexOf(value)].sub.length;
          i++
        ) {
          that.xian.push(that.guo.sub[that.shi.indexOf(value)].sub[i].name);
        }
      }
      // 清空
      var xian = document.querySelectorAll(".xian");
      for (let i = 0; i < xian.length; i++) {
        xian[i].classList.remove("xuan");
      }
    },
    // 县点击
    xianC(even, value) {
      var that = this;
      var xian = document.querySelectorAll(".xian");
      for (let i = 0; i < xian.length; i++) {
        xian[i].classList.remove("xuan");
      }
      even.target.className = even.target.className + " " + "xuan";
      that.json.name = value;
      that.json.where = 3;
    },
    // 关闭按钮
    clear() {
      var that = this;
      const eject = document.getElementsByClassName("eject")[0];
      eject.style.animation = "nappear 1s";
      eject.style.animationDuration = "1s";
      eject.style.webkitAnimation = "nappear 1s";
      setTimeout(function () {
        eject.style.display = "none";
      }, 950);
      const nei = document.getElementsByClassName("nei")[0];
      nei.style.opacity = 0;
      var sheng = document.querySelectorAll(".sheng");
      for (let i = 0; i < sheng.length; i++) {
        sheng[i].classList.remove("xuan");
      }
      var shi = document.querySelectorAll(".shi");
      for (let i = 0; i < shi.length; i++) {
        shi[i].classList.remove("xuan");
      }
      var xian = document.querySelectorAll(".xian");
      for (let i = 0; i < xian.length; i++) {
        xian[i].classList.remove("xuan");
      }
      that.shi = [];
      that.xian = [];
      that.guo = [];
    },
    // 确认按钮
    confirm() {
      if (this.json.name === "") {
        this.$message({
          message: "请选择城市！",
          type: "warning",
          showClose: true,
        });
      } else {
        eventBum.$emit("json", this.json);
        this.clear();
      }
    },
  },
};
</script>
<style>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes appear {
  /* 出现动画 */
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 1000px;
    height: 5px;
    background-color: #fff;
  }
  100% {
    width: 1000px;
    height: 655px;
    background-color: rgb(22 100 125 / 61%);
  }
}
@keyframes nappear {
  /* 隐藏动画 */
  0% {
    width: 1000px;
    height: 655px;
    background-color: rgb(22 100 125 / 61%);
  }
  50% {
    width: 1000px;
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
/* 城市 */
#selectRegion ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
#selectRegion .city {
  position: absolute;
  width: 180px;
  height: 45px;
  line-height: 45px;
  top: 5px;
  right: 385px;
  border: 1px solid rgba(25, 186, 139, 0.2);
  background-color: rgb(22 100 125 / 61%);
  color: #fff;
  font-family: KuHei;
  font-size: 14px;
  text-align: center;
  transition: all 1.2s;
  z-index: 10;
}
#selectRegion .city .current li {
  position: absolute;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
#selectRegion .city #wen {
  position: absolute;
  width: calc(100% - 25px);
  height: 100%;
  right: 0;
  cursor: pointer;
}
li:nth-child(1) {
  width: calc(100% - 35px);
  left: 0;
  text-overflow: clip;
  letter-spacing: 1px;
  /* border-right: 2px solid rgb(148, 150, 153); */
  /* padding-left: 20px; */
}
#selectRegion .city .current li:nth-child(1) span:nth-child(1) {
  position: absolute;
  cursor: pointer;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(168, 168, 168, 0.8);
}
#selectRegion .city .current li:nth-child(1) span:nth-child(1):hover {
  color: rgba(255, 255, 255, 0.8);
}
#selectRegion .city .current li:nth-child(2) {
  width: 33px;
  right: 0;
  cursor: pointer;
  font-size: 20px;
  margin-top: -1px;
}
/* 城市弹出 */
#selectRegion .eject {
  display: none;
  position: absolute;
  width: 1000px;
  height: 622px;
  border: 1px solid rgba(25, 186, 139, 0.2);
  background-color: rgb(22 100 125 / 61%);
  left: 50%;
  top: 43%;
  transform: translate(-50%, -50%);
  z-index: 100;
  text-align: center;
  color: #fff;
  font-family: KuHei;
  font-size: 14px;
  transition: all 1.5s;
  overflow: hidden;
}
#selectRegion .eject p {
  padding: 0;
  margin: 0;
  border-bottom: 2px solid rgb(148, 150, 153);
  letter-spacing: 1px;
  height: 40px;
  line-height: 40px;
  position: relative;
}
#selectRegion .eject p i {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
}
#selectRegion .xuan {
  background-color: rgb(0, 206, 209, 0.7);
}
#selectRegion .eject .choice {
  position: absolute;
  width: 100%;
}
#selectRegion .eject .choice:nth-child(2) {
  height: 205px;
  top: 40px;
  border-bottom: 1px solid rgb(148, 150, 153);
}
#selectRegion .eject .choice:nth-child(3) {
  height: 175px;
  top: 245px;
  border-bottom: 1px solid rgb(148, 150, 153);
}
#selectRegion .eject .choice:nth-child(4) {
  height: 165px;
  top: 420px;
  border-bottom: 1px solid rgb(148, 150, 153);
}
#selectRegion .eject .choice:nth-child(5) {
  height: 70px;
  line-height: 70px;
  bottom: 0;
  font-size: 20px;
}
.state1 {
  display: none;
}
#selectRegion .eject .choice:nth-child(5) .state {
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: rgb(255 255 255);
  -webkit-transition: all 1s;
  transition: all 1s;
  width: 100px;
}
#selectRegion .eject .choice:nth-child(5) .state:hover {
  color: rgb(212, 212, 212);
}
#selectRegion .eject .choice ul {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
#selectRegion .eject .choice li {
  /* border: 1px solid red; */
  width: 100px;
  height: 35px;
  line-height: 35px;
  margin: 5px 5px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  transition: all 1s;
  border-radius: 3px;
  padding: 0 10px;
  overflow: hidden;
}
#selectRegion .eject .choice li:hover {
  background-color: rgb(0, 206, 209, 0.7);
}
</style>
