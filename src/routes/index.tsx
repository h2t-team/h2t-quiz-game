import React from 'react';
import { RouteObject } from 'react-router-dom';

import Login from '../components/Form/Login';
import Loader from '../components/Common/Loader/Loader';
import AuthLayout from '../components/Layouts/AuthLayout';

const route: RouteObject[] = [
  {
    path: '/',
    element: <Loader />,
    errorElement: <Loader />,
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
];

export default route;
