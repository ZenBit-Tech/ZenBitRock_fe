import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi, authReducer } from './auth';
import { VerificationApi } from './api/verificationApi';
import { tokenMiddleware } from './middlewares/token-middleware';

const persistConfig = {
  key: 'store',
  whitelist: [],
  storage,
};

const reducers = combineReducers({
  [VerificationApi.reducerPath]: VerificationApi.reducer,
  authSlice: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(VerificationApi.middleware)
      .concat(authApi.middleware)
      .concat(tokenMiddleware.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
