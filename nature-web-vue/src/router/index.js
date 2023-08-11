import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from "@/composables/user";

const authCheck = () => (to, from, next) => {
  const { user } = useUser();
  const { requiredLoggin } = to.meta;

  if (user.value.loggedIn === true && requiredLoggin === true) {
    // 로그인상태 && 로그인이 필요한 페이지
    return next()
  }

  next('/')
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
        // meta: { requiredLoggin: false },
        // beforeEnter: authCheck()
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/pages/user/signup.vue'),
        // meta: { requiredLoggin: false },
        // beforeEnter: authCheck(),
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
        meta: { requiredLoggin: true },
        beforeEnter: authCheck(),
      }, 
      {
        path: '/gov/tsunami-shelter',
        name: 'TsunamiShelter',
        component: () => import('@/components/gov/TsunamiShelter.vue'),
        meta: { requiredLoggin: true },
        beforeEnter: authCheck(),
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
            meta: { requiredLoggin: true },
            beforeEnter: authCheck(),
          },
          {
            path: '/movie/:id',
            name: 'MovieInfo',
            component: () => import('@/components/movie/MovieInfo.vue'),
            meta: { requiredLoggin: true },
            beforeEnter: authCheck(),
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
            meta: { requiredLoggin: true },
            beforeEnter: authCheck(),
          }
        ]
      },
      // {
      //   path: '/',
      //   name: 'Gov',
      //   component: () => import('@/pages/main/index.vue'),
      //   children: [
      //     {
      //       path: '/gov/tsunami-shelter',
      //       name: 'TsunamiShelter',
      //       component: () => import('@/components/gov/TsunamiShelter.vue'),
      //       meta: { requiredLoggin: true },
      //       beforeEnter: authCheck(),
      //     }
      //   ]
      // }
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
