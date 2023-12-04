import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi, authReducer } from './auth';
import { VerificationApi } from './api/verificationApi';
import { tokenMiddleware } from './middlewares/token-middleware';
import { RestorePasswordApi } from './api/restorePasswordApi';
import restorePasswordReducer from './reducers/restorePasswordReducer';
import { QobrixApi } from './api/qobrixApi';
import { GetUserApi } from './api/getUserApi';
import { ResetPasswordApi } from './api/resetPasswordApi';

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
  [GetUserApi.reducerPath]: GetUserApi.reducer,
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
      .concat(GetUserApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
