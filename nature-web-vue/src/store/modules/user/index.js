import { loginApi, logoutApi } from "@/api/user";

export default {
  namespaced: true,
  state: { // state 상태 관리해야 할 속성(데이터)을 선언하는 항목
    user: {},
  },
  getters: {},
  mutations: {

    setUser(state, payload) {
      state.user = payload;
    },

  },
  actions: {

    async logout({ commit }) {
      try {
        await logoutApi()
          .then(() => commit('setUser', {}))
      } catch (error) {
        throw new Error(`API ${error}`)
      }
    },

    async login({ commit, dispatch }, payload) {
      try {
        await loginApi(payload)
          .then(({ data }) => {
            commit('setUser', data)
            // 다른 store modules의 actions call 하기
            dispatch('movie/initMovies', null, { root: true })
          })
      } catch (error) {
        throw new Error(`API ${error}`)
      }
    }
  }
};