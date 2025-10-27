import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@app/store/AppStore';

export const useAppDispatch = useDispatch<AppDispatch>;
