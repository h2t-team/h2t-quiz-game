import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import route from './routes';
import './asset/scss/common.scss';

function App() {
  const router = createBrowserRouter(route);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
