import articleApi from '../../api/articleApi';
import * as types from '../mutation-types';

// initial state
const state = {
  loading: false,
  tableData: [],
  filterData: {
    id: '',
    title: ''
  },
  total: 100,
  current: 1,
  pageSize: 20
};

// getters
const getters = {
  loading: state => state.loading,
  tableData: state => state.tableData,
  filterData: state => state.filterData,
  total: state => state.total,
  current: state => state.current,
  pageSize: state => state.pageSize,
};

// actions
const actions = {
  updateId({commit, state}, id) {
    commit('updateId', id);
  },
  updateTitle({commit, state}, val) {
    commit('updateTitle', val);
  },
  articleList({commit, state}) {
    commit(types.SET_LOADING);
    return articleApi.list(state.filterData, state.pageSize, state.current).then(res => {
      commit('articleList', { res });
      commit(types.SET_LOAD_COMPLETE);
    }).catch(e => {
      commit(types.SET_LOAD_COMPLETE);
    })
  },
  pageChange({commit, state, dispatch}, current) {
    commit(types.PAGE_CHANGE, { current });
    dispatch('articleList');
  }
};

// mutations
const mutations = {
  updateId(state, id) {
    state.filterData.id = id;
  },
  updateTitle(state, val) {
    state.filterData.title = val;
  },
  [types.SET_LOADING] (state) {
    state.loading = true;
  },
  [types.SET_LOAD_COMPLETE] (state) {
    state.loading = false;
  },
  [types.PAGE_CHANGE] (state, { current }) {
    state.current = current
  },
  [types.RESET_PAGE] (state) {
    state.current = 1;
  },
  articleList(state, { res }) {
    state.tableData = res.data.tableData;
    state.current = res.data.current;
    state.pageSize = res.data.pageSize;
    state.total = res.data.total;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
