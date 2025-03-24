import { createSlice } from '@reduxjs/toolkit';

export type UiState = {
  workload: number;
  isLogin: boolean;
};

const initialState: UiState = {
  workload: 0,
  isLogin: !!localStorage.getItem('refreshToken'),
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
  },
});

export const { startWaiting, finishWaiting, setIsLogin } = uiSlice.actions;

export default uiSlice.reducer;
