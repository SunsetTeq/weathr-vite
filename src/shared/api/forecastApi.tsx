import { baseApi } from '@api/base/baseApi';
import { DAILY_FIELDS } from '@constants/forecastConstants';
import type {
  ForecastArgs,
  ForecastDailyApiResponse,
} from '@type/forecastTypes';

export const forecastApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDailyForecast: build.query<ForecastDailyApiResponse, ForecastArgs>({
      query: ({ lat, lon, days = 7, timezone = 'auto' }) => ({
        url: 'https://api.open-meteo.com/v1/forecast',
        method: 'GET',
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
          forecast_days: Math.min(Math.max(days, 1), 16),
          daily: DAILY_FIELDS.join(','),
        },
      }),
    }),
  }),
});

export const { useGetDailyForecastQuery, useLazyGetDailyForecastQuery } =
  forecastApi;
