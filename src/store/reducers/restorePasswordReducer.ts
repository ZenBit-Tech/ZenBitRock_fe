import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type restorePassword = {
  email: string | null;
  code: string | null;
  password: string | null;
};

const initialState = { email: null, code: null, password: null};

export const restorePasswordSlice = createSlice({
  name: 'restorePassword',
  initialState,
  reducers: {
    setEmail: (
      state: restorePassword,
      { payload: { email } }: PayloadAction<{ email: string }>
    ) => {
      state.email = email;
    },
    setCode: (state: restorePassword, { payload: { code } }: PayloadAction<{ code: string }>) => {
      state.code = code;
    },
    setPassword: (state: restorePassword, { payload: { password } }: PayloadAction<{ password: string }>) => {
      state.password = password;
    },
  },
});

export const { setEmail, setCode, setPassword } = restorePasswordSlice.actions;

export default restorePasswordSlice.reducer;
