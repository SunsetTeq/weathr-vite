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
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import SettingsIcon from '@assets/icons/icon-units.svg?react';
import DropdownIcon from '@assets/icons/icon-dropdown.svg?react';

export const UnitsButton = () => {
  const { Temperature, WindSpeed, Precipitation } = useAppSelector(
    (s) => s.settings,
  );
  const dispatch = useDispatch();
  const ddRef = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ddRef.current) ddRef.current.open = false;
  };

  const setTemp = (v: TemperatureType) => {
    dispatch(selectTemperature(v));
    close();
  };
  const setWind = (v: WindSpeedType) => {
    dispatch(selectWindSpeed(v));
    close();
  };
  const setPrec = (v: PrecipitationType) => {
    dispatch(selectPrecipitation(v));
    close();
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

      <ul className="dropdown-content menu rounded-box border-neutral bg-base-200 z-1 mt-2 w-64 gap-2 border px-1 py-4">
        <li className="text-paragraph-style menu-title px-2 py-0">
          Temperature
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>Celsius (°C)</span>
            <input
              type="radio"
              name="temp"
              className="radio"
              checked={Temperature === 'celsius'}
              onChange={() => setTemp('celsius')}
            />
          </label>
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>Fahrenheit (°F)</span>
            <input
              type="radio"
              name="temp"
              className="radio"
              checked={Temperature === 'fahrenheit'}
              onChange={() => setTemp('fahrenheit')}
            />
          </label>
        </li>
        <div className="divider m-0 h-px p-0" />

        <li className="text-paragraph-style menu-title mt-2 px-2 py-0">
          Wind Speed
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>km/h</span>
            <input
              type="radio"
              name="wind"
              className="radio"
              checked={WindSpeed === 'kmh'}
              onChange={() => setWind('kmh')}
            />
          </label>
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>mph</span>
            <input
              type="radio"
              name="wind"
              className="radio"
              checked={WindSpeed === 'mph'}
              onChange={() => setWind('mph')}
            />
          </label>
        </li>
        <div className="divider m-0 h-px p-0" />

        <li className="text-paragraph-style menu-title mt-2 px-2 py-0">
          Precipitation
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>Millimeters (mm)</span>
            <input
              type="radio"
              name="prec"
              className="radio"
              checked={Precipitation === 'mm'}
              onChange={() => setPrec('mm')}
            />
          </label>
        </li>
        <li>
          <label className="text-paragraph-style text-primary-content label cursor-pointer justify-between rounded-[5px]">
            <span>Inches (in)</span>
            <input
              type="radio"
              name="prec"
              className="radio"
              checked={Precipitation === 'inch'}
              onChange={() => setPrec('inch')}
            />
          </label>
        </li>
      </ul>
    </details>
  );
};
