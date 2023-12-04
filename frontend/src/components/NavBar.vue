<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { googleTokenLogin } from 'vue3-google-login';

const authStore = useAuthStore();
const { isLogin, user } = storeToRefs(authStore);

if (isLogin.value) authStore.loadUser();

const login = () => {
  googleTokenLogin().then((response) => authStore.login(response.access_token));
};
</script>

<template>
  <div class="flex items-center justify-between bg-red-200 px-4 py-2">
    <div class="flex gap-4">
      <RouterLink to="/">線上解牌</RouterLink>
      <RouterLink to="/daily">每日塔羅</RouterLink>
    </div>
    <div>
      <button v-if="!isLogin" class="rounded-xl bg-yellow-200 px-2 py-1" @click="login">
        以 Google 帳號登入
      </button>
    </div>
    <div class="flex items-center gap-2">
      <div>餘額: {{ user?.balance }}</div>
      <button v-if="isLogin" class="rounded-xl bg-yellow-200 px-2 py-1" @click="authStore.logout">
        登出
      </button>
    </div>
  </div>
</template>
