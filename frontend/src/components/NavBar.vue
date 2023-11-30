<script setup lang="ts">
import { googleTokenLogin } from 'vue3-google-login';

const login = () => {
  googleTokenLogin().then((response) => {
    console.log('Handle the response', response);
  });
};
</script>

<template>
  <div class="flex items-center justify-between bg-red-200 px-4 py-2">
    <div class="flex gap-4">
      <RouterLink to="/">解牌</RouterLink>
      <RouterLink to="/daily">每日一抽</RouterLink>
    </div>
    <button class="rounded-xl bg-yellow-200 px-2 py-1" @click="login">以 Google 帳號登入</button>
  </div>
</template>
