import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
      if (token && expiry) {
        setItem('h2t_access_token', token, expiry);
      naviagte(redirect || '/');
      }
      else {
        const type = data.data?.type;
        const email = data.data?.email;
        naviagte('/send-email',{
          state: {
            type: type,
            email: email,
          }
        })
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

  return (
    <div className={styles.authForm}>
      <h1 className={styles.formTitle}>H2T Quiz</h1>
      <Alert variant="danger" show={mutation.isError}>
        {errMsg}
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
