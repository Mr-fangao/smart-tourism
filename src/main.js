// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/global.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';

// import 'cesium/Source/Widgets/widgets.css'
// import Cesium from '../node_modules/cesium/Build/Cesium'
// import Cesium from 'cesium/Source/Cesium'
// Vue.prototype.Cesium = Cesium


import 'jquery'
// 引入echarts
import * as echarts from 'echarts';
import 'echarts-gl'
Vue.prototype.$echarts = echarts

import mapBoxGl from 'mapbox-gl'
Vue.prototype.$mapboxgl = mapBoxGl

Vue.config.productionTip = false
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
