import { createSlice } from '@reduxjs/toolkit';

export type UiState = {
  workload: number;
  isLogin: boolean;
  email: string | null;
  balance: number | null;
};

const initialState: UiState = {
  workload: 0,
  isLogin: !!localStorage.getItem('refreshToken'),
  email: null,
  balance: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startWaiting: (state: UiState) => {
      state.workload = state.workload + 1;
    },
    finishWaiting: (state: UiState) => {
      state.workload = state.workload - 1;
    },
    setIsLogin: (state: UiState, action) => {
      state.isLogin = action.payload;
    },
    setEmail: (state: UiState, action) => {
      state.email = action.payload;
    },
    setBalance: (state: UiState, action) => {
      state.balance = action.payload;
    },
  },
});

export const { startWaiting, finishWaiting, setIsLogin, setEmail, setBalance } = uiSlice.actions;

export default uiSlice.reducer;
