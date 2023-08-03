<template>
  <img :src="menuImg" alt='menu' ref="dropMenuRef" @click="handleOpen" />
  <div class='drop-menu' :style="menuOpen ? 'display: block' : 'display: none'">
    <ul>
      <li>
        <router-link to="/movies">인기영화</router-link>
      </li>
      <li>
        <router-link to="/fortune">운세마법사</router-link>
      </li>
      <li @click="handleLogout">로그아웃</li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import http from '@/http-common'
import { useRouter } from 'vue-router'
import menuImg from '../../assets/images/menu_30.png';


export default {
  setup() {
    const router = useRouter()
    const dropMenuRef = ref(null)
    const menuOpen = ref(false)

    const handleOpen = () => {
      menuOpen.value = !menuOpen.value
    }

    const handleLogout = async () => {
      try {
        await http.post('/user/logout')
        router.replace({
          name: "Login",
        });
      } catch (error) {
        alert('서버 에러가 발생하고 있습니다.')
        console.log(error)
      }
    }
    watch([menuOpen.value], () => {
      const handleOutsideClose = (e) => {
        e.preventDefault();
        // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
        if (menuOpen.value && (!dropMenuRef.value.current?.contains(e.target))) menuOpen.value = false
      }

      document.addEventListener('click', handleOutsideClose);
      return () => document.removeEventListener('click', handleOutsideClose);
    })

    return {
      dropMenuRef,
      handleLogout,
      handleOpen,
      menuOpen,
      menuImg,
    }
  }
}
</script>

<style></style>
