import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TarotCard } from 'src/model/backend/entity/TarotCardEntity';
import { Spread } from 'src/model/backend/Tarot';

export type TarotState = {
  spreadList: Spread[] | null;
  cardList: TarotCard[] | null;
  pickedSpread: Spread | null;
  question: string | null;
};

const initialState: TarotState = {
  spreadList: null,
  cardList: null,
  pickedSpread: null,
  question: null,
};

export const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    setSpreadList: (state: TarotState, action: PayloadAction<Spread[]>) => {
      state.spreadList = action.payload;
    },
    setCardList: (state: TarotState, action: PayloadAction<TarotCard[]>) => {
      state.cardList = action.payload;
    },
    setPickedSpread: (state: TarotState, action: PayloadAction<Spread>) => {
      state.pickedSpread = action.payload;
    },
    setQuestion: (state: TarotState, action: PayloadAction<string>) => {
      state.question = action.payload;
    },
  },
});

export const { setSpreadList, setCardList, setPickedSpread, setQuestion } = tarotSlice.actions;

export default tarotSlice.reducer;
