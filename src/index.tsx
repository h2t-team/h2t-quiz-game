import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';
import StoreProvider from 'store';
import config from '../src/config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'typeface-acme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.googleCliendId}>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StoreProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
