import React from 'react';
import { Col, Container, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [search] = useSearchParams();
  const nav = useNavigate();
  const [errMsg, setErrMsg] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      pin: search.get('code') || '',
    },
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
    onSuccess: async (data) => {
      try {
        await axiosWithToken.get(
          `groups/${data.data?.presentation.groupId}/check-user`
        );
        if (data.data?.presentation.isPresent) {
          nav(`/${data.data?.presentation.id}/0/answer`);
        } else {
          setErrMsg('The game does not exist.');
        }
      } catch (error) {
        setErrMsg('You don\'t have permission to join this game.');
      }
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setErrMsg('');
    mutation.mutate(data);
  };

  return (
    <div className={styles.joinGamePage}>
      <Container>
        <div className={styles.logo}>
          <img src={logo} alt="H2T" />
        </div>
        <Col className={styles.joinForm}>
          <Alert variant="danger" show={mutation.isError || !!errMsg}>
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
