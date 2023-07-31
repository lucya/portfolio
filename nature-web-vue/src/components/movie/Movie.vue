<template>
  <div class="movie-wrap">
    <router-link :to="`/movie/${movie.id}`" @click="handleSaveScroll">
      <!-- <img :src="{{config.IMG_BASE_URL + movie.poster_path}}"  alt="{{movie.title}}" /> -->
    </router-link>
    <div class="movie-info">
      <h4>{movie.title}</h4>
      <span class="overview">{movie.release_date}</span>
      <span>평점 : {movie.vote_average}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: ["movie"],
  data() {
    return {};
  },
  methods: {
    handleSaveScroll() {},
  },
};
</script>