<template>
  <div class="movie-wrap">
    <router-link :to="`/movie/${movie.id}`" @click.prevent="handleSaveScroll">
      <img :src="imgBaseUrl + movie.poster_path" :alt="movie.title" />
    </router-link>
    <div class="movie-info">
      <h4>{{ movie.title }}</h4>
      <span class="overview">{{ movie.release_date }}</span>
      <span>평점 : {{ movie.vote_average }}</span>
    </div>
  </div>
</template>

<script>
import * as constants from '@/app/constants'
const imgBaseUrl = constants.IMG_BASE_URL

export default {
  props: ['movie'],
  setup() {
    const handleSaveScroll = () => {
      const $elm = document.querySelector('.main-container');
      localStorage.setItem(constants.SET_SCROLLY, $elm.scrollTop + "")
    }

    return {
      imgBaseUrl,
      constants,
      handleSaveScroll,
    }
  }
};
</script>