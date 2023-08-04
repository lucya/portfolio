<template>
  <div class="page-container">
    <div class="not-found">
      해당 페이지를 찾지 못했습니다.
    </div>
    <div style="font-size: 32px;line-height: 1.6">
      주소가 잘못되었거나 더 이상 제공되지 않는 페이지 입니다.</div>
    <div @click.prevent="goPage" style="font-size: 32px; line-height: 1.6; color: red; cursor: pointer">
      메인 페이지로 이동
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    const goPage = () => {
      router.push({
        name: "Login",
      });
    }

    return {
      goPage,
    }
  }
}
</script>

<style scoped>
.not-found {
  margin-top: 64px;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 32px;
}
</style>