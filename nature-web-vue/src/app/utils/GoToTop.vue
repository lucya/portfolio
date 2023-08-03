<template>
  <div class="goup" :style="upActive ? 'display:block' : 'display:none'" @click="handleGoup">
    🔝</div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {

  setup() {
    const $route = useRoute()
    const upActive = ref(false);
    const $elm = ref(undefined);

    const handleGoup = () => {
      $elm.value.scroll({
        top: 0,
        behavior: "smooth",
      });
    }

    const scrollHandler = () => {
      // const handleScroll = () => {
      if ($elm.value) {
        const hasScroll = $elm.value.scrollHeight > $elm.value.offsetHeight
        hasScroll ? upActive.value = true : upActive.value = false
      }
      // $elm.value.addEventListener('scroll', handleScroll)
    };
    watch($route, async (to, from) => {
      setTimeout(() => {
        scrollHandler()
      }, 300)
    });
    onMounted(() => {
      $elm.value = document.querySelector('.main-container')

      // DOM이 마운트 되었을 때 이벤트 핸들러를 등록한다.
      document.addEventListener('scroll', scrollHandler);
    });

    window.onbeforeunload = function (e) {
      alert('refresh')
    }
    return {
      upActive,
      handleGoup,
    }
  }
}
</script>

<style>
div.goup {
  position: fixed;
  right: 16px;
  bottom: 30px;
  border-radius: 50%;
  padding: 7px;
  background-color: #2fcece;
  cursor: pointer;
  /* font-weight: 900; */
  font-size: 20px;
  z-index: 99;
  outline: none;
}

div.goup:hover {
  background-color: var(--color-active);
}
</style>