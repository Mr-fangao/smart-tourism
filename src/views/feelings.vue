<template>
  <div id="feelings">
    <div class="aside">
      <ul>
        <li>
          <div @click="show(1)" :class="index === 1 ? 'active' : ''" plain>
            <img src="../assets/img/feelings/jc.png" />
          </div>
          <p>监测</p>
          <div
            class="change sidebutton"
            @click="show(2)"
            :class="index === 2 ? 'active' : ''"
            plain
          >
            <img src="../assets/img/feelings/qg.png" />
          </div>
          <p>情感</p>
        </li>
      </ul>
    </div>
    <div class="content">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import feelanalysis from "../components/feeling/feelanalysis.vue";
import feelmonitor from "../components/feeling/feelmonitor.vue";
export default {
  components: { feelanalysis, feelmonitor },
  name: "theme",
  data() {
    return {
      index: 1,
      comp: "feelmonitor",
      isShow: true,
    };
  },
  methods: {
    show(value) {
      if (value === 1) this.comp = "feelanalysis";
      else if (value === 2) this.comp = "feelmonitor";
      // else if (value === 3) this.comp = "heatmap";
    },
  },
};
</script>

<style lang="less">
#feelings {
  position: fixed;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  top: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
}
.aside {
  height: 100%;
  z-index: 999999999999999;
  position: absolute;
  width: 3%;
  top: 0;
  right: 0;
  background-color: rgba(2, 25, 31, 0.8);
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
      img {
        height: 32px;
      }
      p {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        text-decoration: none; /*消除下划线*/
        border-radius: 5px;
        padding-bottom: 20px;
      }
      .change :active{
      border-right:2px dashed #F00
    }
    }
  }
}
</style>
