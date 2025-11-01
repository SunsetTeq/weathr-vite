import { useEffect, useMemo, useRef, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSearchCityQuery, useLazySearchCityQuery } from '@api/geocodingApi';
import type { GeoSearchApiResponse } from '@type/geocodingTypes';
import { useGetSetCityHandler } from '@slices/handlers/useGetSetCityHandler';

import { SearchField } from './SearchField';
import { GeoDropdown } from './GeoDropdown';

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

type Result = NonNullable<GeoSearchApiResponse['results']>[number];

export function SearchCity() {
  const handlerSelectCity = useGetSetCityHandler();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null); // якорь для клика-вне

  const [q, setQ] = useState('');
  const debouncedQ = useDebounced(q, 300);

  // Показ дропа – по строке
  const showDropdown = q.trim().length >= 2;

  // Автоподсказки при наборе
  const { data: geoData, isFetching: geoLoading } = useSearchCityQuery(
    debouncedQ.trim().length >= 2
      ? { name: debouncedQ, language: 'en', count: 5 }
      : skipToken,
  );

  // Поиск по кнопке
  const [triggerSearch, { isFetching: btnLoading }] = useLazySearchCityQuery();

  const results = useMemo<NonNullable<GeoSearchApiResponse['results']>>(
    () => geoData?.results ?? [],
    [geoData],
  );

  // Сбросить поле + закрыть дроп
  const clearSearch = () => {
    setQ('');
    inputRef.current?.blur();
  };

  // Клик-вне
  useEffect(() => {
    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      const root = boxRef.current;
      if (!root) return;
      const target = e.target as Node | null;
      if (target && !root.contains(target)) clearSearch();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  // Выбор города
  const pickCity = (r: Result) => {
    handlerSelectCity({
      country: r.country,
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
    });
    clearSearch();
  };

  // Поиск по кнопке и авто-выбор первого
  const searchAndSelect = async () => {
    const query = q.trim();
    if (query.length < 2 || btnLoading) return;
    try {
      const resp = await triggerSearch({
        name: query,
        language: 'en',
        count: 5,
      }).unwrap();
      const list = resp?.results ?? [];
      if (list[0]) pickCity(list[0]);
    } catch (e) {
      console.error('Search failed', e);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="w-full space-y-6 md:w-[40%]">
        <div className="flex gap-4">
          <div ref={boxRef} className="relative min-w-0 flex-1">
            <SearchField
              inputRef={inputRef}
              value={q}
              onChange={setQ}
              onEnter={searchAndSelect}
              onEscape={clearSearch}
              dropdownOpen={showDropdown}
              dropdownId="geo-suggestions"
            />

            {showDropdown && (
              <GeoDropdown
                id="geo-suggestions"
                results={results}
                loading={geoLoading}
                onPick={pickCity}
              />
            )}
          </div>

          <button
            className="btn btn-primary rounded-[10px]"
            onClick={searchAndSelect}
            disabled={q.trim().length < 2 || btnLoading}
            aria-busy={btnLoading}
          >
            {btnLoading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
}
