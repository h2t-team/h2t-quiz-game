import React from 'react';

import AuthLayout from '../../components/Layouts/AuthLayout';
import Register from '../../components/Form/Register';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
