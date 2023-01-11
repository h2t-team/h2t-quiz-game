import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../Common/Loader/Loader';
import config from 'config';
import styles from './Form.module.scss';
import { FaTimesCircle } from 'react-icons/fa';
import { clearItem } from 'utils';

interface IFormInput {
  password: string;
  confirmPassword: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  })
  .required();

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [message, setMessage] = React.useState('');
  const [username, setUsername] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      const token = params.get('token');
      getMutation.mutate(token || '');
    } else {
      navigate('/');
    }
  }, []);

  const getMutation = useMutation({
    mutationFn: (token: string) =>
      axios.get(`${config.apiUrl}/auth/reset-password?token=${token}`),
    onSuccess: (data) => {
      setUsername(data.data?.username);
      setError(false);
      setLoading(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
        setError(true);
        setLoading(false);
      }
    },
  });

  const handleResendClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      const token = params.get('token');
      resendPostMutation.mutate(token || '');
    } else {
      setMessage('Invalid Token');
      setError(true);
      setLoading(false);
    }
  };

  const resendPostMutation = useMutation({
    mutationFn: (data: string) =>
      axios.post(`${config.apiUrl}/auth/resend-email`, { token: data }),
    onSuccess: (newData) => {
      navigate('/send-email', {
        state: {
          email: newData.data.email,
          type: 'Reset Password',
        },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
        setError(true);
        setLoading(false);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: (data: IFormInput) =>
      axios.post(`${config.apiUrl}/auth/reset-password`, {
        password: data.password,
        username: username,
      }),
    onSuccess: () => {
      clearItem('h2t_access_token');
      navigate('/login', { state: { msg: 'Reset password successfully' } });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setMessage(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
      }
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  const errorBlock = (
    <>
      <div className={styles.center}>
        <FaTimesCircle className="mb-3" color="red" size="50px" />
        <p> {message} </p>
        <p className="mt-5">
          Want to receive reset password email again? Click on{' '}
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

  const successBlock = (
    <>
      <div className={styles.authForm}>
        <h1 className={styles.formTitle}>H2T Quiz</h1>
        <p className={styles.center}>Reset password for: {username}</p>
        <Alert variant="danger" show={mutation.isError}>
          {message}
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              isInvalid={errors.confirmPassword ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
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
            Send
          </Button>
        </Form>
        <div className="mb-5"></div>
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
  return <>{loading ? loadingBlock : error ? errorBlock : successBlock}</>;
};
export default ResetPassword;
