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

  current_units?: Record<string, string>;

  current?: Record<string, number | string | null> & {
    time?: string;
    temperature_2m?: number;
    weather_code?: number;
    apparent_temperature?: number;
    wind_speed_10m?: number;
    precipitation?: number; // 4) Осадки
    relative_humidity_2m: number; // 5) Влажность
  };

  daily_units?: Record<string, string>;
  daily?: Record<string, number[] | string[]> & {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    weather_code?: number[];
  };

  hourly_units?: Record<string, string>;
  hourly?: Record<string, (number | string | null)[]> & {
    time?: string[];
  };
}
