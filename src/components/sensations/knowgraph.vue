<template>
  <div id="com-features">
    <!-- <selectRegion :defaultplace="'南京'" :right="3.5" /> -->
    <div id="map" />
  </div>
</template>
<script>
import pbutton from "../button.vue";
import eventBum from "../cityselect/EvebtBus";
import SelectRegion from "../cityselect/newselectRegion.vue";
import word3D from "../wordcloud3D.vue";
import nanjing from "../../assets/json/nanjingpoint.json";
import njprovince from "../../assets/json/njprovince.json";
import echarts from "echarts";
import request from "../../utils/request";

export default {
  name: "city",
  //  props: {
  //   faetureslist: {
  //     type: String,
  //   },
  // },
  components: {
    SelectRegion,
    pbutton,
    word3D,
    eventBum,
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {

  },

  methods: {

  },
  watch: {

  },
};
</script>

<style scoped lang="less">
#com-features {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}

</style>