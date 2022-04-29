<template>
  <div class="home">
    <iframe class="flowto" :src="iframeSrc" ref="iframe"></iframe>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "home",
  data() {
    return {
      // iframeSrc: "http://124.221.111.73:8081/",
      iframeSrc: "http://localhost:8200",
      iframeWin: "",
    };
  },
  mounted() {
    this.iframeWin = this.$refs.iframe.contentWindow;
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.home {
  position: relative;
  height: calc(100% - 50px);
  width: 100%;
  overflow: hidden;
  .flowto {
    border: 0;
    height: 100%;
    width: 100%;
  }
}
</style>