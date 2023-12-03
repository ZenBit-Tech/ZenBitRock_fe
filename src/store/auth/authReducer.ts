import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { GetUserApi } from 'store/api/getUserApi';
import { authApi } from './authApi';

type AuthState = {
  email: string | null;
  token: string | null;
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: string | null;
  city: string | null;
  country: string | null;
  agency: string | null;
  description: string | null;
};

const { getProfile } = authApi.endpoints;
const { getUserById } = GetUserApi.endpoints;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null,
    email: null,
    token: null,
    firstName: null,
    lastName: null,
    phone: null,
    role: null,
    city: null,
    country: null,
    agency: null,
    description: null,
  } as AuthState,
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
    builder
      .addMatcher(getProfile.matchRejected, (state) => {
        state.id = null;
        state.email = null;
        state.token = null;
      })
      .addMatcher(getUserById.matchFulfilled, (state, action) => {
        const userData = action.payload;
        
        state.firstName = userData.firstName;
        state.lastName = userData.lastName;
        state.phone = userData.phone;
        state.role = userData.role;
        state.city = userData.city;
        state.country = userData.country;
        state.agency = userData.agency;
        state.description = userData.description;
      })
      .addMatcher(getUserById.matchRejected, (state) => {
        state.id = null;
        state.email = null;
        state.token = null;
        state.firstName = null;
        state.lastName = null;
        state.phone = null;
        state.role = null;
        state.city = null;
        state.country = null;
        state.agency = null;
        state.description = null;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice;
