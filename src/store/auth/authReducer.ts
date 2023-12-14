import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { UserApi } from 'store/api/userApi';
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
const { deleteUser } = UserApi.endpoints;

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
  },
  extraReducers: (builder) => {
    builder.addMatcher(signUp.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(signIn.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addMatcher(isAnyOf(getProfile.matchRejected, deleteUser.matchFulfilled), (state) => {
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

export const { logoutUser, updateUserState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
