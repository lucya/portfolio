export default {
  namespaced: true,
  state: { // state 상태 관리해야 할 속성(데이터)을 선언하는 항목
    // user: {}
  },
  mutations: {

    setUser(state, payload) {
      console.log('setUser', payload)
      state.user = payload;
    },

  },

  actions: {
    LOGIN({ state, commit }, payload) {
      // localStorage.setItem('token', token);
      commit('setUser', payload)
    },

    LOGOUT({ state, commit }) {
      commit('setUser', {})
    },
  }
};