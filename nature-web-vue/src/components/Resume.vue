<template>
  <div>
  </div>
  <VuePdfApp pdf="@/assets/resource/resume.pdf" page-scale="100" @open="openHandler"></VuePdfApp>
</template>

<script>
import * as constants from '@/app/constants'
import resumeFile from '@/assets/resource/resume.pdf'
import VuePdfApp from "vue-pdf-app";


const resumeLink = constants.GET_FIREBASE_FILE_URL('resource', 'resume.pdf')

export default ({
  components: {
    // VuePdfApp,
  },
  setup() {
    const openHandler = (pdfApp) => {
      window._pdfApp = pdfApp;
    }

    return {
      resumeLink,
      resumeFile,

      openHandler,
    }
  }
})
</script>

<style></style>