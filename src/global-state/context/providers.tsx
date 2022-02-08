import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { ProgramsProvider } from './programs-context';
import { SnackbarProvider } from 'notistack';

interface ProvidersProps {
  children: React.ReactElement<any, any>;
  store: any;
}

export const Providers = ({ children, store }: ProvidersProps) => {
  return (
    <StoreProvider store={store}>
      <Router>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <ProgramsProvider>
            <SnackbarProvider maxSnack={6}>{children}</SnackbarProvider>
          </ProgramsProvider>
        </LocalizationProvider>
      </Router>
    </StoreProvider>
  );
};
