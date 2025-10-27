import { useGetForecastQuery } from '@api/forecastApi';
import { CURRENT_DEFAULT_FIELDS } from '@constants/forecastConstants';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@slices/handlers/useAppSelector';
import { MainCard } from '@ui/MainCard/ui/MainCard';
import { formatDate } from '@utils/formatDate';

export const WeatherInCity = () => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);
  const args = selectedCity
    ? {
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
        current: [...CURRENT_DEFAULT_FIELDS],
      }
    : skipToken;

  const { data } = useGetForecastQuery(args);

  return (
    data && (
      <div>
        <MainCard
          date={formatDate(data?.current?.time as string)}
          temp={String(Math.round(Number(data?.current?.temperature_2m)))}
        />
      </div>
    )
  );
};
