import Vue from 'vue'
import Router from 'vue-router'
import login from './login'
import article from './article'

Vue.use(Router)

const routers = [
  ...login,
  ...article,
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      requireAuth: true
    },
    component: () => import('../views/NavBar')
  }
];

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

let router = new Router({
  routes: routers,
  mode: 'history'
});

export default router
