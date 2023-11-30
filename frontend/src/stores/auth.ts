import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false);
  function login(token: string) {
    localStorage.setItem('token', token);
    isLogin.value = true;
  }
  function logout() {
    localStorage.removeItem('token');
    isLogin.value = false;
  }

  return { isLogin, login, logout };
});
