export interface ForecastArgs {
  lat: number;
  lon: number;
  days?: number;
  timezone?: 'auto' | string;
}

export interface ForecastDailyApiResponse {
  daily_units: {
    temperature_2m_max?: string;
    temperature_2m_min?: string;
    precipitation_sum?: string;
    weather_code?: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code?: number[];
  };
}
