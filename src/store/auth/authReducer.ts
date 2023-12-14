import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { authApi } from './authApi';
import { UserProfileResponse } from './lib/types';

type AuthState = {
  user: UserProfileResponse | null;
};

const initialState: AuthState = {
  user: null,
};

const { getProfile, signUp, signIn, verifyEmail } = authApi.endpoints;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    updateUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    delUserFromState: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(signUp.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(getProfile.matchRejected, (state) => {
      state.user = null;
    });
    builder.addMatcher(
      isAnyOf(getProfile.matchFulfilled, verifyEmail.matchFulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { logoutUser, updateUserState, delUserFromState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
