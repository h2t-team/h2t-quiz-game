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
  PresentationPage,
  JoinGame,
  Result,
  Answer,
} from 'pages';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const route: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/groups',
    element: (
      <PrivateRoute>
        <GroupPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/groups/:groupId',
    element: (
      <PrivateRoute>
        <GroupDetailPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/presentations',
    element: (
      <PrivateRoute>
        <PresentationPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/join-game',
    element: <JoinGame />,
  },
  {
    path: '/result/:presentationId/:slideId',
    element: (
      <Result />
    ),
  },
  {
    path: '/answer',
    element: <Answer />,
  },
  {
    path: '/answer/:presentId/:slideId',
    element: <Answer />,
  },
];

export default route;
