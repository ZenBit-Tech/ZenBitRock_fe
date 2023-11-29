import { isAnyOf, type TypedStartListening } from '@reduxjs/toolkit';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { StorageKey } from 'enums';
import { AppDispatch, RootState } from 'store';
import { authApi } from 'store/auth';

const tokenMiddleware = createListenerMiddleware();

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening = tokenMiddleware.startListening as AppStartListening;

const { signIn, signUp } = authApi.endpoints;

startAppListening({
  matcher: isAnyOf(signIn.matchFulfilled, signUp.matchFulfilled),
  effect: (action) => {
    const { token } = action.payload;

    localStorage.setItem(StorageKey.TOKEN, token);
  },
});

export { tokenMiddleware };
