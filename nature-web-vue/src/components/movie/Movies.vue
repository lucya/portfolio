<script>
import ScrollToTop from "@/app/utils/ScrollToTop";
import Movie from "./Movie.vue";

export default {
  name: "Movies",
  props: {},
  data() {},
  components: {
    ScrollToTop,
    Movie,
  },
  methods: {},
};
</script>

<template>
  <flagment>
    <ScrollToTop stay />
    <div class="movie-container">
      <Movie v-for="movie in movies" :key="movie.id" movie="{movie}" />
    </div>
    <div class="movie-more">
      <button @click="handleMore">More</button>
    </div>
  </flagment>
</template>



<style>
</style>