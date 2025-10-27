// src/store/AppStore.ts
import { configureStore, type Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AppReducer, type AppReducerType, } from './AppReducer';
import { baseApi } from '@api/base/baseApi';

export function makeStore() {
  const rootReducer = (state: AppReducerType | undefined, action: Action) => {
    // Если будет авторизация
    if (action.type === 'auth/logOut') {
      return AppReducer(undefined, action);
    }
    return AppReducer(state, action);
  };

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    devTools: import.meta.env?.MODE !== 'production',
  });

  setupListeners(store.dispatch);
  return store;
}

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;