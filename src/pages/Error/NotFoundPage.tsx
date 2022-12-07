import { AppLayout } from 'components/Layouts';
import React from 'react';
import Custom404 from '../../components/Errors/Custom404';

const NotFoundPage: React.FC = () => {
  return (
    <AppLayout>
      <Custom404 />
    </AppLayout>
  );
};

export default NotFoundPage;
