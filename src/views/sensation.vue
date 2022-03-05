<template>
  <div id="sensation">
    <div class="sensation-aside">
      <el-menu>
        <el-menu-item
          index="1"
          @click="show(1)"
          :class="index === 1 ? 'active' : ''"
          plain
        >
          <i class="fa fa-tree fa-lg"></i>
          <span class="tab">景点</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="show(2)"
          :class="index === 2 ? 'active' : ''"
          plain
        >
          <i class="fa fa-building fa-lg"></i>
          <span class="tab">城市</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="sensation-content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import city from "../components/sensations/city.vue";
import feelmonitor from "../components/feeling/feelmonitor.vue";
export default {
  components: { city, feelmonitor },
  name: "feelings",
  data() {
    return {
      index: 1,
      comp: "city",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "city";
      else if (value === 2) this.comp = "feelmonitor";
      // else if (value === 3) this.comp = "heatmap";
    },
  },
};
</script>

<style lang="less">
#sensation {
  position: fixed;
  width: 100%;
  height: 100%;
}
.sensation-aside {
  height: 100%;
  z-index: 999999;
  position: absolute;
  width: 3%;
  top: 0;
  right: 0;
  background-color: rgba(2, 25, 31, 0.8);
  .el-menu {
    top: 30%;
    width: 100%;
    height: 10%;
    right: 0%;
    background: transparent;
    border: none;
    .tab {
      height: 38%;
      line-height: 40px;
    }
  }
  .el-menu-item.is-active {
    color: #15abc5;
    background: transparent;
  }
  .el-menu-item {
    color: #fff;
  }
  .el-menu-item:hover {
    background: transparent;
  }
  .span {
    color: aliceblue;
  }
  ul {
    height: 100%;
    list-style-type: none; /*消除黑点*/
    text-align: center;
    li {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        color: aqua;
        font-size: 12px;
        font-family: Microsoft YaHei;
        // font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        padding-bottom: 20px;
      }
    }
  }
}
.sensation-content {
  position: absolute;
  top: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
}
</style>
