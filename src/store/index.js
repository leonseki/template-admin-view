import Vue from 'vue';
import Vuex from 'vuex';

import article from './module/article';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    article
  },
  strict: debug
})
