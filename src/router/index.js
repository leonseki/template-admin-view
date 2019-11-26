import Vue from 'vue'
import Router from 'vue-router'
import login from './login'
// import system from './system'

// const nav = () => import('../views/login.vue')

Vue.use(Router)

const routers = [
  ...login,
  // system,
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      requireAuth: true
    },
    // component: () => import('../views/nav')
  }
]

let router = new Router({
  routes: routers,
  mode: 'history'
})

export default router
