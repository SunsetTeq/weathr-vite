import { useGetForecastQuery } from '@api/forecastApi';
import { CURRENT_DEFAULT_FIELDS } from '@constants/forecastConstants';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@slices/handlers/useAppSelector';
import { MainCard } from './MainCard/ui/MainCard';
import { formatDate } from '@utils/formatDate';
import { SmallCard } from './SmallCard';
import { DailyForecast } from './DailyForecast';
import { HourlyForecast } from './HourlyForecast';

export const WeatherCurrentDay = () => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);
  const args = selectedCity
    ? {
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
        current: [...CURRENT_DEFAULT_FIELDS],
      }
    : skipToken;

  const { data, isLoading, isFetching } = useGetForecastQuery(args);
  const curr = data?.current;
  const currUnits = data?.current_units;

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-1 flex-col gap-8 xl:flex-row">
        <div className="flex w-full flex-col gap-8">
          <div className="bg-base-200 flex h-72 w-full flex-col items-center justify-center gap-2 rounded-[20px]">
            <span className="loading loading-dots loading-xl scale-[1.5]"></span>
            <p className="text-paragraph-style">Loading...</p>
          </div>
          <div className="flex gap-4">
            <SmallCard title="Feels Like" value="—" />
            <SmallCard title="Humidity" value="—" />
            <SmallCard title="Wind" value="—" />
            <SmallCard title="Precipitation" value="—" />
          </div>
          <DailyForecast />
        </div>
        <HourlyForecast />
      </div>
    );
  }

  return (
    data && (
      <div className="flex flex-1 flex-col gap-8 xl:flex-row">
        <div className="flex w-full flex-col gap-8">
          <MainCard
            date={formatDate(data?.current?.time as string)}
            temp={String(Math.round(Number(data?.current?.temperature_2m)))}
            code={data?.current?.weather_code}
          />
          <div className="flex gap-4">
            <SmallCard
              title="Feels Like"
              value={
                curr?.apparent_temperature != null
                  ? `${Math.round(curr.apparent_temperature)}${currUnits?.apparent_temperature ?? '°'}`
                  : '—'
              }
            />
            <SmallCard
              title="Humidity"
              value={
                curr?.relative_humidity_2m != null
                  ? `${Math.round(curr.relative_humidity_2m)}${currUnits?.relative_humidity_2m ?? '%'}`
                  : '—'
              }
            />
            <SmallCard
              title="Wind"
              value={
                curr?.wind_speed_10m != null
                  ? `${Math.round(curr.wind_speed_10m)} ${currUnits?.wind_speed_10m ?? 'km/h'}`
                  : '—'
              }
            />
            <SmallCard
              title="Precipitation"
              value={
                curr?.precipitation != null
                  ? `${Number(curr.precipitation.toFixed?.(1) ?? curr.precipitation)}${currUnits?.precipitation ? ` ${currUnits.precipitation}` : ' mm'}`
                  : '—'
              }
            />
          </div>
          <DailyForecast />
        </div>
        <HourlyForecast />
      </div>
    )
  );
};
