import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import recommend from '@/views/recommend'

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
    }
  ]
})
