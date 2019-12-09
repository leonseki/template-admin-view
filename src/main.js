// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入viewUI(iview)
import viewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import VueCookie from 'vue-cookie';

import VueParticles from 'vue-particles';



Vue.use(viewUI);
Vue.use(VueCookie);
Vue.use(VueParticles);

// 路由钩子

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  viewUI.LoadingBar.start();
  if (Vue.cookie.get('is_login')) {
    next();
  } else {
    if (to.path !== '/login') {
      if (to.path !== '/') {
        Vue.cookie.set('path', to.fullPath);
      }
      next({ path: '/login' })
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  viewUI.LoadingBar.finish();
  window.scrollTo(0, 0)
});

/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
