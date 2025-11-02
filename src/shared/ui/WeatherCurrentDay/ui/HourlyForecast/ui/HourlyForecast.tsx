import { useState, useMemo, useEffect, useRef } from 'react';
import { useGetForecastQuery } from '@api/forecastApi';
import { HOURLY_DEFAULT_FIELDS } from '@constants/forecastConstants';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@slices/handlers/useAppSelector';
import { Card } from './Card';
import { formatFullDay } from '@utils/formatDate';
import DropdownIcon from '@assets/icons/icon-dropdown.svg?react';

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
  const ddRef = useRef<HTMLDetailsElement>(null);

  const times = useMemo<string[]>(
    () => (data?.hourly?.time ? (data.hourly.time as string[]) : []),
    [data?.hourly?.time],
  );
  const temps = useMemo<number[]>(
    () =>
      data?.hourly?.temperature_2m
        ? (data.hourly.temperature_2m as number[])
        : [],
    [data?.hourly?.temperature_2m],
  );
  const codes = useMemo<number[]>(
    () =>
      data?.hourly?.weather_code ? (data.hourly.weather_code as number[]) : [],
    [data?.hourly?.weather_code],
  );

  const tz = data?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Текущая дата/час в таймзоне ответа
  const { todayStr, hourStr } = useMemo(() => {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
        .formatToParts(new Date())
        .map(({ type, value }) => [type, value]),
    ) as Record<string, string>;
    const today = `${parts.year}-${parts.month}-${parts.day}`;
    return { todayStr: today, hourStr: `${today}T${parts.hour}:00` };
  }, [tz]);

  // Список доступных дат из почасовых данных
  const dayList = useMemo(
    () => Array.from(new Set(times.map((t) => t.slice(0, 10)))),
    [times],
  );

  // Выбранный день (по умолчанию — сегодня)
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Держим выбранный день валидным при смене данных
  useEffect(() => {
    if (!dayList.length) return;
    setSelectedDate((prev) =>
      dayList.includes(prev)
        ? prev
        : dayList.includes(todayStr)
          ? todayStr
          : dayList[0],
    );
  }, [dayList, todayStr]);

  // Часы для выбранного дня (для сегодня — с текущего часа)
  const items = useMemo<HourItem[]>(() => {
    if (!times.length) return [];

    if (selectedDate === todayStr) {
      let startIdx = times.findIndex((t) => t === hourStr);
      if (startIdx === -1)
        startIdx = times.findIndex((t) => t.startsWith(todayStr));
      if (startIdx === -1) return [];

      const acc: HourItem[] = [];
      for (let i = startIdx; i < times.length; i++) {
        const t = times[i];
        if (!t.startsWith(todayStr)) break;
        acc.push({ date: t, temp: temps[i], code: codes[i] });
      }
      return acc;
    }

    const acc: HourItem[] = [];
    for (let i = 0; i < times.length; i++) {
      const t = times[i];
      if (t.startsWith(selectedDate)) {
        acc.push({ date: t, temp: temps[i], code: codes[i] });
      } else if (acc.length) break;
    }
    return acc;
  }, [times, temps, codes, selectedDate, todayStr, hourStr]);

  if (!dayList.length) return null;

  return (
    <div className="bg-base-200 flex h-fit min-w-[320px] flex-col gap-4 rounded-[20px] px-4 pt-6 pb-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Hourly forecast</h3>
        {/* Dropdown */}
        <details ref={ddRef} className="dropdown dropdown-end group">
          <summary className="btn btn-neutral list-none gap-2 rounded-[10px]">
            <span className="text-paragraph-style text-primary-content">
              {formatFullDay(selectedDate)}
            </span>
            <DropdownIcon className="transition-transform group-open:rotate-180" />
          </summary>

          <ul className="dropdown-content menu menu-sm border-neutral bg-base-300 mt-2 max-h-80 w-64 rounded-[10px] border p-2">
            {dayList.map((d) => (
              <li key={d}>
                <button
                  type="button"
                  className={d === selectedDate ? 'active' : ''}
                  onClick={() => {
                    setSelectedDate(d);
                    if (ddRef.current) {
                      ddRef.current.open = false;
                    }
                  }}
                >
                  <span className="text-paragraph-style text-primary-content">
                    {formatFullDay(d)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </details>{' '}
      </div>

      <div className="flex max-h-[570px] flex-col gap-2 overflow-y-auto pr-4">
        {items.map((item) => (
          <div key={item.date} className="min-w-[180px]">
            <Card data={item} />
          </div>
        ))}
        {!items.length && (
          <div className="text-sm opacity-70">No data for the selected day</div>
        )}
      </div>
    </div>
  );
};
