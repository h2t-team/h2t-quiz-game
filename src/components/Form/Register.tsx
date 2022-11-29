import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Button, Row, Alert } from 'react-bootstrap';
import config from 'config';
import Loader from '../Common/Loader/Loader';
import styles from './Form.module.scss';

interface IFormInput {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
  string: {
    min: 'Password must be at least ${min} characters',
  },
});

const schema = yup
  .object({
    fullname: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required().email('Email is invalid'),
    phone: yup
      .string()
      .matches(
        new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
        'Phone number is invalid'
      )
      .required(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  })
  .required();

const Register = () => {
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
      axios.post(`${config.apiUrl}/auth/register`, data),
    onSuccess: (newData) => {
      navigate('/send-email', {
        state: {
          email: newData.data.email,
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
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Fullname"
            {...register('fullname')}
            isInvalid={errors.fullname ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullname?.message}
          </Form.Control.Feedback>
        </Form.Group>
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
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              {...register('email')}
              isInvalid={errors.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              {...register('phone')}
              isInvalid={errors.phone ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
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
              animation="border"
              size="sm"
              role="status"
              className="me-2"
            />
          )}
          Sign Up
        </Button>
        <div className={styles.formFooter}>
          Already a member?
          <Link to="/login">Sign in now</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
