import { computed } from 'vue';
import { useStore } from 'vuex';


export const useUser = () => {

  const store = useStore();
  const user = computed(() => store.state.user.user);

  const doLogin = (_user) => {
    store.dispatch('user/LOGIN', _user);
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