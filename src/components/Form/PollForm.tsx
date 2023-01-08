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

interface PollFormProps {
  slideInfo?: Slide;
}

interface IFormInput {
  title: string;
  option1: string;
  option2: string;
}

yup.setLocale({
  mixed: {
    required: 'This field is required',
  },
});

const schema = yup
  .object({
    title: yup.string().required(),
    option1: yup.string().required(),
    option2: yup.string().required(),
  })
  .required();

const PollForm: React.FC<PollFormProps> = ({ slideInfo }) => {
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = React.useState('');
  const mutation = useMutation({
    mutationFn: (data: IFormInput) => {
      const updateOption1 = axiosWithToken.patch('/slide', {
        optionId: slideInfo?.pollSlides[0].id,
        option: data.option1,
      });
      const updateOption2 = axiosWithToken.patch('/slide', {
        optionId: slideInfo?.pollSlides[1].id,
        option: data.option2,
      });
      const updateTitle = axiosWithToken.patch(`/slide/${slideInfo?.id}`, {
        title: data.title,
      });
      return Promise.all([updateOption1, updateOption2, updateTitle]);
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
      option1: slideInfo?.pollSlides[0].option,
      option2: slideInfo?.pollSlides[1].option,
    },
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    setValue('title', slideInfo?.title || '');
    setValue('option1', slideInfo?.pollSlides[0].option || '');
    setValue('option2', slideInfo?.pollSlides[1].option || '');
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
        <Form.Label>Your question:</Form.Label>
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
      <Form.Group className="mb-3">
        <Form.Label>Options:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Option 1"
          aria-label="Option 1"
          {...register('option1')}
          isInvalid={!!errors.option1}
        />
        <Form.Control.Feedback type="invalid">
          {errors.option1?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Option 2"
          aria-label="Option 2"
          {...register('option2')}
          isInvalid={!!errors.option2}
        />
        <Form.Control.Feedback type="invalid">
          {errors.option2?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Chart Type:</Form.Label>
        <Form.Select>
          <option>Bar chart</option>
        </Form.Select>
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

export default PollForm;
