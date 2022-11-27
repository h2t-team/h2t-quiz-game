import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './Activation.module.scss';
import axios from 'axios';
import config from 'config';

interface IInfo {
  type: string;
  email: string;
}

const SendEmailPage = () => {
  const { state: state } = useLocation();
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state == null) {
      navigate('/');
    } else {
      setType(state.type);
      setEmail(state.email);
    }
  }, [state]);

  const postMutation = useMutation({
    mutationFn: (data: IInfo) =>
      axios.post(`${config.apiUrl}/auth/resend-email`, data),
    onSuccess: (newData) => {
      setType(newData.data.type);
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

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    postMutation.mutate({ type, email });
  };

  const successBlock = (
    <>
      <FaCheckCircle className="mb-5" color="green" size="60px" />
      <p className="mb-2">
        A/An<span id="type"> {type} </span>
        email has been sent to
        <span className="fw-bold" id="email"> {email} </span>
        <br />
        You have to activate before login(expire after 20 minutes). 
        <br />
      </p>
      <p>
        <>
          Do not receive the activation email? Click on{' '}
          <a
            onClick={handleAnchorClick}
            href="/"
            className="fw-bold text-decoration-underline"
            id="resend"
          >
            Resend
          </a>
        </>
      </p>
    </>
  );

  const errorBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mb-3"> {errorMsg} </p>
      <>
        Want to receive activate email again? Click on{' '}
        <a
          onClick={handleAnchorClick}
          href="/"
          className="fw-bold text-decoration-underline"
          id="resend">
          Resend
        </a>
        <Link to="/" className="btn btn-primary mt-3 w-100">
        BACK TO HOME
        </Link>
      </>
    </>
  );

  return (
    <div className={styles.activationPage}>
      <div className={styles.activation}>
        {errorMsg ? errorBlock : successBlock}
      </div>
    </div>
  );
};

export default SendEmailPage;
