/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Loader from 'components/Common/Loader/Loader';
import { getItem, isLogin, axiosWithToken } from 'utils';
import config from 'config';
import styles from './Invite.module.scss';

const Invite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const groupId = params.groupId;
  const groupInfo = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const res = await axiosWithToken.get(`/groups/${groupId}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  React.useEffect(() => {
    if (!isLogin()) {
      const redirectUrl = `/login?redirect=${location.pathname}`;
      navigate(redirectUrl);
    }
  }, []);

  React.useEffect(() => {
    if (groupInfo.isSuccess) {
      console.log(params.groupId);
      console.log(getItem('h2t_access_token'));
      //TODO: implement invite api
    }
  }, [groupInfo.isSuccess]);

  const pendingBlock = (
    <>
      <Loader width="3rem" />
      <p className="fw-bold mt-3 fs-5">Joining...</p>
    </>
  );

  const successBlock = (
    <>
      <FaCheckCircle color="green" size="50px" />
      <p className="mt-3 mb-0 fw-bold">
        Join successfully.
        <br />
        You now a member of group.
      </p>
      <Link to={`/groups/${groupId}`} className="btn btn-primary mt-3 w-100">
        Let&apos;s Play
      </Link>
    </>
  );
  
  const errorBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mt-3 mb-0 fw-bold">Join fail. Please try again later</p>
      <Link to="/" className="btn btn-primary mt-5 w-100">
        Back to home
      </Link>
    </>
  );

  const linkValidBlock = (
    <>
      <p className="fw-semibold">You are invited to join group:</p>
      <h1 className="fw-bolder">{groupInfo.data?.group?.name}</h1>
      <div className="mt-auto">
        {/*TODO: implement call add to Group API*/}
        {groupInfo.isSuccess ? pendingBlock : successBlock}
      </div>
    </>
  );

  const linkInvalidBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mt-3 mb-0 fw-bold">Your invitation link is invalid.</p>
      <Link to="/" className="btn btn-primary mt-5 w-100">
        Back to home
      </Link>
    </>
  );

  return (
    <div className={styles.invitePage}>
      <div className={styles.invitation}>
        {groupInfo.isSuccess ? (
          linkValidBlock
        ) : groupInfo.isError ? (
          linkInvalidBlock
        ) : (
          <Loader width="5rem" />
        )}
      </div>
    </div>
  );
};

export default Invite;
