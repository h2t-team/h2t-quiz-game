import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './asset/scss/common.scss';
import route from './routes';

function App() {
  const router = createBrowserRouter(route);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
