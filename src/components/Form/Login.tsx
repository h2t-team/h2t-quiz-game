import React, { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../Common/Loader/Loader';
import { setItem } from 'utils/localStorage';
import config from 'config';
import styles from './Form.module.scss';

interface IFormInput {
  username: string;
  password: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const [errMsg, setErrMsg] = React.useState('');
  const { state: state } = useLocation();
  const [msg, setMsg] = React.useState('');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const naviagte = useNavigate();
  const [search] = useSearchParams();
  const redirect = search.get('redirect');
  const mutation = useMutation({
    mutationFn: (data: IFormInput) =>
      axios.post(`${config.apiUrl}/auth/login`, data),
    onSuccess: (data) => {
      const token = data.data?.accessToken;
      const expiry = data.data?.expiresIn;
      const userId = data.data?.userId;
      if (token && expiry) {
        setItem('userId', userId, expiry);
        setItem('h2t_access_token', token, expiry);
        //when use navigate the axiosWithToken in Invite does not refresh so it still unauthorize
        //TODO: Find the way to solve this.
        if (redirect) {
          window.location.assign(redirect);
        } else {
          window.location.assign('/');
        }
      } else {
        const email = data.data?.email;
        naviagte('/send-email', {
          state: {
            email: email,
          },
        });
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  const handleVisible = () => {
    setVisibleAlert(true);
    setTimeout(() => {
      setVisibleAlert(false);
    }, 2000);
  };

  useEffect(() => {
    if (state) {
      setMsg(state.msg);
      handleVisible();
    }
  }, [state]);

  return (
    <div className={styles.authForm}>
      <h1 className={styles.formTitle}>H2T Quiz</h1>
      <Alert variant="danger" show={mutation.isError}>
        {errMsg}
      </Alert>
      <Alert variant="success" show={visibleAlert}>
        {msg}
      </Alert>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            {...register('username')}
            isInvalid={errors.username ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password')}
            isInvalid={errors.password ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
          <Form.Text>
            <Link to="/forgot-password">Fogot password?</Link>
          </Form.Text>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className={styles.formSubmit}
          disabled={mutation.isLoading}
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
          Sign In
        </Button>
        <div className={styles.formFooter}>
          Not a member?
          <Link to="/register">Sign up now</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
