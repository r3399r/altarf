<script setup lang="ts">
import type { Tarot } from '@/model/backend/entity/TarotEntity';
import { TAROT_SPREADS } from '@/model/backend/constant/Spread';
import { useTarotStore } from '@/stores/tarot';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tarotStore = useTarotStore();
const { stat } = storeToRefs(tarotStore);
const tarot = ref<Tarot>();
const timeout = ref<number>(stat.value?.avg ?? 20000);

tarotStore.getTarot(route.params.id as string).then((res) => {
  tarot.value = res;
});
const timer = setInterval(() => {
  tarotStore.getTarot(route.params.id as string, false).then((res) => {
    tarot.value = res;
  });
}, timeout.value);

watch(tarot, () => {
  if (tarot.value?.response) clearInterval(timer);
});
</script>

<template>
  <div>hello {{ $route.params.id }}</div>
  <div>牌陣: {{ TAROT_SPREADS.find((v) => v.id === tarot?.spread) }}</div>
</template>
