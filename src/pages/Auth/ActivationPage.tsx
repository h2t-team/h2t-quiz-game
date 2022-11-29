import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './Activation.module.scss';
import axios from 'axios';
import config from 'config';

const ActivationPage = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(true);
  const navigate = useNavigate();
  const getMutation = useMutation({
    mutationFn: (token: string) =>
      axios.get(`${config.apiUrl}/auth/activate-account?token=${token}`),
    onSuccess: (data) => {
      const message = data.data?.message;
      setMessage(message);
      setResult(true);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
        setResult(false);
      }
    },
  });
  const postMutation = useMutation({
    mutationFn: (data: string) =>
      axios.post(`${config.apiUrl}/auth/resend-email`, { token: data }),
    onSuccess: (newData) => {
      navigate('/send-email', {
        state: {
          email: newData.data.email,
        },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
        setResult(false);
      }
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      const token = params.get('token');
      getMutation.mutate(token || '');
    } else {
      setMessage('Invalid Token');
      setResult(false);
    }
  }, []);

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      const token = params.get('token');
      postMutation.mutate(token || '');
    } else {
      setMessage('Invalid Token');
      setResult(false);
    }
  };

  const successBlock = (
    <>
      <FaCheckCircle className="mb-5" color="green" size="60px" />
      <p className="mb-3"> {message} </p>
      <Link to="/" className="btn btn-primary mt-3 w-100">
        BACK TO HOME
      </Link>
    </>
  );

  const errorBlock = (
    <>
      <FaTimesCircle color="red" size="50px" />
      <p className="mb-3"> {message} </p>
      <>
        Want to receive activate email again? Click on{' '}
        <a
          onClick={handleAnchorClick}
          href="/"
          className="fw-bold text-decoration-underline"
        >
          Resend
        </a>
      </>
      <Link to="/" className="btn btn-primary mt-3 w-100">
        BACK TO HOME
      </Link>
    </>
  );

  return (
    <div className={styles.activationPage}>
      <div className={styles.activation}>
        {result ? successBlock : errorBlock}
      </div>
    </div>
  );
};

export default ActivationPage;
