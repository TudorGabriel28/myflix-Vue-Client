import { createStore } from 'vuex';
import { apiClient } from '../utils/apiClient';
import { accountService } from '../services/accountService';
import { movieService } from '../services/movieService';
import { wishListService } from '../services/wishListService';
import { watchedListService } from '../services/watchedListService';

const store = createStore({
  state: {
    token: ''
  },
  actions: {
    async loginUser({ commit }, credentials) {
      const response = await accountService.authenticate(credentials);
      localStorage.setItem('token', response.data.jwtToken);
      localStorage.setItem('role', response.data.Role);
      commit('setToken', response.data.jwtToken);

      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.jwtToken}`;
    },

    logout({ commit }) {
      try {
        localStorage.removeItem('token');
        // location.reload();
        commit('setToken', '');
        apiClient.defaults.headers.common['Authorization'] = null;
      } catch (error) {
        console.log(error);
      }
    },

    setToken({ commit }, token) {
      commit('setToken', token);
    },
  },
  mutations: {
    setToken: (state, token) => (state.token = token),
  },
  getters: {
    token(state) {
      return state.token;
    },
    isLoggedIn(state) {
      return !!state.token;
    }
  }
});

export default store;
