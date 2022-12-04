import React from 'react';
import AppLayout from 'components/Layouts/AppLayout';
import Profile from 'components/Form/Profile';

const ProfilePage = () => {
  return (
    <AppLayout>
      <div className="my-3 m-md-5 p-4 shadow rounded-4">
        <Profile />
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
