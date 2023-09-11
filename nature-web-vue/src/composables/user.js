import { computed } from 'vue';
import { useStore } from 'vuex';

export const useUser = () => {

  const store = useStore();
  const user = computed(() => store.state.user.user);
  // component에서 직접 사용시엔, $store.state.user.user

  const login = (userData) => {
    return store.dispatch('user/login', userData)
  }

  const logout = () => {
    return store.dispatch('user/logout')
  }
  return {
    user,
    login,
    logout,
  }
}