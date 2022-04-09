import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    beforeEnter: (to, from) => {
      if (store.getters.isLoggedIn) {
        return {
          path: '/home'
        };
      } else {
        return {
          path: '/welcome'
        };
      }
    }
  },
  {
    path: '/welcome',
    name: 'LandingPage',
    component: () =>
      import(/* webpackChunkName: "LandingPage" */ '../views/LandingPage.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    meta: { forVisitor: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "ForgotPassword" */ '../views/ForgotPassword.vue'
      ),
    meta: { forVisitor: true }
  },
  {
    path: '/reset-password/:id/:token',
    name: 'ResetPassword',
    component: () =>
      import(
        /* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'
      )
  },
  {
    path: '/verify-email/:token',
    name: 'AccountActivation',
    component: () =>
      import(
        /* webpackChunkName: "AccountActivation" */ '../views/AccountActivation.vue'
      )
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/list',
    name: 'MovieList',
    component: () =>
      import(/* webpackChunkName: "MovieList" */ '../views/MovieList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () =>
      import(/* webpackChunkName: "Movie" */ '../views/Movie.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-movie',
    name: 'AddMovie',
    component: () =>
      import(/* webpackChunkName: "AddMovie" */ '../views/AddMovie.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  const isAdmin = localStorage.getItem('role') == 'Admin' ? true : false;

  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return {
      path: '/login'
    };
  }

  if (
    (to.meta.forVisitor && store.getters.isLoggedIn) ||
    (!to.meta.forVisitor &&
      store.getters.isLoggedIn &&
      !isAdmin &&
      to.meta.forAdmin)
  ) {
    return {
      path: '/home'
    };
  }

  return true;
});

export default router;
