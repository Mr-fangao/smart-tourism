import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import recommend from '@/views/recommend'
import skAnalysis from '@/views/skAnalysis'
import thememap from '@/views/theme'
import feelings from '@/views/feelings'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        keepAlive:false//导航栏在该页面不显示
      }
    },
    {
      path: '/1',
      name: 'recommend',
      component: recommend,
      meta:{
        keepAlive:true//导航栏在该页面不显示
      }
    },
    {
      path: '/2',
      name: 'skAnalysis',
      component: skAnalysis,
      meta:{
        keepAlive:true//导航栏在该页面不显示
      }
    },
    {
      path: '/thememap',
      name: 'thememap',
      component: thememap,
      meta:{
        keepAlive:true//导航栏在该页面不显示
      }
    },
        {
      path: '/feelings',
      name: 'feelings',
      component: feelings,
      meta:{
        keepAlive:true//导航栏在该页面不显示
      }
    },
  ]
})
