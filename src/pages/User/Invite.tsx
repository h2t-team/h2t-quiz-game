/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getItem, isLogin } from 'utils';

const Invite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  React.useEffect(() => {
    if (!isLogin()) {
      const redirectUrl = `/login?redirect=${location.pathname}`;
      navigate(redirectUrl);
    } else {
      console.log(params.groupId);
      console.log(getItem('h2t_access_token'));
      //TODO: implement invite api
    }
  }, []);
  return <div>Invite</div>;
};

export default Invite;
