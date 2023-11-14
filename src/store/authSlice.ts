import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IUserData {
  email: string;
  password: string;
}

interface IUserDataResponse {
  user: {
    email: string;
    password?: string;
    id: number;
  };
  token: string;
}

interface AuthState {
  user: IUserDataResponse | null;
}

const initialAuthState: AuthState = {
  user: null,
};

export const loginAsyncAct = createAsyncThunk(
  'auth/loginAsyncAct',
  async (authData: IUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post<IUserDataResponse>(
        'http://localhost:3001/api/auth/login',
        authData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsyncAct.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
