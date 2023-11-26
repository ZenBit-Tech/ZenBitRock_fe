import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type restorePassword = {
  email: string | null;
  code: string | null;
};

const initialState = { email: null, code: null };

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
  },
});

export const { setEmail, setCode } = restorePasswordSlice.actions;

export default restorePasswordSlice.reducer;
