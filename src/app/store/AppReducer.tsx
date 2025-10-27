import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@api/base/baseApi';
import { settingsSlice } from '@slices/settingsSlice';

export const AppReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
});

export type AppReducerType = ReturnType<typeof AppReducer>;
