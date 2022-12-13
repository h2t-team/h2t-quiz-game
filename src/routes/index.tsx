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
  SlideShow,
  PresentationDetailPage,
} from 'pages';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const editPresentationRouteList = [
  '/presentations/:presentationId/edit',
  '/presentations/:presentationId/:slideId/edit',
  '/presentations/:presentationId',
  '/presentations/:presentationId/:slideId',
].map((path) => ({
  path,
  element: (
    <PrivateRoute>
      <PresentationDetailPage />
    </PrivateRoute>
  ),
}));

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
    path: '/:presentId/:slideId/result',
    element: (
      <Result />
    ),
  },
  {
    path: '/:presentId/:slideId/show',
    element: <SlideShow />,
  },
  {
    path: '/:presentId/:slideId/answer',
    element: <Answer />,
  },
  ...editPresentationRouteList,
];

export default route;
