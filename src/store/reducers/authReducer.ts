import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

type AuthState = {
  email: string | null;
  token: string | null;
  id: string | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { email, token } }: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = email;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
