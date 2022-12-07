import React from 'react';
import { RouteObject } from 'react-router-dom';
import {
  ActivationPage,
  GroupDetailPage,
  GroupPage,
  HomePage,
  Invite,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  SendEmailPage,
} from 'pages';

const route: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
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
