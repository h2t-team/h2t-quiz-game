import React from 'react';
import { AppLayout } from 'components/Layouts';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { axiosWithToken } from 'utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'components/Common';
import { useParams } from 'react-router-dom';
import { Stack, Button, Modal, Form } from 'react-bootstrap';
import { useModal } from 'hooks';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GroupDetail, UserPreviewWithRoleInGroup } from 'models';

type NewUsersInGroupInputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required('An email is required')
    .email('Must be a valid email'),
});

function GroupDetailPage() {
  const queryClient = useQueryClient();
  const { closeModal, openModal, isShowModal } = useModal();
  const { groupId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUsersInGroupInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    delayError: 300,
  });

  const handleAddUsersToGroup = async (data: NewUsersInGroupInputs) => {
    await addUserMutation.mutateAsync(data);
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupDetail'],
    queryFn: async () => {
      const res = await axiosWithToken.get(
        `${config.apiUrl}/groups/${groupId}`
      );
      return res.data as GroupDetail;
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (data: NewUsersInGroupInputs) =>
      axiosWithToken.post(
        `${config.apiUrl}/groups/${groupId}/inviteUserByEmail`,
        {
          ...data,
        }
      ),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupDetail'] });
      handleCloseModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  // eslint-disable-next-line no-console
  console.log(data);

  if (isLoading) {
    return (
      <AppLayout>
        <Loader isFullPage />;
      </AppLayout>
    );
  }

  if (isError || !data) {
    return null;
  }

  return (
    <AppLayout>
      <div className="py-5">
        <h1 className="fw-bold fs-1">{data.group.name}</h1>
        <Stack direction="horizontal" className="justify-content-end">
          <Button
            variant="info"
            onClick={openModal}
            className="mb-4 fw-semibold"
          >
            Add user
          </Button>
          {/* Check current user role = owner ? */}
          <Button
            variant="danger"
            onClick={openModal}
            className="mb-4 ms-2 fw-semibold"
          >
            Delete group
          </Button>
        </Stack>
        <div className="mb-5">
          <h2 className="fs-3">Owner</h2>
          <hr></hr>
          <p className="fs-6">{data.group.ownerUser.fullname}</p>
        </div>
        <div className="mb-5">
          <h2 className="fs-3">Co-owners and Members</h2>
          <hr></hr>
          {data.group.userInGroups.map(
            (userInfo: UserPreviewWithRoleInGroup) =>
              userInfo.role !== 'owner' && (
                <div key={userInfo.userId}>
                  <p className="fs-6">{userInfo.user.fullname}</p>
                </div>
              )
          )}
        </div>
        {/* TODO: Extract Modal to Common */}
        <Modal
          size="lg"
          aria-labelledby="add-user-group"
          centered
          show={isShowModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="add-user-group">Add a user</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleAddUsersToGroup)}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Invite the user to add:</Form.Label>
                <Form.Control
                  {...register('email')}
                  placeholder="Example: abc123@gmail.com"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
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
                disabled={addUserMutation.isLoading}
              >
                {addUserMutation.isLoading ? <Loader size="sm" /> : 'Add'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </AppLayout>
  );
}

export default GroupDetailPage;
