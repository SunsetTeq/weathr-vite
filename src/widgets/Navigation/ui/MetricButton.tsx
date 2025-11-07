import { useAppSelector } from '@slices/handlers/useAppSelector';
import {
  selectPrecipitation,
  selectTemperature,
  selectWindSpeed,
} from '@slices/settingsSlice';
import { useDispatch } from 'react-redux';

export const MetricButton = () => {
  const { Temperature, WindSpeed, Precipitation } = useAppSelector(
    (s) => s.settings,
  );
  const dispatch = useDispatch();

  const isMetric =
    Temperature === 'celsius' && WindSpeed === 'kmh' && Precipitation === 'mm';

  const switchToImperial = () => {
    dispatch(selectTemperature('fahrenheit'));
    dispatch(selectWindSpeed('mph'));
    dispatch(selectPrecipitation('inch'));
  };

  const switchToMetric = () => {
    dispatch(selectTemperature('celsius'));
    dispatch(selectWindSpeed('kmh'));
    dispatch(selectPrecipitation('mm'));
  };

  return (
    <button
      type="button"
      className="hover:bg-base-300 btn btn-base-200 text-paragraph-style flex w-full items-center justify-between rounded-[10px] px-3 py-2 shadow-none transition"
      onClick={isMetric ? switchToImperial : switchToMetric}
    >
      <p className="text-paragraph-style text-primary-content">
        {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
      </p>
    </button>
  );
};
