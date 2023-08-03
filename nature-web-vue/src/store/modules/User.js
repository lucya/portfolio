import http from "@/http-common";

export const User = {
  namespaced: true,
  state: { // state 상태 관리해야 할 속성(데이터)을 선언하는 항목
    user: {}
  },
  mutations: {

    setUser(state, payload) {
      state.user.username = payload.username;
      state.user.loggedIn = payload.loggedIn;
    },

  },
  getters: {

    getUser(state) {
      return state.user;
    }
  },
  actions: {
    LOGIN({ state, commit }, payload) {
      // localStorage.setItem('token', token);
      payload.loggedIn = true;
      commit('setUser', payload)
    },
    // async LOGIN({ state, commit }, payload) {
    //   try {
    //     const res = await http.post('user/login', {
    //       email: payload.email,
    //       password: payload.password
    //     });
    //     const token = res.data.token;

    //     // You can save the token in local storage or use Vuex for state management
    //     // For this example, let's save it in local storage
    //     localStorage.setItem('token', token);
    //     commit('setUserName', 'username')
    //     commit('setLoggedIn', true);

    //     // Redirect the user to the home page or any other route
    //     // Note: The exact syntax for navigation may vary based on your router setup
    //     // For this example, I'm assuming you're using Vue Router
    //     this.$router.push('/home');
    //   } catch (error) {
    //     // Handle login errors
    //     console.log(error);
    //     commit('setError', error.response.data);
    //   }
    // },
    LOGOUT({ state, commit }) {
      commit('setUser', {})
    },
  }
};