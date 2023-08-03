<template>
  <div class="user-container">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer/Footer.vue'
export default {
  components: {
    Footer,
  }
}
</script>
<style>
@import "@/assets/css/pages/user.css";
</style>