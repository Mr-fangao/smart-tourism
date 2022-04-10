import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mapdata from './modules/mapdata' // 专题地图全局

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mapdata
  },
  getters
})

export default store