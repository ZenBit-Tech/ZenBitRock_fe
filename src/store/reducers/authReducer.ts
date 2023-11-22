import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

type AuthState = {
  email: string | null;
  token: string | null;
  id: string | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: { id: null, email: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { id, email, token } }: PayloadAction<{ id: string; email: string; token: string }>
    ) => {
      state.id = id;
      state.email = email;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
