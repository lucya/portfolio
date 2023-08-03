<template>
  <div className="main-container">
    <Header></Header>
    <router-view></router-view>
    <GoToTop />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/header/Header.vue'
import GoToTop from '@/app/utils/GoToTop.vue'
import Footer from '@/components/footer/Footer.vue'

export default {
  components: {
    Header,
    GoToTop,
    Footer,
  }
}
</script>

<style>
@import '@/assets/css/pages/main.css'

</style>
