<script setup lang="ts">
import type { Tarot } from '@/model/backend/entity/TarotEntity';
import { TAROT_SPREADS } from '@/model/backend/constant/Spread';
import { useTarotStore } from '@/stores/tarot';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { bn } from '@/utils/bignumber';
import { getImageUrl } from '@/utils/image';

const router = useRouter();
const route = useRoute();
const tarotStore = useTarotStore();
const { stat } = storeToRefs(tarotStore);
const tarot = ref<Tarot>();
const timeout = ref<number>(stat.value?.avg ?? 20000);

tarotStore
  .getTarot(route.params.id as string)
  .then((res) => {
    tarot.value = res;
  })
  .catch(() => router.push('/tarot'));
const timer = setTimeout(() => {
  tarotStore.getTarot(route.params.id as string, false).then((res) => {
    tarot.value = res;
  });
}, timeout.value);

watch(tarot, () => {
  if (tarot.value?.response) clearTimeout(timer);
});

const avg = computed(() => (stat.value?.avg ? bn(stat.value.avg) : null));
const std2 = computed(() => (stat.value?.std ? bn(stat.value.std).times(2) : null));
const min = computed(() =>
  avg.value && std2.value ? avg.value.minus(std2.value).div(1000).toFormat(2) : null,
);
const max = computed(() =>
  avg.value && std2.value ? avg.value.plus(std2.value).div(1000).toFormat(2) : null,
);
</script>

<template>
  <div>牌陣: {{ TAROT_SPREADS.find((v) => v.id === tarot?.spread)?.name }}</div>
  <div class="flex gap-2" v-if="tarot">
    <div v-for="(v, idx) of tarot.card.split(',')" :key="idx" class="flex flex-col items-center">
      <div>{{ idx + 1 }}</div>
      <img
        :src="getImageUrl(`../assets/card/${tarot.id}.jpg`)"
        :alt="v.substring(1)"
        :class="[{ 'rotate-180': v.startsWith('-') }, 'w-20']"
      />
    </div>
  </div>
  <div>敘述: {{ tarot?.description }}</div>
  <div v-if="tarot?.response">
    <div>AI 解牌結果:</div>
    <div class="whitespace-pre-wrap text-blue-700">{{ tarot.response }}</div>
  </div>
  <div v-else-if="min && max">解牌中... 95% 的結果會於 {{ min }} ~ {{ max }} 秒完成</div>
  <div v-else>解牌中...</div>
</template>
