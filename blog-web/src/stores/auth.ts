import { defineStore } from 'pinia';
import { AUTH_TOKEN_KEY, getStoredUsername, loginRequest } from '../api/blog';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(AUTH_TOKEN_KEY) ?? '',
    username: getStoredUsername(),
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.token),
  },

  actions: {
    async login(username: string, password: string) {
      const data = await loginRequest(username, password);
      this.token = data.token;
      this.username = data.username;
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem('blog_admin_name', data.username);
    },

    logout() {
      this.token = '';
      this.username = '';
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('blog_admin_name');
    },
  },
});
