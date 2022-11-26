import React from 'react';
import { RouteObject } from 'react-router-dom';

import Loader from 'components/Common/Loader/Loader';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Auth/LoginPage';
import RegisterPage from 'pages/Auth/RegisterPage';
import Invite from 'pages/User/Invite';

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
    path: '/groups/invite/:groupId',
    element: <Invite />,
  },
];

export default route;
