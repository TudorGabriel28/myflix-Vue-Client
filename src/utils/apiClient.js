import axios from 'axios';
import router from '../router';
import store from '../store';

export const apiClient = axios.create({
  baseURL: 'https://myflixapi.azurewebsites.net/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout');
      router.push({
        name: 'Login',
        params: {
          alert: true,
          alertMessage: 'Your session has expired.',
          alertIcon: 'error'
        }
      });
    }
    return Promise.reject(error);
  }
);
