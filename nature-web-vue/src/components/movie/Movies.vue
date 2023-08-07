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
import http from '@/http-common'
import { useMovie } from '@/composables/movie'

export default {
  components: {
    ScrollToTop,
    Movie,
  },
  setup() {
    const { movies, page, addMovies, setPage } = useMovie()

    const _getMovies = async () => {
      try {
        setPage();
        const res = await http.get('movie/popular-movies', { params: { page: page.value } })
        addMovies(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const handleMore = () => {
      _getMovies();
    }

    onMounted(() => {
      console.log("onMounted")
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