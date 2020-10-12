import Vue from 'vue'
import Router from 'vue-router'
import withdrawList from '@/components/withdrawList'
import setting from '@/components/setting'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/withdrawList',
      name: 'withdrawList',
      component: withdrawList
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    }
  ]
})
