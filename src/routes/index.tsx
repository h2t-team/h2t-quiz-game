import React from 'react';
import { RouteObject } from 'react-router-dom';
import ActivationPage from 'pages/Auth/ActivationPage';
import SendEmailPage from 'pages/Auth/SendEmailPage';
import Invite from 'pages/User/Invite';
import ProfilePage from 'pages/User/Profile';
import { Loader } from 'components/Common';
import {
  GroupDetailPage,
  GroupPage,
  HomePage,
  LoginPage,
  RegisterPage,
} from 'pages';

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
  {
    path: '/groups/invite/:groupId',
    element: <Invite />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  }, 
  {
    path: '/groups',
    element: <GroupPage />,
  },
  {
    path: '/groups/:groupId',
    element: <GroupDetailPage />,
  },
];

export default route;
