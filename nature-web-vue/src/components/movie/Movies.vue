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
import { onMounted, ref } from 'vue'
import ScrollToTop from "@/app/utils/ScrollToTop";
import Movie from "./Movie.vue";
import http from '@/http-common'

export default {
  components: {
    ScrollToTop,
    Movie,
  },
  setup() {

    let page = ref(1)
    let movies = ref([])

    const getMovies = async (page) => {
      console.log("getMovies")
      try {
        const res = await http.get('movie/popular-movies', { params: { page: page } })
        movies.value = movies.value.concat(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const handleMore = () => {
      page.value = page.value + 1
      getMovies(page.value);
    }

    onMounted(() => {
      console.log("onMounted")
      // 목록이 있는 경우 재호출 금지
      if (movies.value && movies.value.length) return;
      getMovies()
    })

    return {
      movies,
      handleMore,
    }
  }
};
</script>

<style></style>