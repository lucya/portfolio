<script>
import { onMounted, ref, watch, watchEffect } from 'vue';
import * as constants from '@/app/constants'

const SCROLLY = constants.SET_SCROLLY

export default {
  props: [
    'top', 'stay'
  ],
  setup(props) {
    const scrollTop = ref(props.top);
    const stay = props.stay !== undefined ? true : false
    const $elm = ref(null)

    const handelScrollTo = () => {
      setTimeout(() => {
        $elm.value = document.querySelector('.main-container')
        if ($elm.value) {
          $elm.value.scrollTo(0, scrollTop.value)
          stay && localStorage.removeItem(SCROLLY);
        }
      }, 300);
    }

    onMounted(() => {
      if (stay) { //top 위치 유지가 필요한 페이지인 경우
        let val = localStorage.getItem(SCROLLY);
        // if (typeof val === 'number') {
        scrollTop.value = Number(val)
        // }
      }
      handelScrollTo()
    })

    watchEffect(() => {
      let top = props.top; // props.top 이 변경되면 작동
      scrollTop.value = top

      handelScrollTo()
    })

    return {

    }
  }
}
</script>