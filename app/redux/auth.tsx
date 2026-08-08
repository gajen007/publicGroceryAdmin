import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  value: boolean;
}

interface RootState {
  isLoggedIn: AuthState;
}

export const auth = createSlice({
  name: 'isLoggedIn',
  initialState: {
    value: false,
  } as AuthState, // Type assertion for initial state
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const selectLoginStatus = (state: RootState) => state.isLoggedIn?.value;

export const { login, logout } = auth.actions;

export default auth.reducer;