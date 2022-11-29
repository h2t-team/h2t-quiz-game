import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Loader from '../Common/Loader/Loader';

import { axiosWithToken } from 'utils';
import styles from './Form.module.scss';

interface IFormInput {
  fullname: string;
  phone: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    fullname: yup.string().required(),
    phone: yup
      .string()
      .min(10, 'Phone number is invalid')
      .matches(
        new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
        'Phone number is invalid'
      )
      .required(),
  })
  .required();

const Profile = () => {
  const [errMsg, setErrMsg] = React.useState('');
  const mutation = useMutation({
    mutationFn: (data: IFormInput) => axiosWithToken.post('/user', data),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrMsg(
          error?.response?.data?.message ||
            'There was a problem with server. Please try again later.'
        );
      }
    },
  });

  const userInfo = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axiosWithToken.get('/user');
      return res.data;
    },
    onSuccess: (data) => {
      setValue('fullname', data?.user?.fullname);
      setValue('phone', data?.user?.phone);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.profileForm}>
      <h1 className={styles.formTitle}>Edit Profile</h1>
      <Alert variant="danger" show={mutation.isError}>
        {errMsg}
      </Alert>
      <Alert variant="success" show={mutation.isSuccess}>
        Update successfully
      </Alert>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group md="6" as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              disabled
              value={userInfo.data?.user?.username}
            />
          </Form.Group>
          <Form.Group md="6" as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              disabled
              value={userInfo.data?.user?.email}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group md="6" as={Col}>
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
          <Form.Group md="6" as={Col}>
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
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
