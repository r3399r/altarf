import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  workload: number;
  isLogin: boolean;
  email: string | null;
  balance: number | null;
  openErrorModal: boolean;
  errorMessage: string;
};

const initialState: UiState = {
  workload: 0,
  isLogin: !!localStorage.getItem('refreshToken'),
  email: null,
  balance: null,
  openErrorModal: false,
  errorMessage: '',
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
    setIsLogin: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setEmail: (state: UiState, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setBalance: (state: UiState, action: PayloadAction<number | null>) => {
      state.balance = action.payload;
    },
    setErrorMessage: (state: UiState, action: PayloadAction<string>) => {
      state.openErrorModal = true;
      state.errorMessage = action.payload;
    },
    dismissErrorModal: (state: UiState) => {
      state.openErrorModal = false;
      state.errorMessage = '';
    },
  },
});

export const {
  startWaiting,
  finishWaiting,
  setIsLogin,
  setEmail,
  setBalance,
  setErrorMessage,
  dismissErrorModal,
} = uiSlice.actions;

export default uiSlice.reducer;
