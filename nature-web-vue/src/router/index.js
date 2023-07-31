import { createRouter, createWebHistory } from 'vue-router'

import Movies from '@/components/movie/Movies.vue'

import MovieInfo from '@/components/movie/MovieInfo.vue'
import Fortune from '@/components/chatgpt/FortuneConversation.vue'

const routes = [
  {
    path: '/',
    name: 'User',
    component: () => import('@/pages/user/index.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('@/pages/user/login.vue'),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/pages/user/signup.vue'),
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
      },
      {
        path: '/*',
        name: 'MovieLayout',
        component: () => import('@/layouts/MovieLayout.vue'),
        children: [
          {
            path: '/movies',
            name: 'Movies',
            component: Movies
          },
          {
            path: '/movie/:id',
            name: 'MovieInfo',
            component: MovieInfo
          },
        ]
      },
      {
        path: '/*',
        name: 'Fortune',
        component: () => import('@/layouts/FortuneLayout.vue'),
        children: [
          {
            path: '/fortune',
            name: 'FortuneConversation',
            component: () => import('@/components/chatgpt/FortuneConversation.vue'),
          }
        ]
      }
    ]
  }
]


// const routes = [
//   {
//     path: '/',
//     name: 'Login',
//     component: Login,
//     meta: { unauthorized: true, layout: 'UserLayout' },
//   },
//   {
//     path: '/signup',
//     name: 'SignUp',
//     component: SignUp,
//     meta: { unauthorized: true, layout: 'UserLayout' },

//   }
//   // {
//   //   path: '/about',
//   //   name: 'about',
//   //   // route level code-splitting
//   //   // this generates a separate chunk (about.[hash].js) for this route
//   //   // which is lazy-loaded when the route is visited.
//   //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   // }
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
