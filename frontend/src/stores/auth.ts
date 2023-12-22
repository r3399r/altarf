import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/utils/http';
import type { GetUserResponse } from '@/model/backend/api/User';

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(localStorage.getItem('token') !== null);
  const user = ref<GetUserResponse>();

  function login(token: string) {
    localStorage.setItem('token', token);
    isLogin.value = true;
    loadUser();
  }
  function logout() {
    localStorage.removeItem('token');
    isLogin.value = false;
  }
  async function loadUser() {
    try {
      const res = await http.authGet<GetUserResponse>('/user');
      user.value = res.data;
    } catch {
      logout();
    }
  }

  return { isLogin, user, login, logout, loadUser };
});
