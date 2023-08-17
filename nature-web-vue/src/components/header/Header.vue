<template>
  <div class="header-container">
    <div class="header-wrap">
      <div class="header-left-wrap">
        <router-link to="/home">
          <picture>
            <source :srcset="logo170" media="all and (min-width: 767px)" />
            <source :srcset="logo120" media="(min-width: 100px)" />
            <img :src="logo170" alt="로고" />
          </picture>
        </router-link>
      </div>
      <div class="header-right-wrap">
        <div class="navigation">
          <ul class="right-menu">
            <li>
              <router-link class="header-nav-item" to="/movies">
                인기영화
              </router-link>
            </li>
            <li>
              <router-link class="header-nav-item" to="/fortune">
                운세마법사
              </router-link>
            </li>
            <li class="header-nav-item">|</li>
            <li>
              <router-link class="header-nav-item" to="/" @click.prevent="handleLogout">
                로그아웃
              </router-link>
            </li>
          </ul>
          <div class="dropdown-menu">
            <DropdownMenu @handle-logout="handleLogout" />
          </div>
          <div class="header-nav-user" @mouseenter.prevent="isShow = true" @mouseleave.prevent="isShow = false">
            <img :src="user.photoURL || profile_base" alt="user" />
            <span class="username" :class="isShow ? 'show' : ''">{{
              user.username
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import http from '@/http-common'
import { useRouter } from 'vue-router'
import logo170 from '@/assets/images/logo170.png'
import logo120 from '@/assets/images/logo120.png'
import profile_base from "@/assets/images/profile_base.png";
import DropdownMenu from '@/components/header/DropdownMenu.vue'
import { useUser } from "@/composables/user";
import { useMovie } from "@/composables/movie";


export default {
  components: {
    DropdownMenu,
  },
  setup() {
    const isShow = ref(false)
    const router = useRouter()
    const { user, doLogout } = useUser();
    const { initMovies } = useMovie();

    const handleLogout = async () => {
      await http.post('user/logout')
        .then(() => {
          doLogout();
          initMovies();
          sessionStorage.clear();
          router.replace({
            name: "Login",
          });
        }).catch((error) => {
          alert('서버 에러가 발생하고 있습니다.')
          console.log(error)
        })
    }

    return {
      logo170,
      logo120,
      isShow,
      profile_base,
      handleLogout,
      user,
    }
  }
};
</script>

<style>
.header-container {
  top: 0;
  left: 0;
  right: 0;
  position: sticky;
  z-index: 3;
  width: 100%;
  background: var(--color-base);
  background: radial-gradient(circle,
      var(--color-base) 0%,
      var(--color-mid) 35%,
      var(--color-last) 100%);
}

.header-wrap {
  height: 64px;
  max-width: calc(100vw - 20%);
  margin: 0 auto;

  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  /* padding: 0 10px; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
}

.header-left-wrap {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin: 5px;
  width: 160px;
  min-width: 110px;
}

.header-right-wrap {
  margin: 5px;
  display: flex;
  align-items: center;
}

.header-right-wrap .navigation {
  display: flex;
  padding: 20px 0;
  align-items: center;
}

.header-right-wrap .navigation .right-menu {
  right: 20px;
  display: flex;
  margin-left: 16px;
  /* margin-top: 20px; */
  align-items: center;
}

.header-right-wrap .navigation .right-menu li {
  padding: 8px;
}

.header-right-wrap .navigation ul.right-menu > li > a:hover {
  color: var(--color-hover);
  transition: all 0.3s ease;
}

.header-right-wrap .navigation ul.right-menu > li::before {
  display: block;
  content: "";
  padding-top: 3px;
}

.header-right-wrap .navigation ul.right-menu > li:after {
  display: block;
  content: "";
  border-bottom: solid 3px var(--color-hover);
  transform: scaleX(0);
  transition: transform 250ms ease-in-out;
}

.header-right-wrap .navigation ul.right-menu > li:hover:after {
  transform: scaleX(1);
}

@media (max-width: 767px) {
  .right-menu {
    display: none !important;
    z-index: 10;
  }
}

.header-right-wrap .navigation {
  height: 32px;
}

.header-nav-item {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
}

.header-nav-user {
  color: #ffffff;
  display: flex;
  align-items: center;
  /* background-color: #fff; */
  border-radius: 3px;
  /* outline: 1px dashed; */
  margin-left: 10px;
  /* cursor: pointer; */
  /* padding-right: 10px; */
}

.header-nav-user img {
  width: 35px;
  height: 35px;
  border-radius: 70%;
  border: 0.5px solid #111111;
}

.header-nav-user .username {
  position: absolute;
  background-color: #fff;
  border: 2px solid var(--color-base);
  color: var(--color-base);
  top: 63px;
  right: 45px;
  border-radius: 5px;
  padding: 4px;
  display: none;
}

.header-nav-user .username.show {
  display: block;
}

/* .header-nav-user .logout {
  position: absolute;
  top: 45px;
  right: 0px;
  background-color: #1b1a1a;
  padding: 3px;
  display: none;
}

.header-nav-user .logout.active {
  display: block;
} */

.header-nav-user .logout ul li {
  color: #fff;
  padding: 5px;
  font-weight: 600;
}

/* DropdownMenu menu */
.dropdown-menu {
  display: none;
}

.dropdown-menu {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 10;
}

.drop-menu {
  position: absolute;
  top: 60px;
  right: 57px;
  width: 100px;
  background-color: #ffffff;
  margin: 3px;
  border-radius: 5px;
  border: 2px solid var(--color-base);
  display: none;
}

@media (max-width: 767px) {

  .dropdown-menu,
  .drop-menu {
    display: block;
    z-index: 10;
  }
}

.drop-menu li {
  padding: 4px;
  text-align: left;
  color: #1b1a1a;
  font-weight: 600;
}

.drop-menu li a {
  color: #1b1a1a;
}

.drop-menu li:last-child {
  border-top: 1px solid;
}
</style>