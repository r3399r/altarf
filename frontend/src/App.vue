<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex gap-4 bg-red-200 px-4 py-2">
    <RouterLink to="/">解牌</RouterLink>
    <RouterLink to="/daily">每日一抽</RouterLink>
  </div>
  <div class="mx-4 mb-10 mt-4">
    <RouterView />
  </div>
</template>
