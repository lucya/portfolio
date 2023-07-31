import { createStore } from 'vuex'
import axios from 'axios'
import { User } from './modules/User';
import { Movie } from './modules/Movie';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default createStore({
  modules: {
    User,
    Movie,
  }
})
