import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loadingFlagBtn: false // 全局的loading
  },
  mutations: {
    setLoadingFlag (state, data) {
      state.loadingFlagBtn = data
    }
  },
  getters: {
    getloadingFlagBtn: state => state.loadingFlagBtn
  },
  modules: {
    user
  }
})

export default store
