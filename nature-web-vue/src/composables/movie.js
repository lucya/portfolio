import { computed } from "vue";
import { useStore } from "vuex";

export const useMovie = () => {
  const store = useStore()
  const movies = computed(() => store.state.movie.movies)

  const initMovies = () => {
    store.dispatch('movie/initMovies')
  }

  const getMovies = () => {
    return store.dispatch('movie/getMovies')
  }
  return {
    movies,
    initMovies,
    getMovies,
  }
}