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

    watch(title, () => {
      getReview(title.value).then((data) => {
        review.value = data;
      })
    })

    const getReview = async (title) => {
      await http.post('movie/review', { title: title }, {
        timeout: 180 * 1000
      }).then(({ data }) => {
        return data.assistant;
      }).catch((error) => {
        console.log(error)
      })
    }
    return {
      review,
    }
  }

}
</script>