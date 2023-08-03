<template>
  <div className="fortune-container">
    <FortuneConversation />
  </div>
</template>

<script>
import FortuneConversation from '@/components/fortune/FortuneConversation.vue'

export default {
  components: {
    FortuneConversation,
  },
  setup() {

  }
}
</script>

<style>
@import "@/assets/css/pages/fortune.css";
</style>