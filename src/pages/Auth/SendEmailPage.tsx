import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './Activation.module.scss';
import axios from 'axios';
import config from 'config';

const SendEmailPage = () => {
  const { state: state } = useLocation();
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state == null) {
      navigate('/');
    } else {
      setEmail(state.email);
    }
  }, [state]);

  const postMutation = useMutation({
    mutationFn: (data: string) =>
      axios.post(`${config.apiUrl}/auth/resend-email`, { email: data }),
    onSuccess: (newData) => {
      setEmail(newData.data.email);
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
    postMutation.mutate(email || '');
  };

  const successBlock = (
    <>
      <FaCheckCircle className="mb-2" color="green" size="60px" />
      <p>
        An activation email has been sent to
        <span className="fw-bold" id="email">
          {' '}
          {email}{' '}
        </span>
        <br />
        You have to activate before login(expire after 20 minutes).
        <br />
      </p>
    </>
  );

  const errorBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mb-3"> {errorMsg} </p>
    </>
  );

  const navigateBlock = (
    <>
      <p className="mb-3">
        <>
          Do not receive the activation email?{' '}
          <a
            onClick={handleResendClick}
            href="/"
            className="fw-bold text-decoration-underline"
          >
            Resend
          </a>
        </>
      </p>
      <p>
        <>
          Activate account successfully?{' '}
          <a href="/login" className="fw-bold text-decoration-underline">
            Login
          </a>
        </>
      </p>
    </>
  );
  return (
    <div className={styles.activationPage}>
      <div className={styles.activation}>
        {errorMsg ? errorBlock : successBlock}
        {navigateBlock}
      </div>
    </div>
  );
};

export default SendEmailPage;
