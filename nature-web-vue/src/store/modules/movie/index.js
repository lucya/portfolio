import { getMoviesApi } from '@/api/movie'

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
    initMovies(state) {
      state.movies = []
      state.page = 0
    },
    setPage(state) {
      state.page++
    }
  },
  getters: {},
  actions: {
    initMovies({ commit }) {
      commit('initMovies')
    },
    async getMovies({ state, commit }) {
      try {
        commit('setPage')
        // await http.get('/api/movie/popular-movies', { params: { page: state.page } })
        await getMoviesApi(state.page)
          .then(({ data }) => {
            commit('addMovies', data)
          })
      } catch (error) {
        throw new Error(`API ${error}`)
      }
    },

  },
}