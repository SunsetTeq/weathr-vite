import iconSunny from '@assets/icons/icon-sunny.webp';
import iconPartlyCloudy from '@assets/icons/icon-partly-cloudy.webp';
import iconOvercast from '@assets/icons/icon-overcast.webp';
import iconFog from '@assets/icons/icon-fog.webp';
import iconDrizzle from '@assets/icons/icon-drizzle.webp';
import iconRain from '@assets/icons/icon-rain.webp';
import iconSnow from '@assets/icons/icon-snow.webp';
import iconStorm from '@assets/icons/icon-storm.webp';

export const WEATHER_ICON_BY_CODE: Record<number, string> = {
  // clear / clouds
  0: iconSunny,
  1: iconPartlyCloudy,
  2: iconPartlyCloudy,
  3: iconOvercast,

  // fog
  45: iconFog,
  48: iconFog,

  // drizzle
  51: iconDrizzle,
  53: iconDrizzle,
  55: iconDrizzle,
  56: iconDrizzle,
  57: iconDrizzle,

  // rain
  61: iconRain,
  63: iconRain,
  65: iconRain,
  66: iconRain,
  67: iconRain,
  80: iconRain,
  81: iconRain,
  82: iconRain,

  // snow
  71: iconSnow,
  73: iconSnow,
  75: iconSnow,
  77: iconSnow,
  85: iconSnow,
  86: iconSnow,

  // thunderstorm (± hail)
  95: iconStorm,
  96: iconStorm,
  99: iconStorm,
};

const DEFAULT_ICON = iconPartlyCloudy;

export function getIconByWeatherCode(code?: number) {
  return (code != null && WEATHER_ICON_BY_CODE[code]) || DEFAULT_ICON;
}
