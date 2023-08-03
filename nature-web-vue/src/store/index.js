import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'; // 새로고침에서도 state 유지

import { User } from './modules/user';

export default createStore({
  modules: {
    User,
  },
  plugins: [
    createPersistedState()
  ]
})
