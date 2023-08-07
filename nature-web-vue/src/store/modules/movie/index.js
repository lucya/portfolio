export default {
  namespaced: true,
  state: {
    movies: [],
    page: 0,
  },
  mutations: {
    addMovies(state, payload) {
      state.movies = [...state.movies, ...payload]
    },
    initMovies(state, payload) {
      state.movies = []
      state.page = 0
    },
    setPage(state, payload) {
      state.page += 1
    }
  },
  getters: {
    
  },
  actions: {
    
    SET_PAGE({ state, commit }) {
      commit('setPage')
    },
    ADD_MOVIES({ state, commit }, payload) {
      commit('addMovies', payload)
    },
    INIT_MOVIES({ state, commit }) {
      commit('initMovies')
    }
  },

}