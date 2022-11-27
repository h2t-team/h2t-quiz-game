import React from 'react';
import { RouteObject } from 'react-router-dom';

import Loader from 'components/Common/Loader/Loader';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import ActivationPage from 'pages/Auth/ActivationPage';
import SendEmailPage from 'pages/Auth/SendEmailPage';

const route: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Loader />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/send-email',
    element: <SendEmailPage />,
  },
  {
    path: '/auth/activate-account',
    element: <ActivationPage />,
  },
];

export default route;
