<template>
  <router-view />
  <Footer />
</template>
<script>
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>
<style>
@import "@/assets/css/main.css";
</style>