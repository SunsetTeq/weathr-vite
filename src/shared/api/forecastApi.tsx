import { baseApi } from '@api/base/baseApi';
import type {
  ForecastQueryArgs,
  ForecastAnyApiResponse,
} from '@type/forecastTypes';

function clampDays(n?: number) {
  if (typeof n !== 'number') return undefined;
  return Math.min(Math.max(n, 1), 16);
}

export const forecastApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getForecast: build.query<ForecastAnyApiResponse, ForecastQueryArgs>({
      query: ({
        lat,
        lon,
        timezone = 'auto',
        forecast_days,
        start_date,
        end_date,
        daily,
        current,
        hourly,
      }) => {
        const params: Record<string, string | number> = {
          latitude: lat,
          longitude: lon,
          timezone,
        };

        const days = clampDays(forecast_days);
        if (days) params.forecast_days = days;

        if (start_date) params.start_date = start_date;
        if (end_date) params.end_date = end_date;

        if (daily?.length) params.daily = daily.join(',');
        if (current?.length) params.current = current.join(',');
        if (hourly?.length) params.hourly = hourly.join(',');

        return {
          url: 'https://api.open-meteo.com/v1/forecast',
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const { useGetForecastQuery } = forecastApi;
