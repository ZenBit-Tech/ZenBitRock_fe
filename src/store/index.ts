import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './reducers/testReducer';
import { VerificationApi } from './api/verificationApi';
import { RestoreEmailApi } from './api/restoreEmailApi';
import { authApi } from './authApi';
import authReducer from './reducers/authReducer';

const persistConfig = {
  key: 'store',
  whitelist: [],
  storage,
};

const reducers = combineReducers({
  counter: counterReducer,
  authSlice: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [VerificationApi.reducerPath]: VerificationApi.reducer,
  [RestoreEmailApi.reducerPath]: RestoreEmailApi.reducer,
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
      .concat(RestoreEmailApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
