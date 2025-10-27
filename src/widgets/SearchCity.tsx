import { useEffect, useMemo, useRef, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSearchCityQuery } from '@api/geocodingApi';
import type { GeoSearchApiResponse } from '@type/geocodingTypes';
import { useGetSetCityHandler } from '@slices/handlers/useGetSetCityHandler';
import { useAppSelector } from '@slices/handlers/useAppSelector';

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export function SearchCity() {
  const handlerSelectCity = useGetSetCityHandler();
  const selectedCity = useAppSelector((state) => state.settings.selectedCity);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounced(q, 300);

  // геокодинг
  const { data: geoData, isFetching: geoLoading } = useSearchCityQuery(
    debouncedQ.trim().length >= 2
      ? { name: debouncedQ, language: 'ru', count: 5 }
      : skipToken,
  );
  const results = useMemo<NonNullable<GeoSearchApiResponse['results']>>(
    () => geoData?.results ?? [],
    [geoData],
  );

  const selectFirstCity = () => {
    const first = results[0];
    if (first)
      handlerSelectCity({
        name: first.name,
        latitude: first.latitude,
        longitude: first.longitude,
      });
  };

  console.log(selectedCity);

  return (
    <div className="flex h-full w-full items-start justify-center p-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Search */}
        <label className="input flex items-center gap-2">
          {/* иконка */}
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>

          <input
            ref={inputRef}
            type="search"
            className="grow"
            placeholder="Введите город"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') selectFirstCity();
            }}
          />
        </label>

        {/* Результаты геокодинга */}
        {debouncedQ.trim().length >= 2 && (
          <div className="rounded-2xl border p-3">
            {geoLoading && <div className="opacity-70">Ищем…</div>}
            {!geoLoading && results.length === 0 && (
              <div className="opacity-70">Ничего не найдено</div>
            )}
            <ul className="space-y-1">
              {results.map((r) => (
                <li key={`${r.id ?? r.name}-${r.latitude}-${r.longitude}`}>
                  <button
                    className="w-full cursor-pointer text-left hover:underline"
                    onClick={() =>
                      handlerSelectCity({
                        name: r.name,
                        latitude: r.latitude,
                        longitude: r.longitude,
                      })
                    }
                  >
                    {r.name}
                    {r.admin1 ? `, ${r.admin1}` : ''} {r.country_code ?? ''}
                    <span className="opacity-60">
                      {' '}
                      — {r.latitude.toFixed(3)}, {r.longitude.toFixed(3)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {results.length > 0 && (
              <div className="pt-2 text-sm opacity-70">
                Нажмите Enter, чтобы выбрать первый результат.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
