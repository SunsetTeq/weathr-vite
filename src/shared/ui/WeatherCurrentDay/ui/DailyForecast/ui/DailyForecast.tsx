import { useAppSelector } from '@slices/handlers/useAppSelector';
import { Card } from './Card';
import { DAILY_DEFAULT_FIELDS } from '@constants/forecastConstants';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetForecastQuery } from '@api/forecastApi';
import { useMemo } from 'react';
import { EmptyCard } from './EmptyCard';
import { emptyDailyList } from '../config/constants';

export const DailyForecast = () => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);

  const temp = useAppSelector((state) => state.settings.Temperature);
  const precSpeed = useAppSelector((state) => state.settings.Precipitation);
  const wind = useAppSelector((state) => state.settings.WindSpeed);

  const args = useMemo(() => {
    if (!selectedCity) return skipToken;
    return {
      lat: selectedCity.latitude,
      lon: selectedCity.longitude,
      forecast_days: 7,
      temperature_unit: temp,
      wind_speed_unit: wind,
      precipitation_unit: precSpeed,
      daily: [...DAILY_DEFAULT_FIELDS],
    };
  }, [selectedCity, temp, wind, precSpeed]);

  const { data, isLoading, isFetching } = useGetForecastQuery(args, {
    refetchOnMountOrArgChange: true,
  });

  const rows = useMemo(() => {
    const d = data?.daily;
    if (!d) return [];
    const n = Math.min(7, d.time?.length ?? 0);
    return Array.from({ length: n }, (_, i) => ({
      date: d.time?.[i] ?? '',
      tMax: d.temperature_2m_max?.[i],
      tMin: d.temperature_2m_min?.[i],
      code: d.weather_code?.[i],
    }));
  }, [data]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h3>Daily Forecast</h3>
      <div className="flex flex-wrap gap-4">
        {!isLoading && !isFetching
          ? rows.map((el, idx) => <Card data={el} key={idx} />)
          : emptyDailyList.map((_, idx) => <EmptyCard key={idx} />)}
      </div>
    </div>
  );
};
