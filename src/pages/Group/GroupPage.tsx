import React from 'react';
import { AppLayout } from 'components/Layouts';
import { GroupList } from 'components/Group';
import config from 'config';
import { axiosWithToken } from 'utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GroupByUser } from 'models';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { Loader } from 'components/Common';
import { useModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

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
    queryFn: async (): Promise<GroupByUser[]> => {
      const res = await axiosWithToken.get(`${config.apiUrl}/groups`);
      return res.data.groups;
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewGroupInputs) =>
      axiosWithToken.post(`${config.apiUrl}/groups/createGroup`, {
        ...data,
        memberIdList: [],
      }),
    onSuccess: () => {
      toast.success('Create successfully');
      queryClient.invalidateQueries({ queryKey: ['groupList'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const handleCreateNewGroup = async (data: NewGroupInputs) => {
    await mutation.mutateAsync(data);
    handleCloseModal();
  };

  const handleCloseModal = () => {
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
          <Button
            variant="info"
            onClick={openModal}
            className="mb-4 fw-semibold"
          >
            New group
          </Button>
        </Stack>
        <GroupList list={data as GroupByUser[]} />
      </div>
      {/* TODO: Extract Modal to Common */}
      <Modal
        size="lg"
        aria-labelledby="create-group"
        centered
        show={isShowModal}
        onHide={handleCloseModal}
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
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <Loader size="sm" /> : 'Create'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </AppLayout>
  );
};

export default GroupPage;
