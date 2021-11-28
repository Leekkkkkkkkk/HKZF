import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getStorage('hkzf-user')
  },
  mutations: {
    initunser (state, payload) {
      state.user = payload
      setStorage('hkzf-user', JSON.stringify(payload))
    },
    removeStorage (state) {
      state.user = null
      removeStorage('hkzf-user')
    }
  },
  actions: {
  },
  modules: {
  }
})
