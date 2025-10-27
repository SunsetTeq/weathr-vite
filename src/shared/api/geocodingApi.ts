import { baseApi } from '@api/base/baseApi';
import type { GeoSearchArgs, GeoSearchApiResponse } from '@type/geocodingTypes';

export const geocodingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchCity: build.query<GeoSearchApiResponse, GeoSearchArgs>({
      query: ({ name, language = 'ru', count = 5, countryCode }) => ({
        url: 'https://geocoding-api.open-meteo.com/v1/search',
        method: 'GET',
        params: { name, language, count, countryCode },
      }),
      providesTags: () => [{ type: 'Geocoding', id: 'LIST' }],
    }),
  }),
});

export const { useSearchCityQuery } = geocodingApi;
