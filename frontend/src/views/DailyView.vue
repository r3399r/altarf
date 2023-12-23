<script lang="ts" setup>
import { getCardImageUrl } from '@/utils/image';
import { useDailyStore } from '@/stores/daily';
import { storeToRefs } from 'pinia';
import { TAROT_CARDS } from '@/model/backend/constant/Card';

const dailyStore = useDailyStore();
const { lastResult, canDraw } = storeToRefs(dailyStore);

const draw = () => {
  const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
  const isReversed = Math.random() < 0.5;
  const options = isReversed ? card.interpretation.reversed : card.interpretation.upright;
  dailyStore.setLastResult({
    id: card.id,
    name: card.name,
    interpretation: options[Math.floor(Math.random() * options.length)],
    isReversed,
    date: new Date().toISOString(),
  });
};
</script>

<template>
  <h1 class="text-2xl font-bold">每日一抽</h1>
  <button v-if="canDraw" class="rounded-xl bg-yellow-200 px-2 py-1" @click="draw()">抽牌</button>
  <div v-if="!canDraw && lastResult">
    <div>{{ lastResult.name }}</div>
    <img
      :src="getCardImageUrl(lastResult.id)"
      :alt="lastResult.name"
      :class="[{ 'rotate-180': lastResult.isReversed }, 'w-40']"
    />
    <div class="whitespace-pre-line">{{ lastResult.interpretation }}</div>
  </div>
</template>
