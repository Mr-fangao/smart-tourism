import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import recommend from '@/views/recommend'
import skAnalysis from '@/views/skAnalysis'
import thememap from '@/views/theme'
import feelings from '@/views/feelings'
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
      path: '/1',
      name: 'recommend',
      component: recommend,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/2',
      name: 'skAnalysis',
      component: skAnalysis,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/thememap',
      name: 'thememap',
      component: thememap,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/feelings',
      name: 'feelings',
      component: feelings,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "*", // 此处需特别注意置于最底部
      component: notFound
    }
  ]
})
