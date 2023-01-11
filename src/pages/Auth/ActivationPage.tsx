import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import config from 'config';
import { Loader } from 'components/Common';
import UpdateAccountLayout from 'components/Layouts/UpdateAccountLayout';
import styles from 'components/Layouts/UpdateAccountLayout/UpdateAccountLayout.module.scss';

const ActivationPage = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getMutation = useMutation({
    mutationFn: (token: string) =>
      axios.get(`${config.apiUrl}/auth/activate-account?token=${token}`),
    onSuccess: (data) => {
      const message = data.data?.message;
      setMessage(message);
      setResult(true);
      setLoading(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
        setResult(false);
        setLoading(false);
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
          type: 'Activation',
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
        setLoading(false);
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
      setLoading(false);
    }
  }, []);

  const handleResendClick = (event: React.MouseEvent<HTMLElement>) => {
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
      <div className={styles.center}>
        <FaCheckCircle className="mb-3" color="green" size="60px" />
        <p> {message} </p>
      </div>
    </>
  );

  const errorBlock = (
    <>
      <div className={styles.center}>
        <FaTimesCircle className="mb-3" color="red" size="50px" />
        <p> {message} </p>

        <p className="mt-5">
          Want to receive activate email again? Click on{' '}
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

  const loadingBlock = (
    <>
      <div className={styles.center}>
        <Loader
          as="span"
          isFullPage={false}
          animation="border"
          size="sm"
          role="status"
          className="me-2"
        />
      </div>
    </>
  );
  return (
    <UpdateAccountLayout>
      {loading ? loadingBlock : result ? successBlock : errorBlock}
    </UpdateAccountLayout>
  );
};

export default ActivationPage;
