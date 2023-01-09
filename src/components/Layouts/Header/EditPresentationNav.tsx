import React, { FocusEventHandler, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { axiosWithToken } from 'utils';
import { Nav, Form, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Presentation } from 'models/presentation.model';

interface IFormInput {
  title: string;
}

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

function EditPresentationNav() {
  const { presentationId, slideIndex } = useParams();
  const navigate = useNavigate();
  const pressentInfo = useQuery({
    queryKey: ['presentation', presentationId],
    queryFn: async (): Promise<Presentation> => {
      const response = await axiosWithToken.get(
        `/presentation/${presentationId}`
      );
      return response.data;
    },
  });

  const updateNameMutation = useMutation({
    mutationFn: (data: string) =>
      axiosWithToken.patch('/presentation', {
        name: data,
        id: presentationId,
      }),
  });

  const updatePresentMutation = useMutation({
    mutationFn: () =>
      axiosWithToken.patch('/presentation', {
        isPresent: true,
        id: presentationId,
      }),
    onSuccess: () => {
      if (!slideIndex) {
        navigate(`/${presentationId}/0/show`);
      }
      navigate(`/${presentationId}/${slideIndex}/show`);
    },
  });

  const {
    register,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: pressentInfo.data?.presentation.name,
    },
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setValue('title', pressentInfo.data?.presentation.name || '');
  }, [pressentInfo.data]);

  const handlePresent = () => {
    updatePresentMutation.mutate();
  };

  const handleSubmit: FocusEventHandler<HTMLInputElement> = (e) => {
    trigger('title');
    if (isValid) {
      updateNameMutation.mutate(e.target.value);
    }
  };

  return (
    <>
      <Nav className="me-auto">
        <Form className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Enter a title"
            aria-label="Title"
            {...register('title')}
            isInvalid={!!errors.title}
            onBlur={handleSubmit}
            disabled={updateNameMutation.isLoading}
          />
          <Form.Control.Feedback type="invalid" className="ms-2 text-nowrap">
            Please enter presentation name
          </Form.Control.Feedback>
        </Form>
      </Nav>
      <Nav className="align-items-center">
        <Button
          variant="success"
          className="d-flex fw-semibold align-items-center"
          onClick={handlePresent}
          disabled={updatePresentMutation.isLoading}
        >
          <FaPlay />
          <span className="ms-2">Present</span>
        </Button>
      </Nav>
    </>
  );
}

export default EditPresentationNav;
