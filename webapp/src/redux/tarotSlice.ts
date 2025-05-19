import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TarotCard } from 'src/model/backend/entity/TarotCardEntity';
import { CustomTarotSpread } from 'src/model/backend/Tarot';
import { PickedCard } from 'src/model/Card';

export type TarotState = {
  spreadList: CustomTarotSpread[] | null;
  cardList: TarotCard[] | null;
  pickedSpread: CustomTarotSpread | null;
  pickedCardList: PickedCard[] | null;
  question: string | null;
};

const initialState: TarotState = {
  spreadList: null,
  cardList: null,
  pickedSpread: null,
  pickedCardList: null,
  question: null,
};

export const tarotSlice = createSlice({
  name: 'tarot',
  initialState,
  reducers: {
    setSpreadList: (state: TarotState, action: PayloadAction<CustomTarotSpread[]>) => {
      state.spreadList = action.payload;
    },
    setCardList: (state: TarotState, action: PayloadAction<TarotCard[]>) => {
      state.cardList = action.payload;
    },
    setPickedSpread: (state: TarotState, action: PayloadAction<CustomTarotSpread>) => {
      state.pickedSpread = action.payload;
    },
    setPickedCardList: (state: TarotState, action: PayloadAction<PickedCard[]>) => {
      state.pickedCardList = action.payload;
    },
    clearPickedCardList: (state: TarotState) => {
      state.pickedCardList = null;
    },
    setQuestion: (state: TarotState, action: PayloadAction<string>) => {
      state.question = action.payload;
    },
    clearQuestion: (state: TarotState) => {
      state.pickedSpread = null;
      state.question = null;
    },
  },
});

export const {
  setSpreadList,
  setCardList,
  setPickedSpread,
  setPickedCardList,
  clearPickedCardList,
  setQuestion,
  clearQuestion,
} = tarotSlice.actions;

export default tarotSlice.reducer;
