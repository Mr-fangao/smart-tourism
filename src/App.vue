<template>
  <div id="app">
    <div class="header" v-if="$route.meta.keepAlive">
      <pageheader></pageheader>
    </div>
    <router-view />
  </div>
</template>

<script>
import pageheader from "../src/components/header.vue";
export default {
  name: "App",
  components: {
    pageheader,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
