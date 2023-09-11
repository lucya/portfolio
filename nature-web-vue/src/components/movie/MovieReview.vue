<template>
  <LoadingBar v-if="!review" />
  <div v-else className="movie-review">
    <p>{{ review }}</p>
  </div>
</template>

<script>
import LoadingBar from '@/app/pages/LoadingBar.vue'
import { toRefs, ref } from 'vue'
import { getReviewApi } from '@/api/movie'

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

    const getReview = async () => {
      await getReviewApi(title.value)
        .then(({ data }) => {
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