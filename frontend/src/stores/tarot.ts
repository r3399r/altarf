import { defineStore } from 'pinia';
import http from '@/utils/http';
import { reactive, ref } from 'vue';
import type {
  GetTarotIdResponse,
  PostTarotRequest,
  PostTarotResponse,
} from '@/model/backend/api/Tarot';
import type { Tarot } from '@/model/backend/entity/TarotEntity';
import { TarotType } from '@/model/backend/constant/Spread';

export const useTarotStore = defineStore('tarot', () => {
  const justSent = ref(false);
  const tarotMap = reactive(new Map<string, Tarot>());
  const stat = ref<{
    avg: number | null;
    std: number | null;
  }>();

  const getTarot = async (id: string, skip: boolean = true) => {
    const returnCached = tarotMap.get(id) !== undefined && skip === true && justSent.value === true;
    if (justSent.value === true) justSent.value = false;
    if (returnCached) return tarotMap.get(id);

    const res = await http.get<GetTarotIdResponse>(`/tarot/${id}`);
    const { statistics, ...tarot } = res.data;
    tarotMap.set(res.data.id, tarot);
    if (statistics !== undefined) stat.value = statistics;

    return tarot;
  };

  const aiSolve = async (
    spread: string,
    description: string,
    card: { id: string; isReversed: boolean }[],
  ) => {
    const res = await http.authPost<PostTarotResponse, PostTarotRequest>('/tarot', {
      data: {
        spread,
        description,
        type: TarotType.Ai,
        card: card.map((v) => ({ id: v.id, side: v.isReversed ? 'reversed' : 'upright' })),
      },
    });
    const { statistics, ...tarot } = res.data;
    tarotMap.set(res.data.id, tarot);
    if (statistics !== undefined) stat.value = statistics;
    return res.data.id;
  };

  return { justSent, tarotMap, stat, getTarot, aiSolve };
});
