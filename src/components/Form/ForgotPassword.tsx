import React from 'react';
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

interface IFormInput {
  email: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const ForgotPassword = () => {
  const [errMsg, setErrMsg] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: IFormInput) =>
      axios.post(`${config.apiUrl}/auth/forgot-password`, data),
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
          <Form.Control
            type="email"
            placeholder="Email"
            {...register('email')}
            isInvalid={errors.email ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
          <p className="mb-3">We will send reset password link to your email</p>
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
  );
};
export default ForgotPassword;
