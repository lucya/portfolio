import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from "vuex";

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
        name: 'Movie',
        component: () => import('@/pages/movie/index.vue'),
        children: [
          {
            path: '/movies',
            name: 'Movies',
            component: () => import('@/components/movie/Movies.vue'),
          },
          {
            path: '/movie/:id',
            name: 'MovieInfo',
            component: () => import('@/components/movie/MovieInfo.vue'),
            
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

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/', '/signup'];
//   const authRequired = !publicPages.includes(to.path);
//   const store = useStore();
//   const user = store.getters["User/getUser"];
//   alert(user.loggedIn + '/' + authRequired)
//   // if (authRequired && !user.loggedIn) {
//   //   if (to.path !== '/')
//   //     // return '/';
//   // } else {
//   //   return '/home';
//   // }
//   if (user.loggedIn && authRequired) {
//     return '/home';
//   }
// });
export default router
