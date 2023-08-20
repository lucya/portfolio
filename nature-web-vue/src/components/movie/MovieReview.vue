<template>
  <LoadingBar v-if="!review" />
  <div v-else className="movie-review">
    <p>{{ review }}</p>
  </div>
</template>

<script>
import LoadingBar from '@/app/pages/LoadingBar.vue'
import { toRefs, ref, watch } from 'vue'
import http from '@/http-common'

export default {
  props: [
    'title'
  ],
  components: {
    LoadingBar,
  },
  setup(props) {
    const review = ref(null)
    const { title } = toRefs(props)

    // watch(title.value, () => {
    // getReview()
    // .then((data) => {
    //   review.value = data;
    // })
    // })

    const getReview = async () => {
      await http.post('/api/movie/review', { title: title.value }, {
        timeout: 180 * 1000,
      }).then(({ data }) => {
        review.value = data.assistant;
      }).catch((error) => {
        console.log(error)
      })
    }
    getReview()

    return {
      review,
    }
  }

}
</script>