import { computed } from 'vue';
import { useStore } from 'vuex';


export const useUser = () => {

  const store = useStore();
  const user = computed(() => store.state.user.user);


  const doLogin = (username, loggedIn = false) => {
    store.dispatch('user/LOGIN', username, loggedIn);
  }
  const doLogout = () => {
    store.dispatch('user/LOGOUT')
  }
  return {
    user,
    doLogin,
    doLogout,
  }
}