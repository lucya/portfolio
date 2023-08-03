import http from "@/http-common";

const API_URL = 'http://localhost:8080'

export const User = {
  namespaced: true,
  state: {
    email: '',
    password: '',
    isLoggendIn: false,
  },
  mutations: {
    // setEmail(state, email) {
    //   state.email = email;
    // },
    // setPassword(state, password) {
    //   state.password = password;
    // },
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  getters: {

  },
  actions: {
    async login({ state, commit }) {
      try {
        const res = await http.post(API_URL + '/user/login', {
          email: state.email,
          password: state.password
        });
        const token = res.data.token;

        // You can save the token in local storage or use Vuex for state management
        // For this example, let's save it in local storage
        localStorage.setItem('token', token);
        commit('setLoggedIn', true);

        // Redirect the user to the home page or any other route
        // Note: The exact syntax for navigation may vary based on your router setup
        // For this example, I'm assuming you're using Vue Router
        this.$router.push('/home');
      } catch (error) {
        // Handle login errors
        console.log(error);
        commit('setError', error.response.data);
      }
    },
    async logout({ state, commit }) { },
  }
};