<script lang="ts" setup>
import { TAROT_CARDS } from '@/model/Card';
import { TAROT_SPREADS } from '@/model/Spread';
import { computed, ref } from 'vue';
import { shuffle as shuffleArray } from '@/utils/array';
import { sleep } from '@/utils/timer';
import TheTransitionGroup from '@/components/TheTransitionGroup.vue';
import { getImageUrl } from '@/utils/image';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

type Card = {
  id: string;
  name: string;
  image: string;
  isReversed: boolean | null;
};
const authStore = useAuthStore();
const { isLogin } = storeToRefs(authStore);

const step = ref(3);
const spread = ref('');
const description = ref('');
const count = computed(() => TAROT_SPREADS.find((v) => v.name === spread.value)?.count);

const shuffled = ref<Card[]>(
  shuffleArray(
    TAROT_CARDS.map((v) => ({ id: v.id, name: v.name, image: v.image, isReversed: null })),
  ),
);
const shuffle = async () => {
  shuffled.value = shuffleArray(shuffled.value);
  for (let i = 0; i < 4; i++) {
    await sleep(400);
    shuffled.value = shuffleArray(shuffled.value);
  }
};
const selected = ref<Card[]>([]);
const onSelect = (card: Card) => {
  const isReversed = Math.random() < 0.5;
  if (selected.value.find((v) => v.id === card.id))
    selected.value = selected.value.filter((v) => v.id !== card.id);
  else {
    if (selected.value.length === count.value) return;
    selected.value.push({ ...card, isReversed });
  }
};
</script>

<template>
  <h1 class="text-2xl font-bold">解牌</h1>
  <div>占卜前請先仔細閱讀:</div>
  <div class="mb-2 border border-black py-2 pl-6 pr-2">
    <ul class="list-outside list-disc">
      <li>
        <b>開放的心態:</b><br />
        <div>
          保持一個開放、接受的心態。不要預設結果，而是允許塔羅牌提供你需要的信息。避免對特定結果有太多期望，這樣能夠更好地接受占卜的結果。
        </div>
      </li>
      <li>
        <b>問題的明確性:</b><br />
        <div>
          在抽牌之前，確保你的問題是明確而具體的。清晰的問題有助於牌陣提供更有意義的回答。避免模糊或開放式的問題，而是專注於特定的問題。
        </div>
      </li>
      <li>
        <b>冥想和專注:</b><br />
        <div>
          進行一些簡短的冥想，平靜你的思緒。專注於你想要得到答案的問題，並讓自己處於一個冷靜的狀態。
        </div>
      </li>
      <li>
        <b>自主權:</b><br />
        <div>
          牌陣提供的只是可能的未來和建議，最終的決定還在於你自己。塔羅牌是一種工具，而不是命運的定數。
        </div>
      </li>
      <li>
        <b>避免問的問題:</b><br />
        <div>死亡日期、法律事務、健康診斷、過於具體的時間、過於敏感的主題</div>
      </li>
    </ul>
  </div>
  <div>牌陣的選擇:</div>
  <div class="border border-black py-2 pl-6 pr-2">
    <ul class="list-outside list-disc">
      <li v-for="v of TAROT_SPREADS" :key="v.id">
        <b>{{ v.name }}:</b><span class="pl-2">{{ v.description }}</span>
      </li>
    </ul>
  </div>
  <div>
    選擇牌陣:
    <select v-model="spread" :disabled="step > 1">
      <option disabled value>請選擇</option>
      <option v-for="v of TAROT_SPREADS" :key="v.id">{{ v.name }}</option>
    </select>
  </div>
  <div>敘述你的問題:(50字以內)</div>
  <div>
    <textarea
      v-model="description"
      class="border border-gray-700"
      maxlength="50"
      :disabled="step > 1"
    ></textarea>
  </div>
  <div v-if="step === 1">
    <div>準備之後會鎖定牌陣及問題</div>
    <button
      class="rounded-xl bg-yellow-200 px-2 py-1"
      @click="step = 2"
      :disabled="spread.length === 0 || description.length === 0"
    >
      我準備好抽牌了
    </button>
  </div>
  <div v-if="step === 2">
    <button class="rounded-xl bg-yellow-200 px-2 py-1" @click="shuffle">洗牌</button>
    <div>請抽選 {{ count }} 張牌</div>
    <TheTransitionGroup tag="div" class="flex flex-wrap gap-2">
      <div
        v-for="v of shuffled"
        :key="v.id"
        class="h-14 w-10 cursor-pointer border border-black"
        @click="onSelect(v)"
      >
        {{
          selected.find((o) => o.id === v.id) ? selected.findIndex((o) => o.id === v.id) + 1 : ''
        }}
      </div>
    </TheTransitionGroup>
    <button
      class="rounded-xl bg-yellow-200 px-2 py-1"
      @click="step = 3"
      :disabled="count !== selected.length"
    >
      我抽好了，翻牌
    </button>
  </div>
  <div v-if="step === 3">
    <div class="flex gap-2">
      <div v-for="(v, idx) of selected" :key="v.id" class="flex flex-col items-center">
        <div>{{ idx + 1 }}</div>
        <img
          :src="getImageUrl(v.image)"
          :alt="v.name"
          :class="[{ 'rotate-180': v.isReversed }, 'w-20']"
        />
      </div>
    </div>
    <div>
      <div v-if="!isLogin">請先登入才能進行解牌</div>
      <div>
        <button class="rounded-xl bg-yellow-200 px-2 py-1" :disabled="!isLogin">AI解牌</button> 每次
        xx 元。免費額度：每月 {{ QUOTA }} 次，每 24 小時 1 次
      </div>
      <div>
        <button class="rounded-xl bg-yellow-200 px-2 py-1" :disabled="!isLogin">
          真人語音解牌
        </button>
        每次 xx 元
      </div>
      <div>
        <button class="rounded-xl bg-yellow-200 px-2 py-1" :disabled="!isLogin">
          真人視訊解牌
        </button>
        每次 xx 元
      </div>
    </div>
  </div>
</template>
