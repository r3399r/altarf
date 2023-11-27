<script lang="ts" setup>
import { ref } from 'vue';
import { TAROT_CARDS, type Card } from '@/model/Card';

const selected = ref<Card & { isReversed: boolean }>();

const draw = () => {
  const n = Math.floor(Math.random() * TAROT_CARDS.length);
  selected.value = { ...TAROT_CARDS[n], isReversed: Math.random() < 0.5 };
};

const imageUrl = (src?: string) => new URL(src ?? '', import.meta.url).href;

const getInterpretation = () => {
  if (!selected.value) return;
  const options = selected.value.isReversed
    ? selected.value.interpretation.reversed
    : selected.value.interpretation.upright;
  const n = Math.floor(Math.random() * options.length);
  return options[n];
};
</script>

<template>
  <h1 class="text-2xl font-bold">每日一抽</h1>
  <button class="rounded-xl bg-yellow-200 px-2 py-1" @click="draw()">抽牌</button>
  <div v-if="selected">
    <div>{{ selected.name }}</div>
    <img
      :src="imageUrl(selected.image)"
      :alt="selected.name"
      :class="[{ 'rotate-180': selected.isReversed }, 'w-40']"
    />
    <div class="whitespace-pre-line">{{ getInterpretation() }}</div>
  </div>
</template>
