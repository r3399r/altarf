<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  tag?: string;
  class?: string;
}>();
const classProps = ref(props.class ?? '');
</script>

<template>
  <TransitionGroup name="fade" :tag="tag" :class="classProps">
    <slot></slot>
  </TransitionGroup>
</template>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
