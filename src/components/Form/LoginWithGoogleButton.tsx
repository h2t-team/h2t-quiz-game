import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import config from 'config';
import { setItem } from 'utils/localStorage';
import Loader from '../Common/Loader/Loader';
import styles from './Form.module.scss';

const LoginWithGoogleButton = () => {
  const [errMsg, setErrMsg] = React.useState('');
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const redirect = search.get('redirect');
  const mutation = useMutation({
    mutationFn: (codeResponse: CodeResponse) =>
      axios.post(`${config.apiUrl}/auth/login-with-google`, {
        code: codeResponse.code,
      }),
    onSuccess: (data) => {
      const token = data.data?.accessToken;
      const expiry = data.data?.expiresIn;
      const userId = data.data?.userId;
      setItem('h2t_access_token', token, expiry);
      setItem('userId', userId, expiry);
      //Same issue with login
      if(redirect) {
        window.location.assign(redirect);
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrMsg(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
      }
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => mutation.mutate(codeResponse),
    flow: 'auth-code',
  });
  return (
    <div className={styles.formOAuth}>
      <div className={styles.google}>
        <Button
          variant="outline-primary w-100 rounded-0 mb-3"
          disabled={mutation.isLoading}
          onClick={() => googleLogin()}
        >
          {mutation.isLoading && (
            <Loader
              as="span"
              isFullPage={false}
              animation="border"
              size="sm"
              role="status"
              className="me-2"
            />
          )}
          Continue with Google
        </Button>
      </div>
      <Alert variant="danger" show={mutation.isError}>
        {errMsg}
      </Alert>
    </div>
  );
};

export default LoginWithGoogleButton;
