import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type restorePassword = {
  email: string | null;
  code: string | null;
  newPassword: string | null;
};

const initialState = { email: null, code: null, newPassword: null };

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
    setNewPassword: (
      state: restorePassword,
      { payload: { newPassword } }: PayloadAction<{ newPassword: string }>
    ) => {
      state.newPassword = newPassword;
    },
  },
});

export const { setEmail, setCode, setNewPassword } = restorePasswordSlice.actions;

export default restorePasswordSlice.reducer;
