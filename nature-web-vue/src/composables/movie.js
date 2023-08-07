import { computed } from "vue";
import { useStore } from "vuex";

export const useMovie = () => {
  const store = useStore()
  const movies = computed(() => store.state.movie.movies)
  const page = computed(() => store.state.movie.page)

  const addMovies = (movies) => {
    store.dispatch('movie/ADD_MOVIES', movies)
  }
  const setPage = () => {
    return store.dispatch('movie/SET_PAGE')
  }
  const initMovies = () => {
    store.dispatch('movie/INIT_MOVIES')
  }
  return {
    movies,
    page,
    addMovies,
    initMovies,
    setPage,
  }
}