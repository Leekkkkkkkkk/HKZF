import axios from 'axios'
const state = {
  housesLis: []
}
const mutations = {
  getHousesLis (state, payload) {
    state.housesLis = payload
  }
}
const actions = {
  async getList (context, payload) {
    const headers = payload
    const res = await axios({
      url: 'http://liufusong.top:8080/user/houses',
      method: 'GET',
      headers: {
        Authorization: headers.token
      }
    })
    console.log(res)
    // console.log(headers.token)
    context.commit('getHousesLis', res.data.body)
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
