import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { authApi } from './authApi';

type AuthState = {
  email: string | null;
  token: string | null;
  id: string | null;
};

const { getProfile } = authApi.endpoints;

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
  extraReducers: (builder) => {
    builder.addMatcher(getProfile.matchFulfilled, (state, action) => {
      const user = action.payload;

      state.id = user.id;
      state.email = user.email;
      state.token = user.token;
    });
    builder.addMatcher(getProfile.matchRejected, (state) => {
      state.id = null;
      state.email = null;
      state.token = null;
    });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
