<template>
  <ScrollToTop stay />
  <div class="movie-container">
    <Movie v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
  <div class="movie-more">
    <button @click="handleMore">More</button>
  </div>
</template>


<script>
import { onMounted } from 'vue'
import ScrollToTop from "@/app/utils/ScrollToTop";
import Movie from "./Movie.vue";
import { useMovie } from '@/composables/movie'


export default {
  components: {
    ScrollToTop,
    Movie,

  },
  setup() {
    const { movies, getMovies } = useMovie()

    const _getMovies = () => {
      getMovies()
        .catch((error) => {
          console.log(error)
        })
    }
    const handleMore = () => {
      _getMovies();
    }

    onMounted(() => {
      // 목록이 있는 경우 재호출 금지
      if (movies.value && movies.value.length) return;

      _getMovies()
    })

    return {
      movies,
      handleMore,
    }
  }
};
</script>

<style></style>