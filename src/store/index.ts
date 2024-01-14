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
import { ResetPasswordApi } from './api/resetPasswordApi';

import { UserApi } from './api/userApi';
import { LeadApi } from './lead';
import { MessageApi } from './message';
import { ChatApi } from './chat';
import { ContentApi } from './content';

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
  [LeadApi.reducerPath]: LeadApi.reducer,
  [MessageApi.reducerPath]: MessageApi.reducer,
  [ChatApi.reducerPath]: ChatApi.reducer,
  [ContentApi.reducerPath]: ContentApi.reducer,
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
      .concat(UserApi.middleware)
      .concat(LeadApi.middleware)
      .concat(MessageApi.middleware)
      .concat(ChatApi.middleware)
      .concat(ContentApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
