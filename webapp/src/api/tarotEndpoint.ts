import { GetTaortDailyResponse } from 'src/model/backend/api/Tarot';
import http from 'src/utils/http';

const getTarotDaily = async () => {
  return await http.get<GetTaortDailyResponse>('tarot/daily');
};

export default {
  getTarotDaily,
};
