<script>
import { onMounted, ref, watch, watchEffect } from 'vue';
import * as constants from '@/app/constants'

const SCROLLY = constants.SET_SCROLLY

export default {
  props: [
    'top'
  ],
  setup(props) {
    const scrollTop = ref(0)
    const $elm = ref(null)

    const handelScrollTo = () => {
      setTimeout(() => {
        $elm.value = document.querySelector('.main-container')
        if ($elm.value) {
          $elm.value.scrollTo(0, scrollTop.value)
          props.stay && localStorage.removeItem(SCROLLY);
        }
      }, 300);
    }

    onMounted(() => {
      if (props.stay !== undefined) { //top 위치 유지가 필요한 페이지인 경우
        let val = localStorage.getItem(SCROLLY);
        // if (typeof val === 'number') {
        scrollTop.value = Number(val)
        // }
      }
      handelScrollTo()
    })

    watchEffect(() => {
      let top = props.top;
      scrollTop.value = top

      handelScrollTo()
    })

    return {

    }
  }
}
</script>