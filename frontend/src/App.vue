<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <div class="mx-4 mb-10 mt-4">
    <RouterView />
  </div>
</template>
