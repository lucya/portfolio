import { createRouter, createWebHistory } from 'vue-router'
import http from '@/http-common'

const check = () => (to, from, next) => {

  http.get('/api/user/check').then(({ data }) => {

    return next();

  }).catch((error) => {
    console.log('ssss', error)
    localStorage.clear();

    if (to.meta.requiredAuth) {
      alert("로그인 후 이용해주세요.");

      next("/");
    } else {
      next()
    }

  })
}


const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: 'PageNotFound',
    component: () => import('@/app/pages/PageNotFound.vue')
  },
  {
    path: '/',
    name: 'User',
    component: () => import('@/pages/user/index.vue'),
    children: [
      // {
      //   path: '/', redirect: { name: 'Login' }
      // },
      {
        // path: '/login',
        path: '/',
        name: 'Login',
        component: () => import('@/pages/user/login.vue'),
        meta: { requiredAuth: false },
        beforeEnter: check()
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/pages/user/signup.vue'),
        meta: { requiredAuth: false },
        beforeEnter: check(),
      }
    ]
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/main/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/main/home.vue'),
        meta: { requiredAuth: true },
        beforeEnter: check(),
      },
      {
        path: '/*',
        name: 'Movie',
        component: () => import('@/pages/movie/index.vue'),
        children: [
          {
            path: '/movies',
            name: 'Movies',
            component: () => import('@/components/movie/Movies.vue'),
            meta: { requiredAuth: true },
            beforeEnter: check(),
          },
          {
            path: '/movie/:id',
            name: 'MovieInfo',
            component: () => import('@/components/movie/MovieInfo.vue'),
            meta: { requiredAuth: true },
            beforeEnter: check(),
          },
        ]
      },
      {
        path: '/*',
        name: 'Fortune',
        component: () => import('@/pages/fortune/index.vue'),
        children: [
          {
            path: '/fortune',
            name: 'FortuneConversation',
            component: () => import('@/components/fortune/FortuneConversation.vue'),
            meta: { requiredAuth: true },
            beforeEnter: check(),
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
