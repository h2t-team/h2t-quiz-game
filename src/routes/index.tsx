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
  ForgotPasswordPage,
  ResetPasswordPage,
} from 'pages';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import WithPlayerSlideShow from 'pages/Player/PlayerSlideShow/WithPlayerSlideShow';

const editPresentationRouteList = [
  '/presentations/:presentationId/edit',
  '/presentations/:presentationId/:slideIndex/edit',
  '/presentations/:presentationId',
  '/presentations/:presentationId/:slideIndex',
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
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
    path: '/auth/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/groups/invite/:groupId',
    element: (
      <PrivateRoute>
        <Invite />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <JoinGame />
      </PrivateRoute>
    ),
  },
  {
    path: '/:presentId/:slideIndex/result',
    element: (
      <PrivateRoute>
        <WithPlayerSlideShow component={Result} />
      </PrivateRoute>
    ),
  },
  {
    path: '/:presentId/:slideIndex/show',
    element: (
      <PrivateRoute>
        <SlideShow />
      </PrivateRoute>
    ),
  },
  {
    path: '/:presentId/:slideIndex/answer',
    element: (
      <PrivateRoute>
        <WithPlayerSlideShow component={Answer} />
      </PrivateRoute>
    ),
  },
  ...editPresentationRouteList,
];

export default route;
