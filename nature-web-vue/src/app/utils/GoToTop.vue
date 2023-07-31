<template>
  <GoUp :upActive="upActive" @click.prevent="handleGoup">🔝</GoUp>
</template>

<script>
import styled from "vue-styled-components";
import { ref } from 'vue'

export const GoUp = styled.div`
  & {
    position: fixed;
    right: 16px;
    bottom: 30px;
    border-radius: 50%;
    padding: 7px;
    background-color: #2fcece;
    cursor: pointer;
    /* font-weight: 900; */
    font-size: 20px;
    display: ${(props) => (props.upActive === true ? "block" : "none")};
    z-index: 99;
    outline: none;
  }
  &:hover {
    background-color: var(--color-active);
  }
`;

export default {
  setUp() {
    const upActive = ref(false);
    const $elm = ref();

    const handleGoup = (e) => {
      $elm.value.scroll({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleScroll = () => {
      if ($elm.value) {
        const hasScroll = $elm.value.scrollHeight > $elm.value.offsetHeight
        hasScroll ? upActive.value = true : upActive.value = false
      }
    };
    $elm.value = document.querySelector('.main-container')
    $elm.value.addEventListener('scroll', handleScroll)

    return {
      $elm,
      handleGoup,
    }
  }
}
</script>