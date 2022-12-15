import React from 'react';
import { AppLayout } from 'components/Layouts';
import { GroupList } from 'components/Group';
import axios from 'axios';
import config from 'config';
import { getItem } from 'utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Group } from 'models';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { Loader } from 'components/Common';
import { useModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type NewGroupInputs = {
  groupName: string;
};

const schema = yup.object().shape({
  groupName: yup
    .string()
    .required('Group name is required')
    .min(3, 'Group name must be at least 3 characters')
    .max(32, 'Group name must not exceed 32 characters'),
});

const GroupPage = () => {
  const queryClient = useQueryClient();
  const { closeModal, openModal, isShowModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewGroupInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    delayError: 300,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupList'],
    queryFn: async () => {
      const res = await axios.get(`${config.apiUrl}/groups`, {
        headers: {
          authorization: `Bearer ${getItem('h2t_access_token')}`,
        },
      });
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewGroupInputs) =>
      axios.post(
        `${config.apiUrl}/groups/createGroup`,
        {
          ...data,
          memberIdList: [],
        },
        {
          headers: {
            authorization: `Bearer ${getItem('h2t_access_token')}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupList'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        // TODO: toast the error
        alert(error);
      }
    },
  });

  const handleCreateNewGroup = (data: NewGroupInputs) => {
    mutation.mutate(data);
    reset();
    closeModal();
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Loader isFullPage />;
      </AppLayout>
    );
  }

  if (isError) {
    <AppLayout>Error</AppLayout>;
  }

  return (
    <AppLayout>
      <div className="py-5">
        <h1 className="fw-bold">All groups</h1>
        <Stack direction="horizontal" className="justify-content-end">
          <Button variant="info" onClick={openModal} className="mb-4">
            New group
          </Button>
        </Stack>
        <GroupList list={data.groups as Group[]} />
      </div>
      {/* TODO: Extract Modal to Common */}
      <Modal
        size="lg"
        aria-labelledby="create-group"
        centered
        show={isShowModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="create-group">Create new group</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleCreateNewGroup)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                {...register('groupName')}
                type="text"
                placeholder="Example: Group 1"
                isInvalid={!!errors.groupName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.groupName?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </AppLayout>
  );
};

export default GroupPage;
