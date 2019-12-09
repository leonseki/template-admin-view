import configApi from '../../api/configApi';
import * as types from '../mutation-types';

// initial state
const state = {
  loading: false,
  tableData: [],
  filterData: {
    id: '',
    remark: ''
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
  updateRemark({commit, state}, val) {
    commit('updateRemark', val);
  },
  imageList({commit, state}) {
    commit(types.SET_LOADING);
    return configApi.imageList(state.filterData, state.pageSize, state.current).then(res => {
      commit('imageList', { res });
      commit(types.SET_LOAD_COMPLETE);
    }).catch(e => {
      commit(types.SET_LOAD_COMPLETE);
    })
  },
  pageChange({commit, state, dispatch}, current) {
    commit(types.PAGE_CHANGE, { current });
    dispatch('imageList');
  }
};

// mutations
const mutations = {
  updateId(state, id) {
    state.filterData.id = id;
  },
  updateRemark(state, val) {
    state.filterData.remark = val;
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
  imageList(state, { res }) {
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
