<template>
  <div class="com-kdxfx">
    <div id="map">
      <div class="page">
        <div class="top">
            <el-button>上左</el-button>
            <el-button>上边</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "kdxfx",
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 4,
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-kdxfx {
  #map {
    position: absolute;
    width: 100%;
    height: 100%;

    .page {
      position: absolute; /*这里一定要设置*/
      z-index: 999999; /*这里是该元素与显示屏的距离，据说越大越好，因为没有它也是可以的*/
      float: right inherit;
      width: 80px;
      float: right;
      
        margin-right: 1px;
      .item {
        margin: 4px;
      }
      .top {
        text-align: center;
        margin-right: 1px;
      }

    }
  }

  //background: rgb(29, 31, 163);
}
</style>
