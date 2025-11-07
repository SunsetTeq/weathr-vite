import { useAppSelector } from '@slices/handlers/useAppSelector';
import {
  selectPrecipitation,
  selectTemperature,
  selectWindSpeed,
} from '@slices/settingsSlice';
import type {
  PrecipitationType,
  TemperatureType,
  WindSpeedType,
} from '@type/settingsTypes';
import { Fragment, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import SettingsIcon from '@assets/icons/icon-units.svg?react';
import DropdownIcon from '@assets/icons/icon-dropdown.svg?react';
import { OptionButton } from './ButtonBase';
import { SettingsList, type SectionName } from '../config/constants';
import { MetricButton } from './MetricButton';

export const UnitsButton = () => {
  const { Temperature, WindSpeed, Precipitation } = useAppSelector(
    (s) => s.settings,
  );
  const dispatch = useDispatch();
  const ddRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent | PointerEvent) => {
      const el = ddRef.current;
      if (el?.open && el && !el.contains(e.target as Node)) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ddRef.current?.open) ddRef.current.open = false;
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const currentByName: Record<SectionName, string> = {
    Temperature,
    'Wind Speed': WindSpeed,
    Precipitation,
  };

  const setByName: Record<SectionName, (v: string) => void> = {
    Temperature: (v) => dispatch(selectTemperature(v as TemperatureType)),
    'Wind Speed': (v) => dispatch(selectWindSpeed(v as WindSpeedType)),
    Precipitation: (v) => dispatch(selectPrecipitation(v as PrecipitationType)),
  };

  return (
    <details ref={ddRef} className="dropdown dropdown-end">
      <summary className="btn btn-base-200 rounded-[10px]">
        <SettingsIcon />
        <span className="text-paragraph-style text-primary-content pl-1">
          Units
        </span>
        <DropdownIcon />
      </summary>

      <ul
        className="dropdown-content menu rounded-box border-neutral bg-base-200 z-50 mt-2 w-64 gap-2 border px-1 py-4"
        role="menu"
      >
        <MetricButton />
        {SettingsList.map((section, idx) => {
          const name = section.name as SectionName;
          const current = currentByName[name];
          const set = setByName[name];

          return (
            <Fragment key={name}>
              <li className="menu-title text-paragraph-style px-2 py-0">
                {section.name}
              </li>

              {section.options.map((opt) => (
                <li key={opt.value}>
                  <OptionButton
                    active={current === opt.value}
                    onClick={() => set(opt.value)}
                  >
                    {opt.label}
                  </OptionButton>
                </li>
              ))}

              {idx < SettingsList.length - 1 && (
                <div className="divider m-0 my-2 h-px p-0 before:h-px after:h-px" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </details>
  );
};
