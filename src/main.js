// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueRouter from 'vue-router'
// 引入viewUI(iview)
import viewUI from 'view-design'
import 'view-design/dist/styles/iview.css';


Vue.use(viewUI)
Vue.use(VueRouter)


/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
