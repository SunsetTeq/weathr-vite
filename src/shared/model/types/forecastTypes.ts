// Что просим у API
export interface ForecastQueryArgs {
  lat: number;
  lon: number;
  timezone?: 'auto' | string;
  forecast_days?: number;
  start_date?: string;
  end_date?: string;
  daily?: string[];
  current?: string[];
  hourly?: string[];
}

export interface ForecastAnyApiResponse {
  timezone?: string;
  latitude?: number;
  longitude?: number;

  current_units?: {
    time?: string;
    temperature_2m?: string; // "°C" | "°F"
    apparent_temperature?: string; // "°C" | "°F"
    weather_code?: string; // "wmo code" | ""
    wind_speed_10m?: string; // "m/s" | "km/h" | "mph" | "kn"
    precipitation?: string; // "mm" | "inch"
    relative_humidity_2m?: string; // "%"
  };

  current?: Record<string, number | string | null> & {
    time?: string;
    temperature_2m?: number;
    weather_code?: number; // 1) Код погоды (WMO)
    apparent_temperature?: number; // 2) "Ощущается как"
    wind_speed_10m?: number; // 3) Ветер
    precipitation?: number; // 4) Осадки
    relative_humidity_2m: number; // 5) Влажность
  };

  daily_units?: Record<string, string>;
  daily?: Record<string, number[] | string[]> & {
    time?: string[];
  };

  hourly_units?: Record<string, string>;
  hourly?: Record<string, (number | string | null)[]> & {
    time?: string[];
  };
}
