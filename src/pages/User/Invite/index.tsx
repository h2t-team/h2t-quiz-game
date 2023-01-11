import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import Loader from 'components/Common/Loader/Loader';
import { getItem, isLogin, axiosWithToken } from 'utils';
import styles from './Invite.module.scss';

interface MutationPayload {
  userId: string;
  groupId: string;
}

const Invite = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLogin()) {
      const redirectUrl = `/login?redirect=${location.pathname}`;
      navigate(redirectUrl);
    }
  }, []);
  const location = useLocation();
  const params = useParams();
  const groupId = params.groupId;
  const groupInfo = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const res = await axiosWithToken.get(`/groups/${groupId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ userId, groupId }: MutationPayload) => {
      const postData = {
        groupId,
        memberIdList: [userId],
      };
      return axiosWithToken.post(`/groups/${groupId}/addUsers`, postData);
    },
  });

  React.useEffect(() => {
    if (groupInfo.isSuccess) {
      mutation.mutate({
        userId: getItem('userId') as string,
        groupId: params.groupId as string,
      });
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
      <p className="mt-3 mb-0 fw-bold">
        Join unsuccessfully.
        <br />
        Please try again later
      </p>
      <Link to="/" className="btn btn-primary mt-3 w-100">
        Back to home
      </Link>
    </>
  );

  const linkValidBlock = (
    <>
      <p className="fw-semibold">You are invited to join group:</p>
      <h1 className="fw-bolder">{groupInfo.data?.group?.name}</h1>
      <div className="mt-auto">
        {mutation.isSuccess
          ? successBlock
          : mutation.isError
            ? errorBlock
            : pendingBlock}
      </div>
    </>
  );

  const linkInvalidBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mt-3 mb-0 fw-bold">Your invitation link is invalid.</p>
      <Link to="/" className="btn btn-primary mt-4 w-100">
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
