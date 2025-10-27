export interface GeoSearchArgs {
  name: string;
  language?: string; // 'ru' | 'en' | 'sv' ...
  count?: number; // сколько результатов вернуть
  countryCode?: string; // ISO-2, напр. 'SE'
}

export interface GeoLocation {
  id?: number;
  name: string;
  country_code?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface GeoSearchApiResponse {
  results?: GeoLocation[];
}
