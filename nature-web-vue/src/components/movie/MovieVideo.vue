<template>
  <h3 v-if="videos && videos.length > 0">예고편</h3>
  <YouTube v-for="video in videos" :key="video.key" :vars="options" width="100%" height="100%"
    :src="`https://www.youtube.com/watch?v=${video.key}`" @ready="onReady" ref="youtube" />
</template>
<script>
import { ref, onMounted, watch, toRefs } from 'vue';
import YouTube from 'vue3-youtube'
import http from '@/http-common'

export default {
  props: [
    'id'
  ],
  components: {
    YouTube,
  },
  setup(props) {
    const videos = ref([])
    const youtube = ref(null)
    const { id } = toRefs(props)

    watch(id, () => {
      getMovieVideos(id.value).then((data) => {
        videos.value = data
      })
    })

    const getMovieVideos = async (id) => {
      try {
        const res = await http.get(`/movie/videos/${id}`)
        return res.data
      } catch (error) {
        console.log(error)
      }
    }

    const options = {
      autoplay: 0,
      loop: 1,
    }

    const onReady = () => {
      // YT is not defined 에러 발생으로 timeout 처리
      const $elms = document.querySelectorAll('section.video>div>iframe');

      $elms.forEach($elm => {
        $elm.style = '';
        $elm.style = 'position:absolute;top:0;left:0;';
      })
    }
    return {
      videos,
      onReady,
      options
    }
  }
}
</script>
<style scoped>
section.video {
  border-top: 1px solid #fff;
  margin-top: 30px;
}

section.video > div {
  position: relative;
  padding-top: 56% !important;
  width: 100% !important;
  height: 0 !important;
  margin: 20px 0 !important;
}

section.video > div > iframe {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

iframe.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>