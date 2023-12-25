<script setup lang="ts">
import type { Tarot } from '@/model/backend/entity/TarotEntity';
import { TAROT_SPREADS } from '@/model/backend/constant/Spread';
import { useTarotStore } from '@/stores/tarot';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCardImageUrl } from '@/utils/image';
import { addMilliseconds } from 'date-fns';

const router = useRouter();
const route = useRoute();
const tarotStore = useTarotStore();
const { stat } = storeToRefs(tarotStore);
const tarot = ref<Tarot>();
const needHelp = ref<boolean>(false);
let timer: number;

tarotStore
  .getTarot(route.params.id as string)
  .then((res) => {
    tarot.value = res;
  })
  .catch(() => router.push('/tarot'));

watch([tarot, stat], () => {
  if (!tarot.value?.response && timer === undefined) {
    console.log('hi');
    timer = setInterval(() => {
      tarotStore.getTarot(route.params.id as string, false).then((res) => {
        tarot.value = res;
      });
    }, 10000);
  }
  if (tarot.value?.response) clearInterval(timer);
  if (tarot.value && stat.value && stat.value.avg && stat.value.std) {
    const { avg, std } = stat.value;
    if (addMilliseconds(new Date(tarot.value.createdAt ?? ''), avg + 4 * std)) {
      clearInterval(timer);
      needHelp.value = true;
    }
  }
});
</script>

<template>
  <div>牌陣: {{ TAROT_SPREADS.find((v) => v.id === tarot?.spread)?.name }}</div>
  <div class="flex gap-2" v-if="tarot">
    <div v-for="(v, idx) of tarot.card.split(',')" :key="idx" class="flex flex-col items-center">
      <div>{{ idx + 1 }}</div>
      <img
        :src="getCardImageUrl(v.substring(1))"
        :alt="v.substring(1)"
        :class="[{ 'rotate-180': v.startsWith('-') }, 'w-20']"
      />
    </div>
  </div>
  <div>您的提問: {{ tarot?.description }}</div>
  <div v-if="tarot?.response">
    <div>解牌結果:</div>
    <div class="whitespace-pre-wrap text-blue-700">{{ tarot.response }}</div>
  </div>
  <div v-else-if="!needHelp">解牌中... 請靜候結果，此頁面會自動重新整理</div>
  <div v-else>解牌花費時間過久且尚未有結果，請洽客服人員</div>
</template>
