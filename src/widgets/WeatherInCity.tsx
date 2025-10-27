import { useGetDailyForecastQuery } from '@api/forecastApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@slices/handlers/useAppSelector';

export const WeatherInCity = () => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);
  const forecastArgs = selectedCity
    ? {
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
        days: 7,
        timezone: 'auto' as const,
      }
    : skipToken;
  const { data: forecast } = useGetDailyForecastQuery(forecastArgs);

  return (
    <div>
      <div>{selectedCity?.name ?? 'Не выбран город'}</div>
      <div>{forecast?.daily.precipitation_sum}</div>
      <div>{forecast?.daily.temperature_2m_max}</div>
      <div>{forecast?.daily.temperature_2m_min}</div>
      <div>{forecast?.daily.time}</div>
      <div>{forecast?.daily.weather_code}</div>
    </div>
  );
};
