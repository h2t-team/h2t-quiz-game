import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './asset/scss/common.scss';
import route from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toast } from 'components/Common';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(route);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toast />
      </QueryClientProvider>
    </div>
  );
}

export default App;
