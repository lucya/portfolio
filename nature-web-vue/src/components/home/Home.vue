<template>
  <div class="breadcrumb" ref="brcRef">
    <div class='portfolio-link'>
      <span>포트폴리오 </span>
      <button @click.prevent="handleHashMove($event, feRef)">Front-end</button>
      <span>➕</span>
      <button @click.prevent="handleHashMove($event, beRef)">Back-end</button>
    </div>
    <button @click.prevent="handleHashMove($event, resumeRef)">About Nature!</button>
  </div>
  <div class="fe-wrap" ref="feRef">
    <h2>Front-end</h2>
    <div>
      <img :src="frontEnd" alt='web' />
    </div>
  </div>
  <div class="be-wrap" ref="beRef">
    <h2>Back-end</h2>
    <div>
      <img :src="backEnd" alt='server' />
    </div>
  </div>
  <div class="resume-wrap" ref="resumeRef">
    <h2>About Nature</h2>
    <div>
      <Resume />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import * as constants from '@/app/constants'
import Resume from '@/components/home/Resume.vue'

const frontEndx = constants.GET_FIREBASE_FILE_URL("images", "nature_web.png");
const backEndx = constants.GET_FIREBASE_FILE_URL("images", "nature_server.png");

export default {
  components: {
    Resume,
  },
  emits: ['set-top'],
  setup(props, context) {

    const frontEnd = ref()
    frontEnd.value = frontEndx

    const backEnd = ref()
    backEnd.value = backEndx


    const brcRef = ref(null)
    const feRef = ref(null)
    const beRef = ref(null)
    const resumeRef = ref(null)


    const handleHashMove = (e, targetRef) => {
      let breadcrumbHeight = brcRef.value.clientHeight || 0
      let h = targetRef.offsetTop - (breadcrumbHeight);
      context.emit('set-top', h) // home.vue 함수 호출
    }

    return {
      frontEnd,
      backEnd,
      handleHashMove,
      brcRef,
      feRef,
      beRef,
      resumeRef,
    }
  }
}
</script>