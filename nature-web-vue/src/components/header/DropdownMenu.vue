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
      <li>
        <router-link class="header-nav-item" to="/" @click.prevent="handleLogout">
          로그아웃
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import menuImg from '../../assets/images/menu_30.png';


export default {
  setup(props, context) {
    const dropMenuRef = ref(null)
    const menuOpen = ref(false)

    const handleOpen = () => {
      menuOpen.value = !menuOpen.value
    }

    const handleLogout = async () => {
      context.emit('handle-logout');
    }
    watch(menuOpen, () => {
      const handleOutsideClose = (e) => {
        e.preventDefault();
        // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
        if (menuOpen.value && (!dropMenuRef.value.contains(e.target))) menuOpen.value = false
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
