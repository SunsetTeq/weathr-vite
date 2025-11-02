import { useGetForecastQuery } from '@api/forecastApi';
import { HOURLY_DEFAULT_FIELDS } from '@constants/forecastConstants';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@slices/handlers/useAppSelector';
import { Card } from './Card';

type HourItem = {
  date: string;
  temp?: number;
  code?: number;
};

export const HourlyForecast = () => {
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);
  const args = selectedCity
    ? {
        lat: selectedCity.latitude,
        lon: selectedCity.longitude,
        forecast_days: 7,
        hourly: [...HOURLY_DEFAULT_FIELDS],
      }
    : skipToken;

  const { data } = useGetForecastQuery(args);
  if (!data?.hourly?.time?.length) {
    return null;
  }

  const times = data.hourly.time as string[];
  const temps = (data.hourly.temperature_2m ?? []) as number[];
  const codes = (data.hourly.weather_code ?? []) as number[];

  // выбираем первый день из массива времени
  const firstDate = times[0].slice(0, 10); // 'YYYY-MM-DD'

  // собираем элементы первого дня (00:00–23:00)
  const firstDayItems: HourItem[] = times.reduce<HourItem[]>((acc, t, i) => {
    if (t.slice(0, 10) === firstDate) {
      acc.push({
        date: t,
        temp: temps[i],
        code: codes[i],
      });
    }
    return acc;
  }, []);

  return (
    <div className="bg-base-200 flex min-w-[300px] flex-col gap-4 rounded-[20px] px-4 pt-6 pb-4">
      <h3>Hourly forecast</h3>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {firstDayItems.map((item) => (
          <div key={item.date} className="min-w-[180px]">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
