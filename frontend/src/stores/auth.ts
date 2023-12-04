import { ref } from 'vue';
import { defineStore } from 'pinia';
import http from '@/utils/http';
import type { User } from '@/model/backend/entity/UserEntity';
import type { GetUserResponse } from '@/model/backend/api/User';

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(localStorage.getItem('token') !== null);
  const user = ref<User>();

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
    const res = await http.authGet<GetUserResponse>('/user');
    user.value = res.data;
  }

  return { isLogin, user, login, logout, loadUser };
});
