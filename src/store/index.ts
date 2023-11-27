import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi, authReducer } from './auth';
import { VerificationApi } from './api/verificationApi';
import { RestorePasswordApi } from './api/restorePasswordApi';

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
      .concat(RestorePasswordApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
