import React from 'react';
import { Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { axiosWithToken } from 'utils';
import logo from 'asset/images/logo-vertical.svg';
import styles from './JoinGame.module.scss';
import axios from 'axios';
import { Loader } from 'components/Common';

interface IFormInput {
  pin: string;
}

const schema = yup
  .object({
    pin: yup.string().required(),
  })
  .required();

const JoinGame = () => {
  const nav = useNavigate();
  const [errMsg, setErrMsg] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: (data: IFormInput) =>
      axiosWithToken.get(`/presentation/code/${data.pin}`),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrMsg(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
      }
    },
    onSuccess: (data) => {
      nav(`/${data.data?.presentation.id}/0/answer`);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.joinGamePage}>
      <Container>
        <div className={styles.logo}>
          <img src={logo} alt="H2T" />
        </div>
        <Col className={styles.joinForm}>
          <Alert variant="danger" show={mutation.isError}>
            {errMsg}
          </Alert>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Game pin"
                {...register('pin')}
                isInvalid={!!errors.pin}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a game pin
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              className="w-100 fw-bold"
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
              Enter
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default JoinGame;
