import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import config from 'config';
import UpdateAccountLayout from 'components/Layouts/UpdateAccountLayout';
import styles from 'components/Layouts/UpdateAccountLayout/UpdateAccountLayout.module.scss';

interface ISendEmail {
  email: string;
  type: string;
}

const SendEmailPage = () => {
  const { state: state } = useLocation();
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state == null) {
      navigate('/');
    } else {
      setEmail(state.email);
      setType(state.type);
    }
  }, [state]);

  const postMutation = useMutation({
    mutationFn: (data: ISendEmail) =>
      axios.post(`${config.apiUrl}/auth/resend-email`, {
        email: data.email,
        type: data.type,
      }),
    onSuccess: (newData) => {
      setEmail(newData.data.email);
      setType(newData.data.type);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
      }
    },
  });

  const handleResendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    postMutation.mutate({ email, type } || '');
  };

  const successBlock = (
    <>
      <div className={styles.center}>
        <FaCheckCircle className="mb-3" color="green" size="60px" />
        <p>
          The {type} email has been sent to
          <span className="fw-bold" id="email">
            {' '}
            {email}{' '}
          </span>
          <br />
          {type == 'Activation' ? 'You have to activate before login ' : ''}
          (expire after 20 minutes).
          <br />
        </p>
      </div>
    </>
  );

  const errorBlock = (
    <>
      <div className={styles.center}>
        <FaTimesCircle className="mb-3" color="red" size="50px" />
        <p> {errorMsg} </p>
      </div>
    </>
  );

  const navigateBlock = (
    <>
      <div className={styles.center}>
        <p className="mt-5">
          Do not receive the {type} email?{' '}
          <a
            onClick={handleResendClick}
            href="/"
            className="fw-bold text-decoration-underline"
          >
            Resend
          </a>
        </p>
      </div>
    </>
  );
  return (
    <UpdateAccountLayout>
      {errorMsg ? errorBlock : successBlock}
      {navigateBlock}
    </UpdateAccountLayout>
  );
};

export default SendEmailPage;
