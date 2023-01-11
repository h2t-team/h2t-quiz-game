import React, { useEffect } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';

import { Slide } from 'models/presentation.model';
import { axiosWithToken } from 'utils';
import axios from 'axios';
import { Loader } from 'components/Common';

interface HeadingProps {
  slideInfo?: Slide;
}

interface IFormInput {
  title: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const HeadingForm: React.FC<HeadingProps> = ({ slideInfo }) => {
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = React.useState('');
  const mutation = useMutation({
    mutationFn: (data: IFormInput) => {
      return axiosWithToken.patch(`/slide/${slideInfo?.id}`, {
        title: data.title,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['slideDetail', slideInfo?.index],
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: slideInfo?.title,
    },
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    setValue('title', slideInfo?.title || '');
  }, [slideInfo]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Alert variant="danger" show={mutation.isError}>
        {errMsg}
      </Alert>
      <Alert variant="success" show={mutation.isSuccess}>
        Update successfully
      </Alert>
      <Form.Group className="mb-3">
        <Form.Label>Heading:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a question"
          aria-label="Title"
          {...register('title')}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="primary" disabled={mutation.isLoading}>
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
  );
};

export default HeadingForm;
