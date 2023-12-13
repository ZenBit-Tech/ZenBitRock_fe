import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { QobrixApi } from './api/qobrixApi';
import { ResetPasswordApi } from './api/resetPasswordApi';
import { RestorePasswordApi } from './api/restorePasswordApi';
import { UserApi } from './api/userApi';
import { VerificationApi } from './api/verificationApi';
import { authApi, authReducer } from './auth';
import { tokenMiddleware } from './middlewares/token-middleware';
import restorePasswordReducer from './reducers/restorePasswordReducer';

const persistConfig = {
  key: 'store',
  whitelist: ['restorePasswordSlice'],
  storage,
};

const reducers = combineReducers({
  authSlice: authReducer,
  restorePasswordSlice: restorePasswordReducer,
  [authApi.reducerPath]: authApi.reducer,
  [VerificationApi.reducerPath]: VerificationApi.reducer,
  [RestorePasswordApi.reducerPath]: RestorePasswordApi.reducer,
  [ResetPasswordApi.reducerPath]: ResetPasswordApi.reducer,
  [QobrixApi.reducerPath]: QobrixApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(VerificationApi.middleware)
      .concat(RestorePasswordApi.middleware)
      .concat(ResetPasswordApi.middleware)
      .concat(tokenMiddleware.middleware)
      .concat(QobrixApi.middleware)
      .concat(UserApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
