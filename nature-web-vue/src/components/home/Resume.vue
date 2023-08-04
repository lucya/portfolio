<template>
  <vue-pdf-app style="height: 100vh;" :pdf="pdf" :config="config" theme="light" @error="onError"
    @open="openHandler"></vue-pdf-app>
</template>

<script>
import { ref } from 'vue'
import * as constants from '@/app/constants'
import resumeFile from '@/assets/resource/resume.pdf'
import VuePdfApp from "vue3-pdf-app";
// import this to use default icons for buttons
// import "vue3-pdf-app/dist/icons/main.css";

const resumeLink = constants.GET_FIREBASE_FILE_URL('resource', 'resume.pdf')

export default ({
  components: {
    VuePdfApp,
  },
  setup() {
    const pdf = ref(resumeFile)

    const openHandler = (pdfApp) => {
      try {
        alert(1)
        window._pdfApp = pdfApp;
      } catch (error) {
        alert(2)
        pdf.value = resumeFile
      }
    }

    const onError = (pdfApp) => {
      alert(3)
    }

    const config = {
      toolbar: false,
      errorWrapper: false,
    }

    return {
      pdf,
      config,
      openHandler,
      onError,
    }
  }
})
</script>

<style></style>