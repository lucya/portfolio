import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'; // 새로고침에서도 state 유지

import modules from './modules';

export default createStore({
  modules,
  plugins: [
    createPersistedState()
  ]
})
