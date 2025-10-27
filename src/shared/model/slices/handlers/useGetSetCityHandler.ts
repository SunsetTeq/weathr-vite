import { useCallback } from 'react';
import { useAppDispatch } from '@hooks/useAppDispatch';

import { selectCity } from '../settingsSlice';
import type { SelectedCity } from '@type/settingsTypes';

export const useGetSetCityHandler = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (selectedCity: SelectedCity) => {
      dispatch(selectCity(selectedCity));
    },
    [dispatch],
  );
};
