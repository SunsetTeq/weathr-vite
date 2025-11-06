import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  PrecipitationType,
  SelectedCity,
  TemperatureType,
  WindSpeedType,
} from '@type/settingsTypes';

interface SettingsState {
  selectedCity: SelectedCity | undefined;
  Temperature: TemperatureType;
  WindSpeed: WindSpeedType;
  Precipitation: PrecipitationType;
}

const initialState: SettingsState = {
  selectedCity: undefined,
  Temperature: 'celsius',
  WindSpeed: 'kmh',
  Precipitation: 'mm',
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
    selectTemperature(state, action: PayloadAction<TemperatureType>) {
      state.Temperature = action.payload;
    },
    selectWindSpeed(state, action: PayloadAction<WindSpeedType>) {
      state.WindSpeed = action.payload;
    },
    selectPrecipitation(state, action: PayloadAction<PrecipitationType>) {
      state.Precipitation = action.payload;
    },
  },
});

export const {
  selectCity,
  clearCity,
  selectTemperature,
  selectWindSpeed,
  selectPrecipitation,
} = settingsSlice.actions;
export default settingsSlice.reducer;
