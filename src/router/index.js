import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import notFound from '../components/notFound.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: false //导航栏在该页面不显示
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import("@/views/recommend"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import("@/views/monitor"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/query',
    name: 'query',
    component: () => import("@/views/query"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/skAnalysis',
    name: 'skAnalysis',
    component: () => import("@/views/skAnalysis"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/feelings',
    name: 'feelings',
    component: () => import("@/views/feelings"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/thememap',
    name: 'thememap',
    component: () => import("@/views/theme"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "*", // 此处需特别注意置于最底部
    component: notFound
  },
  ]
})
