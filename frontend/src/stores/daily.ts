import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { isBefore, startOfToday } from 'date-fns';

type Result = {
  id: string;
  name: string;
  image: string;
  interpretation: string;
  isReversed: boolean;
  date: string;
};

export const useDailyStore = defineStore('daily', () => {
  const storageItem = localStorage.getItem('last-result');
  const lastResult = ref(storageItem ? (JSON.parse(storageItem) as Result) : null);

  const canDraw = computed(() =>
    lastResult.value === null ? true : isBefore(new Date(lastResult.value.date), startOfToday()),
  );

  function setLastResult(input: Result) {
    localStorage.setItem('last-result', JSON.stringify(input));
    lastResult.value = input;
  }

  return { lastResult, canDraw, setLastResult };
});
