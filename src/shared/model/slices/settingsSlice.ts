import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SelectedCity } from '@type/settingsTypes';

interface SettingsState {
  selectedCity: SelectedCity | undefined;
}

const initialState: SettingsState = {
  selectedCity: undefined,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    selectCity(state, action: PayloadAction<SelectedCity>) {
      state.selectedCity = action.payload;
    },
    clearCity(state) {
      state.selectedCity = undefined;
    },
  },
});

export const { selectCity, clearCity } = settingsSlice.actions;
export default settingsSlice.reducer;
