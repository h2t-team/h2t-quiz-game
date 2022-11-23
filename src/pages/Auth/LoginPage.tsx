import React from 'react';

import AuthLayout from '../../components/Layouts/AuthLayout';
import Login from '../../components/Form/Login';

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
