import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from '@app/store/AppStore';
import type { ReactNode } from 'react';

export const AppReduxProvider = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={appStore}>{children}</ReduxProvider>;
};