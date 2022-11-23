import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Form.module.scss';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginWithGoogleButton = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async codeResponse => {
      axios.post('http://localhost:5000/auth/login-with-google', {code:codeResponse.code})
        .then((result) => {
          /* eslint-disable no-console */
          console.log(result.data);
          /* eslint-disable no-console */
        })
        .catch((error) => {
          /* eslint-disable no-console */
          console.log(error);
          /* eslint-disable no-console */
        })
    },
    flow: 'auth-code',
  });
  return (
    <div className={styles.formOAuth}>
      <div className={styles.google}>
        <Button variant="outline-primary w-100 rounded-0" onClick = { ()=> googleLogin()} > Continue with Google</Button>
      </div>
    </div>
  );
};

export default LoginWithGoogleButton;