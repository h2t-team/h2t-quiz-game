import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

import Login from '../components/Form/Login';
import Loader from '../components/Common/Loader/Loader';
import AppLayout from '../components/Layouts/AppLayout/AppLayout';
import AuthLayout from '../components/Layouts/AuthLayout';
import Register from '../components/Form/Register';

const route: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
    errorElement: (
      <AppLayout>
        <Loader />
      </AppLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
];

export default route;
