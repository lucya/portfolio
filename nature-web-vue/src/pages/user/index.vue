<template>
  <div class="user-container">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/footer/Footer.vue'
import { onMounted, computed } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'


export default {
  components: {
    Footer,
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const user = computed(() => store.getters["User/getUser"]);

    onMounted(() => {
      if (user.value.loggedIn) {
        router.replace({
          name: "Home",
        });
      }
    })
  }
}
</script>
<style>
@import "@/assets/css/pages/user.css";
</style>