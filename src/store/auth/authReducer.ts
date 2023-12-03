import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { authApi } from './authApi';
import { UserProfileResponse } from './lib/types';

type AuthState = {
  user: UserProfileResponse | null;
};

const initialState: AuthState = {
  user: null,
};

const { getProfile, signUp, signIn } = authApi.endpoints;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(signUp.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(getProfile.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(getProfile.matchRejected, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
