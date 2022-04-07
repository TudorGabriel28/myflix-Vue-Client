import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import HomePage from '../views/HomePage.vue';
import AccountActivation from '../views/AccountActivation.vue';
import PageNotFound from '../views/PageNotFound.vue';
import LandingPage from '../views/LandingPage.vue';
import MovieList from '../views/MovieList.vue';
import AddMovie from '../views/AddMovie.vue';
import Movie from '../views/Movie.vue';
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
    component: LandingPage,
    meta: { forVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { forVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { forVisitor: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { forVisitor: true }
  },
  {
    path: '/reset-password/:id/:token',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/verify-email/:token',
    name: 'AccountActivation',
    component: AccountActivation
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
    component: MovieList,
    meta: { requiresAuth: true }
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-movie',
    name: 'AddMovie',
    component: AddMovie,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFound
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
