import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className={styles.authForm}>
      <h1 className={styles.formTitle}>H2T Quiz</h1>
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
        <Button type="submit" variant="primary" className={styles.formSubmit}>
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
