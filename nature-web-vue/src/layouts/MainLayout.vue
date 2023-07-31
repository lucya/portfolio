<template>
  <div className="main-container">
    <Header></Header>
    <router-view></router-view>
    <GoToTop />
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import GoToTop from "@/app/utils/GoToTop.vue";

export default {
  name: "MainLayout",
  components: {
    Header,
    GoToTop,
    Footer,
  },
};
</script>
<style>
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>