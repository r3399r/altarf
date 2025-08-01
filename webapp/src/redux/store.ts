import { configureStore, PayloadAction, Store } from '@reduxjs/toolkit';
import tarotReducer, { TarotState } from './tarotSlice';
import uiReducer, { UiState } from './uiSlice';

export type RootState = {
  tarot: TarotState;
  ui: UiState;
};

let store: Store<RootState>;

export const configStore = () => {
  store = configureStore({
    reducer: {
      tarot: tarotReducer,
      ui: uiReducer,
    },
  });

  return store;
};

export const getState = () => store.getState();

export const dispatch = <T>(action: PayloadAction<T>) => store.dispatch(action);
