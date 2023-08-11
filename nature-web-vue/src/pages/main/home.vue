<template>
  <ScrollToTop :top="top" />
  <div class="home-container">
    <About @set-top="setTop" />
  </div>
</template>

<script>
import ScrollToTop from '@/app/utils/ScrollToTop';
import About from '@/components/home/About.vue'
import { ref } from 'vue'

export default {
  components: {
    ScrollToTop,
    About,
  },
  setup() {
    const top = ref(0)
    const setTop = (h) => { // 자식 component Home.vue에서 호출하는 함수
      top.value = h
    }

    return {
      top,
      setTop
    }

  }
}
</script>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 10%);
  margin: 0 auto;
  position: relative;
}

.home-container .breadcrumb {
  width: 100vw;
  height: 61px;
  margin-left: calc(-50vw + 50%);
  position: sticky;
  top: 64px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  align-items: center;
}

.home-container .breadcrumb .portfolio-link {
  /* border: 1px dotted; */
  /* padding: 10px 0 10px 15px; */
  padding-left: 11%;
  text-align: center;
}

.home-container .breadcrumb button {
  /* padding: 10px; */
  color: black;
  font-weight: 700;
  font-size: 1.1em;
  margin: 10px;
  border: none;
}

@media (max-width: 530px) {
  .home-container .breadcrumb .portfolio-link {
    padding-left: 4%;
    font-size: 0.9em;
  }

  .home-container .breadcrumb .portfolio-link > span {
    display: none;
  }

  .home-container .breadcrumb > button {
    font-size: 0.9em;
  }
}

@media (max-width: 400px) {
  .home-container .breadcrumb .portfolio-link {
    padding-left: 4%;
    font-size: 0.8em;
  }

  .home-container .breadcrumb .portfolio-link > span {
    display: none;
  }

  .home-container .breadcrumb > button {
    font-size: 0.8em;
  }
}

.home-container .breadcrumb .portfolio-link button {
  padding: 0;
}

.home-container .breadcrumb button:hover {
  color: var(--color-active);
  transition: all .3s ease;
}

.home-container h2 {
  font-size: 26px;
  font-weight: 700;
  padding: 10px;
}

.home-container .fe-wrap,
.home-container .be-wrap {
  padding: 10px;
  border-bottom: 1px dotted var(--color-black);
}

.home-container .fe-wrap img,
.home-container .be-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home-container .resume-wrap {
  /* background-color: var(--color-base);
  color: white; */
}

.home-container .resume-wrap > div {
  /* height: 100%; */
  padding: 10px;
  border: 1px solid;
  margin: 10px;
  overflow: auto;
}

.home-container .resume-wrap .react-pdf__Document {
  overflow-y: auto;
  overflow-x: hidden;
}

.home-container .resume-wrap .react-pdf__Document .react-pdf__Page {
  border-bottom: 1px solid var(--color-black);
}
</style>