import { computed } from 'vue';
import { useStore } from 'vuex';


export const useUser = () => {

  const store = useStore();
  const user = computed(() => store.state.User.user);


  const doLogin = (username, loggedIn = false) => {
    store.dispatch('User/LOGIN', username, loggedIn);
  }
  const doLogout = () => {
    store.dispatch('User/LOGOUT')
  }
  return {
    user,
    doLogin,
    doLogout,
  }
}